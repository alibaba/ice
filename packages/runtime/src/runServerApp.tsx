import type { ServerResponse } from 'http';
import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import { Action, parsePath } from 'history';
import type { Location } from 'history';
import Runtime from './runtime.js';
import App from './App.js';
import { AppContextProvider } from './AppContext.js';
import { AppDataProvider, getAppData } from './AppData.js';
import getAppConfig from './appConfig.js';
import { DocumentContextProvider } from './Document.js';
import { loadRouteModules, loadRoutesData, getRoutesConfig, matchRoutes } from './routes.js';
import { piperToString, renderToNodeStream } from './server/streamRender.js';
import { createStaticNavigator } from './server/navigator.js';
import type { NodeWritablePiper } from './server/streamRender.js';
import type {
  AppContext, RouteItem, ServerContext,
  AppEntry, RuntimePlugin, CommonJsRuntime, AssetsManifest,
  ComponentWithChildren,
} from './types';
import getRequestContext from './requestContext.js';

interface RenderOptions {
  app: AppEntry;
  assetsManifest: AssetsManifest;
  routes: RouteItem[];
  runtimeModules: (RuntimePlugin | CommonJsRuntime)[];
  Document: ComponentWithChildren<{}>;
  documentOnly?: boolean;
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
export async function renderToHTML(requestContext: ServerContext, options: RenderOptions): Promise<RenderResult> {
  const result = await doRender(requestContext, options);

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
export async function renderToResponse(requestContext: ServerContext, options: RenderOptions) {
  const { res } = requestContext;
  const result = await doRender(requestContext, options);

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
      console.error('Warning: piperToResponse error, downgrade to csr.', error);
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
function pipeToResponse(res, pipe: NodeWritablePiper) {
  return new Promise((resolve, reject) => {
    pipe(res, (err) => (err ? reject(err) : resolve(null)));
  });
}

async function doRender(serverContext: ServerContext, options: RenderOptions): Promise<RenderResult> {
  const { req } = serverContext;

  const {
    routes,
    documentOnly,
  } = options;

  const location = getLocation(req.url);
  const matches = matchRoutes(routes, location);

  if (!matches.length) {
    return render404();
  }

  await loadRouteModules(matches.map(({ route: { id, load } }) => ({ id, load })));

  if (documentOnly) {
    return renderDocument(matches, options);
  }

  try {
    return await renderServerEntry(serverContext, options, matches, location);
  } catch (err) {
    console.error('Warning: render server entry error, downgrade to csr.', err);
    return renderDocument(matches, options);
  }
}

// https://github.com/ice-lab/ice-next/issues/133
function render404(): RenderResult {
  return {
    value: 'Page is Not Found',
    statusCode: 404,
  };
}

/**
 * Render App by SSR.
 */
export async function renderServerEntry(
  serverContext: ServerContext, options: RenderOptions, matches, location,
): Promise<RenderResult> {
  const {
    assetsManifest,
    app,
    runtimeModules,
    routes,
    Document,
  } = options;

  const requestContext = getRequestContext(location, serverContext);

  const appData = await getAppData(app, requestContext);
  const appConfig = getAppConfig(app, appData);
  const routesData = await loadRoutesData(matches, requestContext);
  const routesConfig = getRoutesConfig(matches, routesData);

  const appContext: AppContext = {
    appConfig,
    assetsManifest,
    appData,
    routesData,
    routesConfig,
    matches,
    routes,
  };

  const runtime = new Runtime(appContext);
  if (appConfig?.app?.addProvider) {
    runtime.addProvider(appConfig.app.addProvider);
  }
  runtimeModules.forEach(m => {
    runtime.loadModule(m);
  });

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
      <AppDataProvider value={appData}>
        <DocumentContextProvider value={documentContext}>
          <Document />
        </DocumentContextProvider>
      </AppDataProvider>
    </AppContextProvider>
  );

  const pipe = await renderToNodeStream(element, false);

  const fallback = () => {
    renderDocument(matches, options);
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
export function renderDocument(matches, options: RenderOptions): RenderResult {
  const {
    routes,
    assetsManifest,
    app,
    Document,
  } = options;

  // renderDocument needn't to load routesData and appData.
  const appData = null;
  const routesData = null;
  const appConfig = getAppConfig(app, appData);
  const routesConfig = getRoutesConfig(matches, {});

  const appContext: AppContext = {
    assetsManifest,
    appConfig,
    appData,
    routesData,
    routesConfig,
    matches,
    routes,
    documentOnly: true,
  };

  const documentContext = {
    main: null,
  };

  const html = ReactDOMServer.renderToString(
    <AppContextProvider value={appContext}>
      <AppDataProvider value={appData}>
        <DocumentContextProvider value={documentContext}>
          <Document />
        </DocumentContextProvider>
      </AppDataProvider>
    </AppContextProvider>,
  );

  return {
    value: html,
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