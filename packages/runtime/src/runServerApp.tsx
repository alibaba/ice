import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import type { Location, To } from 'history';
import { Action, createPath, parsePath } from 'history';
import { createSearchParams } from 'react-router-dom';
import Runtime from './runtime.js';
import App from './App.js';
import { AppContextProvider } from './AppContext.js';
import { AppDataProvider } from './AppData.js';
import { loadRouteModules, loadRoutesData, getRoutesConfig, matchRoutes } from './routes.js';
import type {
  AppContext, InitialContext, RouteItem, ServerContext,
  AppConfig, RuntimePlugin, CommonJsRuntime, AssetsManifest,
  ComponentWithChildren,
} from './types';

interface RenderOptions {
  appConfig: AppConfig;
  assetsManifest: AssetsManifest;
  routes: RouteItem[];
  runtimeModules: (RuntimePlugin | CommonJsRuntime)[];
  Document: ComponentWithChildren<{}>;
}

export default async function runServerApp(requestContext: ServerContext, options: RenderOptions): Promise<string> {
  try {
    return await renderServerApp(requestContext, options);
  } catch (error) {
    console.error('renderServerApp error: ', error);
    return await renderDocument(requestContext, options);
  }
}

/**
 * Render App by SSR.
 */
export async function renderServerApp(requestContext: ServerContext, options: RenderOptions): Promise<string> {
  const { req } = requestContext;

  const {
    assetsManifest,
    appConfig,
    runtimeModules,
    routes,
    Document,
  } = options;

  const location = getLocation(req.url);
  const matches = matchRoutes(routes, location);

  if (!matches.length) {
    // TODO: Render 404
    throw new Error('No matched page found.');
  }

  await loadRouteModules(matches.map(({ route: { id, load } }) => ({ id, load })));

  const initialContext: InitialContext = {
    ...requestContext,
    pathname: location.pathname,
    query: Object.fromEntries(createSearchParams(location.search)),
    path: req.url,
  };

  let appData;
  if (appConfig.app?.getData) {
    appData = await appConfig.app.getData(initialContext);
  }

  const routesData = await loadRoutesData(matches, initialContext);
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
  runtimeModules.forEach(m => {
    runtime.loadModule(m);
  });

  const staticNavigator = createStaticNavigator();
  const AppProvider = runtime.composeAppProvider() || React.Fragment;
  const RouteWrappers = runtime.getWrappers();
  const AppRouter = runtime.getAppRouter();

  const result = ReactDOMServer.renderToString(
    <AppContextProvider value={appContext}>
      <AppDataProvider value={appData}>
        <Document>
          <App
            action={Action.Pop}
            location={location}
            navigator={staticNavigator}
            static
            AppProvider={AppProvider}
            RouteWrappers={RouteWrappers}
            AppRouter={AppRouter}
          />
        </Document>
      </AppDataProvider>
    </AppContextProvider>,
  );

  // TODO: send html in render function.
  return result;
}

/**
 * Render Document for CSR.
 */
export async function renderDocument(requestContext: ServerContext, options: RenderOptions): Promise<string> {
  const { req } = requestContext;

  const {
    routes,
    assetsManifest,
    appConfig,
    Document,
  } = options;

  const location = getLocation(req.url);
  const matches = matchRoutes(routes, location);

  if (!matches.length) {
    throw new Error('No matched page found.');
  }

  await loadRouteModules(matches.map(({ route: { id, load } }) => ({ id, load })));

  const routesConfig = getRoutesConfig(matches, {});
  // renderDocument needn't to load routesData and appData.
  const routesData = {};
  const appData = {};

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

  const result = ReactDOMServer.renderToString(
    <AppContextProvider value={appContext}>
      <AppDataProvider value={appData}>
        <Document />
      </AppDataProvider>
    </AppContextProvider>,
  );

  return result;
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