import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server.js';
import type { Location, To } from 'history';
import { Action, createPath, parsePath } from 'history';
import { createSearchParams } from 'react-router-dom';
import Runtime from './runtime.js';
import App from './App.js';
import { DocumentContextProvider } from './Document.js';
import { loadRouteModules, loadPageData, matchRoutes } from './routes.js';
import { getPageAssets, getEntryAssets } from './assets.js';
import type { AppContext, InitialContext, RouteItem, ServerContext, AppConfig, RuntimePlugin, CommonJsRuntime, AssetsManifest } from './types';

interface RunServerAppOptions {
  requestContext: ServerContext;
  appConfig: AppConfig;
  routes: RouteItem[];
  Document: React.ComponentType<{}>;
  documentOnly: boolean;
  runtimeModules: (RuntimePlugin | CommonJsRuntime)[];
  assetsManifest: AssetsManifest;
}

async function runServerApp(options: RunServerAppOptions): Promise<string> {
  const {
    appConfig,
    assetsManifest,
    Document,
    documentOnly,
    requestContext,
    runtimeModules,
    routes,
  } = options;

  const { req } = requestContext;
  const { url } = req;

  // ref: https://github.com/remix-run/react-router/blob/main/packages/react-router-dom/server.tsx
  const locationProps = parsePath(url);

  const location: Location = {
    pathname: locationProps.pathname || '/',
    search: locationProps.search || '',
    hash: locationProps.hash || '',
    state: null,
    key: 'default',
  };

  const matches = matchRoutes(routes, location);
  const routeModules = await loadRouteModules(matches.map(match => match.route as RouteItem));

  const initialContext: InitialContext = {
    ...requestContext,
    pathname: location.pathname,
    query: Object.fromEntries(createSearchParams(location.search)),
    path: url,
  };

  let initialData;
  if (appConfig?.app?.getInitialData) {
    initialData = await appConfig.app.getInitialData(initialContext);
  }

  const pageData = await loadPageData(matches, routeModules, initialContext);

  const appContext: AppContext = {
    matches,
    routes,
    appConfig,
    initialData,
    pageData,
    routeModules,
    assetsManifest,
  };

  const runtime = new Runtime(appContext);
  runtimeModules.forEach(m => {
    runtime.loadModule(m);
  });

  const html = render(Document, runtime, location, documentOnly);
  return html;
}

export default runServerApp;

async function render(
  Document,
  runtime: Runtime,
  location: Location,
  documentOnly: boolean,
) {
  const appContext = runtime.getAppContext();
  const { matches, initialData, pageData, assetsManifest } = appContext;

  let html = '';

  if (!documentOnly) {
    html = renderApp(runtime, location);
  }

  const pageAssets = getPageAssets(matches, assetsManifest);
  const entryAssets = getEntryAssets(assetsManifest);

  const appData = {
    initialData,
  };

  const documentContext = {
    appData,
    pageData,
    pageAssets,
    entryAssets,
    html,
  };

  const result = ReactDOMServer.renderToString(
    <DocumentContextProvider value={documentContext}>
      <Document />
    </DocumentContextProvider>,
  );

  return result;
}

function renderApp(runtime, location) {
  const staticNavigator = createStaticNavigator();

  const html = ReactDOMServer.renderToString(
    <App
      action={Action.Pop}
      runtime={runtime}
      location={location}
      navigator={staticNavigator}
      static
    />,
  );

  return html;
}

function createStaticNavigator() {
  return {
    createHref(to: To) {
      return typeof to === 'string' ? to : createPath(to);
    },
    push(to: To) {
      throw new Error(
        'You cannot use navigator.push() on the server because it is a stateless ' +
          'environment. This error was probably triggered when you did a ' +
          `\`navigate(${JSON.stringify(to)})\` somewhere in your app.`,
      );
    },
    replace(to: To) {
      throw new Error(
        'You cannot use navigator.replace() on the server because it is a stateless ' +
          'environment. This error was probably triggered when you did a ' +
          `\`navigate(${JSON.stringify(to)}, { replace: true })\` somewhere ` +
          'in your app.',
      );
    },
    go(delta: number) {
      throw new Error(
        'You cannot use navigator.go() on the server because it is a stateless ' +
          'environment. This error was probably triggered when you did a ' +
          `\`navigate(${delta})\` somewhere in your app.`,
      );
    },
    back() {
      throw new Error(
        'You cannot use navigator.back() on the server because it is a stateless ' +
          'environment.',
      );
    },
    forward() {
      throw new Error(
        'You cannot use navigator.forward() on the server because it is a stateless ' +
          'environment.',
      );
    },
    block() {
      throw new Error(
        'You cannot use navigator.block() on the server because it is a stateless ' +
          'environment.',
      );
    },
  };
}