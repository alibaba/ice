import type { ServerResponse } from 'http';
import * as path from 'path';
import { fileURLToPath } from 'url';
import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import { Action, parsePath } from 'history';
import * as htmlparser2 from 'htmlparser2';
import ejs from 'ejs';
import fse from 'fs-extra';
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
  DistType,
} from './types.js';
import Runtime from './runtime.js';
import App from './App.js';
import { AppContextProvider } from './AppContext.js';
import { AppDataProvider, getAppData } from './AppData.js';
import getAppConfig from './appConfig.js';
import { DocumentContextProvider } from './Document.js';
import { loadRouteModules, loadRoutesData, getRoutesConfig } from './routes.js';
import { piperToString, renderToNodeStream } from './server/streamRender.js';
import { createStaticNavigator } from './server/navigator.js';
import type { NodeWritablePiper } from './server/streamRender.js';
import getRequestContext from './requestContext.js';
import matchRoutes from './matchRoutes.js';
import getCurrentRoutePath from './utils/getCurrentRoutePath.js';
import DefaultAppRouter from './AppRouter.js';
import __createElement from './domRender.js';

let dirname;
if (typeof __dirname === 'string') {
  dirname = __dirname;
} else {
  dirname = path.dirname(fileURLToPath(import.meta.url));
}

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
  distType?: Array<'html' | 'javascript'> | 'html' | 'javascript';
}

interface Piper {
  pipe: NodeWritablePiper;
  fallback: Function;
}
interface RenderResult {
  statusCode?: number;
  value?: string | Piper;
  jsOutput?: string;
}

/**
 * Render and return the result as html string.
 */
export async function renderToHTML(
  requestContext: ServerContext,
  renderOptions: RenderOptions,
): Promise<RenderResult> {
  renderOptions.distType = 'html';
  return renderToEntry(requestContext, renderOptions);
}

/**
 * Render and return the result as entry string.
 */
export async function renderToEntry(
  requestContext: ServerContext,
  renderOptions: RenderOptions,
): Promise<RenderResult> {
  const result = await doRender(requestContext, renderOptions);

  const { value } = result;

  if (typeof value === 'string') {
    return result;
  }

  const { pipe, fallback } = value;

  try {
    const entryStr = await piperToString(pipe);

    return {
      value: entryStr,
      statusCode: 200,
    };
  } catch (error) {
    if (renderOptions.disableFallback) {
      throw error;
    }
    console.error('PiperToString error, downgrade to CSR.', error);
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
  const { distType } = renderOptions;
  const result = await doRender(requestContext, renderOptions);

  const { value } = result;

  if (typeof value === 'string') {
    sendResult(res, result, distType);
  } else {
    const { pipe, fallback } = value;

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html; charset=utf-8');

    try {
      await pipeToResponse(res, pipe);
    } catch (error) {
      if (renderOptions.disableFallback) {
        throw error;
      }
      console.error('PiperToResponse error, downgrade to CSR.', error);
      // downgrade to CSR.
      const result = await fallback();
      sendResult(res, result, distType);
    }
  }
}

/**
 * Send string result to ServerResponse.
 */
async function sendResult(res: ServerResponse, result: RenderResult, distType: DistType) {
  res.statusCode = result.statusCode;
  if (distType && distType.includes('javascript') || distType === 'javascript') {
    res.setHeader('Content-Type', 'text/js; charset=utf-8');
    res.end(result.jsOutput);
  } else {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.end(result.value);
  }
}

/**
 * Send stream result to ServerResponse.
 */
function pipeToResponse(res: ServerResponse, pipe: NodeWritablePiper) {
  return new Promise((resolve, reject) => {
    pipe(res, (err) => (err ? reject(err) : resolve(null)));
  });
}

async function doRender(serverContext: ServerContext, renderOptions: RenderOptions): Promise<RenderResult> {
  const { req } = serverContext;
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
    distType,
  } = renderOptions;
  const finalBasename = serverOnlyBasename || basename;
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
    assetsManifest,
    basename: finalBasename,
    matches: [],
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
  if (!matches.length) {
    return render404();
  }

  if (distType === 'javascript' || (Array.isArray(distType) && distType.includes('javascript'))
  ) {
    return renderDocument({ matches, renderOptions });
  }

  const routePath = getCurrentRoutePath(matches);

  if (documentOnly) {
    return renderDocument({ matches, routePath, renderOptions });
  }
  try {
    const routeModules = await loadRouteModules(matches.map(({ route: { id, load } }) => ({ id, load })));
    const routesData = await loadRoutesData(matches, requestContext, routeModules, { renderMode });
    const routesConfig = getRoutesConfig(matches, routesData, routeModules);
    runtime.setAppContext({ ...appContext, routeModules, routesData, routesConfig, routePath, matches, appData });
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
    return renderDocument({ matches, routePath, renderOptions, downgrade: true });
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

  const pipe = renderToNodeStream(element, false);

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
  distType?: Array<'html' | 'javascript'>;
}

function renderDocumentToJs(html) {
  let jsOutput = '';
  const dom = htmlparser2.parseDocument(html);

  let headElement;
  let bodyElement;
  function findElement(node) {
    if (headElement && bodyElement) return;

    if (node.name === 'head') {
      headElement = node;
    } else if (node.name === 'body') {
      bodyElement = node;
    }

    const {
      children = [],
    } = node;
    children.forEach(findElement);
  }
  findElement(dom);

  const extraScript = [];
  function parse(node) {
    const {
      name,
      attribs,
      data,
      children,
    } = node;
    let resChildren = [];

    if (children) {
      if (name === 'script' && children[0] && children[0].data) {
        extraScript.push(`(function(){${children[0].data}})();`);
      } else {
        resChildren = node.children.map(parse);
      }
    }

    return {
      tagName: name,
      attributes: attribs,
      children: resChildren,
      text: data,
    };
  }

  const head = parse(headElement);
  const body = parse(bodyElement);

  const templateContent = fse.readFileSync(path.join(dirname, '../templates/js-entry.js.ejs'), 'utf-8');
  jsOutput = ejs.render(templateContent, {
    createElement: __createElement,
    head,
    body,
    extraScript,
  });

  return jsOutput;
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
  }: RenderDocumentOptions = options;

  const {
    routes,
    assetsManifest,
    app,
    Document,
    basename,
    routesConfig = {},
    distType = ['html'],
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

  let jsOutput = '';
  if (distType.includes('javascript') || distType === 'javascript') {
    jsOutput = renderDocumentToJs(htmlStr);
  }

  return {
    value: `<!DOCTYPE html>${htmlStr}`,
    jsOutput,
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
