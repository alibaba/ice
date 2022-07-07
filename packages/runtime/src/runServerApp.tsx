import type { ServerResponse } from 'http';
import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import { Action, parsePath } from 'history';
import type { Location } from 'history';
import Runtime from './runtime.js';
import App from './App.js';
import { AppContextProvider } from './AppContext.js';
import getAppConfig from './appConfig.js';
import { DocumentContextProvider } from './Document.js';
import { loadRouteModules, loadRoutesData, getRoutesConfig, matchRoutes } from './routes.js';
import { piperToString, renderToNodeStream } from './server/streamRender.js';
import { createStaticNavigator } from './server/navigator.js';
import type { NodeWritablePiper } from './server/streamRender.js';
import type {
  AppContext, RouteItem, ServerContext,
  AppExport, RuntimePlugin, CommonJsRuntime, AssetsManifest,
  ComponentWithChildren,
  RouteMatch,
  RequestContext,
  AppConfig,
  RouteModules,
  RenderMode,
} from './types.js';
import getRequestContext from './requestContext.js';

interface RenderOptions {
  app: AppExport;
  assetsManifest: AssetsManifest;
  routes: RouteItem[];
  runtimeModules: (RuntimePlugin | CommonJsRuntime)[];
  Document: ComponentWithChildren<{}>;
  documentOnly?: boolean;
  renderMode?: RenderMode;
  basename?: string;
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
 * Render and return the result as html string.
 */
export async function renderToHTML(requestContext: ServerContext, renderOptions: RenderOptions): Promise<RenderResult> {
  const result = await doRender(requestContext, renderOptions);

  const { value } = result;

  if (typeof value === 'string') {
    return result;
  }

  const { pipe, fallback } = value;

  try {
    const html = await piperToString(pipe);

    return {
      value: html,
      statusCode: 200,
    };
  } catch (error) {
    console.error('Warning: piperToString error, downgrade to csr.', error);
    // downgrade to csr.
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

    try {
      await pipeToResponse(res, pipe);
    } catch (error) {
      console.error('PiperToResponse error, downgrade to csr.', error);
      // downgrade to csr.
      const result = await fallback();
      sendResult(res, result);
    }
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
  const { routes, documentOnly, app, basename } = renderOptions;

  const location = getLocation(req.url);

  const requestContext = getRequestContext(location, serverContext);
  const appConfig = getAppConfig(app);
  const matches = matchRoutes(routes, location, basename);

  if (!matches.length) {
    return render404();
  }

  if (documentOnly) {
    return renderDocument(matches, renderOptions, {});
  }

  // FIXME: 原来是在 renderDocument 之前执行这段逻辑。
  // 现在为了避免 CSR 时把页面组件都加载进来导致资源（比如 css）加载报错，带来的问题是调用 renderHTML 的时候 getConfig 失效了
  const routeModules = await loadRouteModules(matches.map(({ route: { id, load } }) => ({ id, load })));

  try {
    return await renderServerEntry({
      appExport: app,
      requestContext,
      renderOptions,
      matches,
      location,
      appConfig,
      routeModules,
      basename,
    });
  } catch (err) {
    console.error('Warning: render server entry error, downgrade to csr.', err);
    return renderDocument(matches, renderOptions, {});
  }
}

// https://github.com/ice-lab/ice-next/issues/133
function render404(): RenderResult {
  return {
    value: 'Not Found',
    statusCode: 404,
  };
}

interface renderServerEntry {
  appExport: AppExport;
  requestContext: RequestContext;
  renderOptions: RenderOptions;
  matches: RouteMatch[];
  location: Location;
  appConfig: AppConfig;
  routeModules: RouteModules;
  basename?: string;
}

/**
 * Render App by SSR.
 */
async function renderServerEntry(
  {
    appExport,
    requestContext,
    matches,
    location,
    appConfig,
    renderOptions,
    routeModules,
    basename,
  }: renderServerEntry,
): Promise<RenderResult> {
  const {
    assetsManifest,
    runtimeModules,
    routes,
    renderMode,
    Document,
  } = renderOptions;

  const routesData = await loadRoutesData(matches, requestContext, routeModules, renderMode);
  const routesConfig = getRoutesConfig(matches, routesData, routeModules);

  const appContext: AppContext = {
    appExport,
    assetsManifest,
    appConfig,
    routesData,
    routesConfig,
    matches,
    routes,
    routeModules,
    basename,
  };

  const runtime = new Runtime(appContext);
  await Promise.all(runtimeModules.map(m => runtime.loadModule(m)).filter(Boolean));

  const staticNavigator = createStaticNavigator();
  const AppProvider = runtime.composeAppProvider() || React.Fragment;
  const RouteWrappers = runtime.getWrappers();
  const AppRouter = runtime.getAppRouter();

  const documentContext = {
    main: <App
      action={Action.Pop}
      location={location}
      navigator={staticNavigator}
      static
      AppProvider={AppProvider}
      RouteWrappers={RouteWrappers}
      AppRouter={AppRouter}
    />,
  };

  const element = (
    <AppContextProvider value={appContext}>
      <DocumentContextProvider value={documentContext}>
        <Document />
      </DocumentContextProvider>
    </AppContextProvider>
  );

  const pipe = renderToNodeStream(element, false);

  const fallback = () => {
    return renderDocument(matches, renderOptions, routeModules);
  };

  return {
    value: {
      pipe,
      fallback,
    },
  };
}

/**
 * Render Document for CSR.
 */
function renderDocument(matches: RouteMatch[], options: RenderOptions, routeModules: RouteModules): RenderResult {
  const {
    routes,
    assetsManifest,
    app,
    Document,
  } = options;

  const routesData = null;
  const appConfig = getAppConfig(app);
  const routesConfig = getRoutesConfig(matches, {}, routeModules);

  const appContext: AppContext = {
    assetsManifest,
    appConfig,
    routesData,
    routesConfig,
    matches,
    routes,
    documentOnly: true,
    routeModules,
  };

  const documentContext = {
    main: null,
  };

  const html = ReactDOMServer.renderToString(
    <AppContextProvider value={appContext}>
      <DocumentContextProvider value={documentContext}>
        <Document />
      </DocumentContextProvider>
    </AppContextProvider>,
  );

  return {
    value: `<!DOCTYPE html>${html}`,
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