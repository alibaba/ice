import type { ServerResponse } from 'http';
import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import { parsePath } from 'react-router-dom';
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
import { AppContextProvider } from './AppContext.js';
import { getAppData } from './appData.js';
import getAppConfig from './appConfig.js';
import { DocumentContextProvider } from './Document.js';
import { loadRouteModules } from './routes.js';
import type { RouteLoaderOptions } from './routes.js';
import { pipeToString, renderToNodeStream } from './server/streamRender.js';
import type { NodeWritablePiper } from './server/streamRender.js';
import getRequestContext from './requestContext.js';
import matchRoutes from './matchRoutes.js';
import getCurrentRoutePath from './utils/getCurrentRoutePath.js';
import ServerRouter from './ServerRouter.js';
import { renderHTMLToJS } from './renderHTMLToJS.js';
import addLeadingSlash from './utils/addLeadingSlash.js';

interface RenderOptions {
  app: AppExport;
  assetsManifest: AssetsManifest;
  createRoutes: (options: Pick<RouteLoaderOptions, 'requestContext' | 'renderMode'>) => RouteItem[];
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
interface RenderResult {
  statusCode?: number;
  value?: string | Piper;
}

/**
 * Render and send the result with both entry bundle and html.
 */
export async function renderToEntry(
  requestContext: ServerContext,
  renderOptions: RenderOptions,
) {
  console.log('renderToEntry.tsx');
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
): Promise<RenderResult> {
  console.log('renderHTMLToJS.tsx');
  const result = await doRender(requestContext, renderOptions);

  const { value } = result;

  if (typeof value === 'string') {
    return result;
  }

  const { pipe, fallback } = value;

  try {
    const entryStr = await pipeToString(pipe);

    return {
      value: entryStr,
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
  const { res } = requestContext;
  const result = await doRender(requestContext, renderOptions);

  const { value } = result;

  if (typeof value === 'string') {
    sendResult(res, result);
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
          sendResult(res, result);
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

/**
 * Send string result to ServerResponse.
 */
async function sendResult(res: ServerResponse, result: RenderResult) {
  res.statusCode = result.statusCode;
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.end(result.value);
}

async function doRender(serverContext: ServerContext, renderOptions: RenderOptions): Promise<RenderResult> {
  const { req } = serverContext;
  const {
    app,
    basename,
    serverOnlyBasename,
    createRoutes,
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
  const routes = createRoutes({
    requestContext,
    renderMode,
  });
  let appData: AppData;
  const appContext: AppContext = {
    appExport: app,
    routes,
    appConfig,
    appData,
    loaderData: {},
    renderMode,
    assetsManifest,
    basename: finalBasename,
    matches: [],
    requestContext,
    serverData,
  };
  const runtime = new Runtime(appContext, runtimeOptions);
  runtime.setAppRouter(ServerRouter);
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
    return renderDocument({ matches: [], routes, renderOptions });
  }

  const matches = matchRoutes(routes, location, finalBasename);
  const routePath = getCurrentRoutePath(matches);
  if (documentOnly) {
    return renderDocument({ matches, routePath, routes, renderOptions });
  } else if (!matches.length) {
    return render404();
  }

  try {
    const routeModules = await loadRouteModules(matches.map(({ route: { id, load, lazy } }) => ({ id, load, lazy })));
    const loaderData = {};
    for (const routeId in routeModules) {
      const { loader } = routeModules[routeId];
      if (loader) {
        const { data, pageConfig } = await loader(location, requestContext);
        loaderData[routeId] = {
          data,
          pageConfig,
        };
      }
    }
    runtime.setAppContext({ ...appContext, routeModules, loaderData, routePath, matches, appData });
    if (runtimeModules.commons) {
      await Promise.all(runtimeModules.commons.map(m => runtime.loadModule(m)).filter(Boolean));
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
    return renderDocument({ matches, routePath, renderOptions, routes, downgrade: true });
  }
}

// https://github.com/ice-lab/ice-next/issues/133
function render404(): RenderResult {
  return {
    value: 'Not Found',
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
): Promise<RenderResult> {
  const { Document } = renderOptions;
  const appContext = runtime.getAppContext();
  const { routes, routePath, loaderData } = appContext;
  const AppRuntimeProvider = runtime.composeAppProvider() || React.Fragment;
  const AppRouter = runtime.getAppRouter();
  const documentContext = {
    main: (
      <AppRouter routes={routes} location={location} loaderData={loaderData} />
    ),
  };
  const element = (
    <AppContextProvider value={appContext}>
      <AppRuntimeProvider>
        <DocumentContextProvider value={documentContext}>
          <Document pagePath={routePath} />
        </DocumentContextProvider>
      </AppRuntimeProvider>
    </AppContextProvider>
  );

  const pipe = renderToNodeStream(element);

  const fallback = () => {
    return renderDocument({ matches, routePath, renderOptions, routes, downgrade: true });
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
  routes: RouteItem[];
  routePath?: string;
  downgrade?: boolean;
}

/**
 * Render Document for CSR.
 */
function renderDocument(options: RenderDocumentOptions): RenderResult {
  const {
    matches,
    renderOptions,
    routePath,
    downgrade,
    routes,
  }: RenderDocumentOptions = options;

  const {
    assetsManifest,
    app,
    Document,
    basename,
    routesConfig = {},
    serverData,
  } = renderOptions;

  const appData = null;
  const appConfig = getAppConfig(app);

  const loaderData = {};
  matches.forEach(async (match) => {
    const { id } = match.route;
    const pageConfig = routesConfig[id];

    loaderData[id] = {
      pageConfig: pageConfig ? pageConfig({}) : {},
    };
  });

  const appContext: AppContext = {
    assetsManifest,
    appConfig,
    appData,
    loaderData,
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
