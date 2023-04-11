import type { ServerResponse, IncomingMessage } from 'http';
import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import { Action, parsePath } from 'history';
import type { Location } from 'history';
import type {
  AppContext, RouteItem, ServerContext,
  AppExport, AssetsManifest,
  RouteMatch,
  PageConfig,
  RenderMode,
  DocumentComponent,
  RuntimeModules,
  AppData,
} from './types.js';
import Runtime from './runtime.js';
import App from './App.js';
import { AppContextProvider } from './AppContext.js';
import { AppDataProvider, getAppData } from './AppData.js';
import getAppConfig from './appConfig.js';
import { DocumentContextProvider } from './Document.js';
import { loadRouteModules, loadRoutesData, getRoutesConfig } from './routes.js';
import { pipeToString, renderToNodeStream } from './server/streamRender.js';
import { createStaticNavigator } from './server/navigator.js';
import type { NodeWritablePiper } from './server/streamRender.js';
import getRequestContext from './requestContext.js';
import matchRoutes from './matchRoutes.js';
import getCurrentRoutePath from './utils/getCurrentRoutePath.js';
import DefaultAppRouter from './AppRouter.js';
import { renderHTMLToJS } from './renderHTMLToJS.js';
import addLeadingSlash from './utils/addLeadingSlash.js';

interface RenderOptions {
  app: AppExport;
  assetsManifest: AssetsManifest;
  routes: RouteItem[];
  runtimeModules: RuntimeModules;
  Document: DocumentComponent;
  documentOnly?: boolean;
  renderMode?: RenderMode;
  // basename is used both for server and client, once set, it will be sync to client.
  basename?: string;
  // serverOnlyBasename is used when just want to change basename for server.
  serverOnlyBasename?: string;
  routePath?: string;
  disableFallback?: boolean;
  routesConfig: {
    [key: string]: PageConfig;
  };
  runtimeOptions?: Record<string, any>;
  distType?: Array<'html' | 'javascript'>;
  serverData?: any;
}

interface Piper {
  pipe: NodeWritablePiper;
  fallback: Function;
}
interface Response {
  statusCode?: number;
  statusText?: string;
  value?: string | Piper;
  headers?: Record<string, string>;
}

/**
 * Render and send the result with both entry bundle and html.
 */
export async function renderToEntry(
  requestContext: ServerContext,
  renderOptions: RenderOptions,
) {
  const result = await renderToHTML(requestContext, renderOptions);
  const { value } = result;

  let jsOutput;
  const {
    distType = ['html'],
  } = renderOptions;
  if (value && distType.includes('javascript')) {
    jsOutput = await renderHTMLToJS(value);
  }

  let htmlOutput;
  if (distType.includes('html')) {
    htmlOutput = result;
  }

  return {
    ...htmlOutput,
    jsOutput,
  };
}

/**
 * Render and return the result as html string.
 */
export async function renderToHTML(
  requestContext: ServerContext,
  renderOptions: RenderOptions,
): Promise<Response> {
  const result = await doRender(requestContext, renderOptions);

  const { value } = result;

  if (typeof value === 'string' || typeof value === 'undefined') {
    return result;
  }

  const { pipe, fallback } = value;

  try {
    const entryStr = await pipeToString(pipe);

    return {
      value: entryStr,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
      },
      statusCode: 200,
    };
  } catch (error) {
    if (renderOptions.disableFallback) {
      throw error;
    }
    console.error('PipeToString error, downgrade to CSR.', error);
    // downgrade to CSR.
    const result = fallback();
    return result;
  }
}

/**
 * Render and send the result to ServerResponse.
 */
export async function renderToResponse(requestContext: ServerContext, renderOptions: RenderOptions) {
  const { req, res } = requestContext;
  const result = await doRender(requestContext, renderOptions);

  const { value } = result;

  if (typeof value === 'string' || typeof value === 'undefined') {
    sendResponse(req, res, result);
  } else {
    const { pipe, fallback } = value;

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html; charset=utf-8');

    return new Promise<void>((resolve, reject) => {
      // Send stream result to ServerResponse.
      pipe(res, {
        onShellError: async (err) => {
          if (renderOptions.disableFallback) {
            reject(err);
          }

          // downgrade to CSR.
          console.error('PipeToResponse onShellError, downgrade to CSR.');
          console.error(err);
          const result = await fallback();
          sendResponse(req, res, result);
          resolve();
        },
        onError: async (err) => {
          // onError triggered after shell ready, should not downgrade to csr
          // and should not be throw to break the render process
          console.error('PipeToResponse error.');
          console.error(err);
        },
        onAllReady: () => {
          resolve();
        },
      });
    });
  }
}

async function sendResponse(
  req: IncomingMessage,
  res: ServerResponse,
  response: Response,
) {
  res.statusCode = response.statusCode;
  res.statusMessage = response.statusText;
  Object.entries(response.headers || {}).forEach(([name, value]) => {
    res.setHeader(name, value);
  });
  if (response.value && req.method !== 'HEAD') {
    res.end(response.value);
  } else {
    res.end();
  }
}

async function doRender(serverContext: ServerContext, renderOptions: RenderOptions): Promise<Response> {
  const { req, res } = serverContext;
  const {
    app,
    basename,
    serverOnlyBasename,
    routes,
    documentOnly,
    disableFallback,
    assetsManifest,
    runtimeModules,
    renderMode,
    runtimeOptions,
    serverData,
  } = renderOptions;
  const finalBasename = addLeadingSlash(serverOnlyBasename || basename);
  const location = getLocation(req.url);

  const requestContext = getRequestContext(location, serverContext);
  const appConfig = getAppConfig(app);

  let appData: AppData;
  const appContext: AppContext = {
    appExport: app,
    routes,
    appConfig,
    appData,
    routesData: null,
    routesConfig: null,
    renderMode,
    assetsManifest,
    basename: finalBasename,
    matches: [],
    requestContext,
    serverData,
  };
  const runtime = new Runtime(appContext, runtimeOptions);
  runtime.setAppRouter(DefaultAppRouter);
  // Load static module before getAppData.
  if (runtimeModules.statics) {
    await Promise.all(runtimeModules.statics.map(m => runtime.loadModule(m)).filter(Boolean));
  }

  // don't need to execute getAppData in CSR
  if (!documentOnly) {
    try {
      appData = await getAppData(app, requestContext);
    } catch (err) {
      console.error('Error: get app data error when SSR.', err);
    }
  }

  // HashRouter loads route modules by the CSR.
  if (appConfig?.router?.type === 'hash') {
    return renderDocument({ matches: [], renderOptions });
  }

  const matches = matchRoutes(routes, location, finalBasename);
  const routePath = getCurrentRoutePath(matches);
  if (documentOnly) {
    return renderDocument({ matches, routePath, renderOptions });
  } else if (!matches.length) {
    return handleNotFoundResponse();
  }

  try {
    const routeModules = await loadRouteModules(matches.map(({ route: { id, load } }) => ({ id, load })));
    const routesData = await loadRoutesData(matches, requestContext, routeModules, { renderMode });
    const routesConfig = getRoutesConfig(matches, routesData, routeModules);
    runtime.setAppContext({ ...appContext, routeModules, routesData, routesConfig, routePath, matches, appData });
    if (runtimeModules.commons) {
      await Promise.all(runtimeModules.commons.map(m => runtime.loadModule(m)).filter(Boolean));
    }

    const responseHandlers = runtime.getResponseHandlers();
    for (const responseHandler of responseHandlers) {
      if (typeof responseHandler === 'function') {
        const response = await responseHandler(req, res);
        if (response) {
          return response as Response;
        }
      }
    }

    return await renderServerEntry({
      runtime,
      matches,
      location,
      renderOptions,
    });
  } catch (err) {
    if (disableFallback) {
      throw err;
    }
    console.error('Warning: render server entry error, downgrade to csr.', err);
    return renderDocument({ matches, routePath, renderOptions, downgrade: true });
  }
}

// https://github.com/ice-lab/ice-next/issues/133
function handleNotFoundResponse(): Response {
  return {
    statusText: 'Not Found',
    statusCode: 404,
  };
}

interface RenderServerEntry {
  runtime: Runtime;
  matches: RouteMatch[];
  location: Location;
  renderOptions: RenderOptions;
}

/**
 * Render App by SSR.
 */
async function renderServerEntry(
  {
    runtime,
    matches,
    location,
    renderOptions,
  }: RenderServerEntry,
): Promise<Response> {
  const { Document } = renderOptions;
  const appContext = runtime.getAppContext();
  const { appData, routePath } = appContext;
  const staticNavigator = createStaticNavigator();
  const AppRuntimeProvider = runtime.composeAppProvider() || React.Fragment;
  const RouteWrappers = runtime.getWrappers();
  const AppRouter = runtime.getAppRouter();

  const documentContext = {
    main: <App
      action={Action.Pop}
      location={location}
      navigator={staticNavigator}
      static
      RouteWrappers={RouteWrappers}
      AppRouter={AppRouter}
    />,
  };

  const element = (
    <AppDataProvider value={appData}>
      <AppRuntimeProvider>
        <AppContextProvider value={appContext}>
          <DocumentContextProvider value={documentContext}>
            <Document pagePath={routePath} />
          </DocumentContextProvider>
        </AppContextProvider>
      </AppRuntimeProvider>
    </AppDataProvider>
  );

  const pipe = renderToNodeStream(element);

  const fallback = () => {
    return renderDocument({ matches, routePath, renderOptions, downgrade: true });
  };

  return {
    value: {
      pipe,
      fallback,
    },
  };
}

interface RenderDocumentOptions {
  matches: RouteMatch[];
  renderOptions: RenderOptions;
  routePath?: string;
  downgrade?: boolean;
}

/**
 * Render Document for CSR.
 */
function renderDocument(options: RenderDocumentOptions): Response {
  const {
    matches,
    renderOptions,
    routePath,
    downgrade,
  }: RenderDocumentOptions = options;

  const {
    routes,
    assetsManifest,
    app,
    Document,
    basename,
    routesConfig = {},
    serverData,
  } = renderOptions;

  const routesData = null;
  const appData = null;
  const appConfig = getAppConfig(app);

  const matchedRoutesConfig = {};
  matches.forEach(async (match) => {
    const { id } = match.route;
    const pageConfig = routesConfig[id];

    matchedRoutesConfig[id] = pageConfig ? pageConfig({}) : {};
  });

  const appContext: AppContext = {
    assetsManifest,
    appConfig,
    appData,
    routesData,
    routesConfig: matchedRoutesConfig,
    matches,
    routes,
    documentOnly: true,
    routePath,
    basename,
    downgrade,
    serverData,
  };

  const documentContext = {
    main: null,
  };

  const htmlStr = ReactDOMServer.renderToString(
    <AppContextProvider value={appContext}>
      <DocumentContextProvider value={documentContext}>
        <Document pagePath={routePath} />
      </DocumentContextProvider>
    </AppContextProvider>,
  );

  return {
    value: `<!DOCTYPE html>${htmlStr}`,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
    },
    statusCode: 200,
  };
}

/**
 * ref: https://github.com/remix-run/react-router/blob/main/packages/react-router-dom/server.tsx
 */
function getLocation(url: string) {
  const locationProps = parsePath(url);

  const location: Location = {
    pathname: locationProps.pathname || '/',
    search: locationProps.search || '',
    hash: locationProps.hash || '',
    state: null,
    key: 'default',
  };

  return location;
}
