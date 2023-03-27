import React from 'react';
import * as ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { createRouter, createHashHistory, createBrowserHistory, createMemoryHistory } from '@remix-run/router';
import type { History } from '@remix-run/router';
import type {
  AppContext, WindowContext, AppExport, RouteItem, RuntimeModules, AppConfig, AssetsManifest,
} from './types.js';
import { createHistory as createHistorySingle } from './single-router.js';
import { setHistory } from './history.js';
import Runtime from './runtime.js';
import { AppDataProvider, getAppData } from './AppData.js';
import { getRoutesPath } from './routes.js';
import type { RouteLoaderOptions } from './routes.js';
import getRequestContext from './requestContext.js';
import getAppConfig from './appConfig.js';
import DefaultAppRouter from './AppRouter.js';
import { setFetcher } from './dataLoader.js';
import addLeadingSlash from './utils/addLeadingSlash.js';

export interface RunClientAppOptions {
  app: AppExport;
  runtimeModules: RuntimeModules;
  createRoutes?: (options: Pick<RouteLoaderOptions, 'renderMode' | 'requestContext'>) => RouteItem[];
  hydrate?: boolean;
  basename?: string;
  memoryRouter?: boolean;
  runtimeOptions?: Record<string, any>;
  dataLoaderFetcher?: Function;
}

export default async function runClientApp(options: RunClientAppOptions) {
  const {
    app,
    createRoutes,
    runtimeModules,
    basename,
    hydrate,
    memoryRouter,
    runtimeOptions,
    dataLoaderFetcher,
  } = options;

  const windowContext: WindowContext = (window as any).__ICE_APP_CONTEXT__ || {};
  const assetsManifest: AssetsManifest = (window as any).__ICE_ASSETS_MANIFEST__ || {};
  let {
    appData,
    loaderData,
    routePath,
    downgrade,
    documentOnly,
    renderMode,
    serverData,
  } = windowContext;
  const formattedBasename = addLeadingSlash(basename);
  const requestContext = getRequestContext(window.location);
  const appConfig = getAppConfig(app);
  const routes = createRoutes ? createRoutes({
    requestContext,
    renderMode,
  }) : [];
  const historyOptions = {
    memoryRouter,
    initialEntry: routePath,
    routes,
  };
  const history = createHistory(appConfig, historyOptions);
  // Set history for import it from ice.
  setHistory(history);

  const appContext: AppContext = {
    appExport: app,
    routes,
    appConfig,
    appData,
    loaderData,
    assetsManifest,
    basename: formattedBasename,
    routePath,
    renderMode,
    requestContext,
    serverData,
  };

  const runtime = new Runtime(appContext, runtimeOptions);
  runtime.setAppRouter(DefaultAppRouter);
  // Load static module before getAppData,
  // so we can call request in in getAppData which provide by `plugin-request`.
  if (runtimeModules.statics) {
    await Promise.all(runtimeModules.statics.map(m => runtime.loadModule(m)).filter(Boolean));
  }

  setFetcher(dataLoaderFetcher);

  if (!appData) {
    appData = await getAppData(app, requestContext);
  }

  if (hydrate && !downgrade && !documentOnly) {
    runtime.setRender((container, element) => {
      return ReactDOM.hydrateRoot(container, element);
    });
  }
  // Reset app context after app context is updated.
  runtime.setAppContext({ ...appContext, appData });
  if (runtimeModules.commons) {
    await Promise.all(runtimeModules.commons.map(m => runtime.loadModule(m)).filter(Boolean));
  }

  return render({ runtime, history });
}

interface RenderOptions {
  history: History;
  runtime: Runtime;
}

async function render({ history, runtime }: RenderOptions) {
  const appContext = runtime.getAppContext();
  const { appConfig, appData, routes, loaderData } = appContext;
  const appRender = runtime.getRender();
  const AppRuntimeProvider = runtime.composeAppProvider() || React.Fragment;
  // const RouteWrappers = runtime.getWrappers();
  // const AppRouter = runtime.getAppRouter();

  const rootId = appConfig.app.rootId || 'app';
  let root = document.getElementById(rootId);
  if (!root) {
    root = document.createElement('div');
    root.id = rootId;
    document.body.appendChild(root);
    console.warn(`Root node #${rootId} is not found, current root is automatically created by the framework.`);
  }

  const router = createRouter({
    routes,
    history,
    hydrationData: { loaderData },
  }).initialize();

  return appRender(
    root,
    <AppDataProvider value={appData}>
      <AppRuntimeProvider>
        <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />
      </AppRuntimeProvider>
    </AppDataProvider>,
  );
}

interface HistoryOptions {
  memoryRouter: boolean;
  initialEntry?: string;
  routes?: RouteItem[];
}

function createHistory(
  appConfig: AppConfig,
  { memoryRouter, initialEntry, routes }: HistoryOptions,
): History {
  const routerType = memoryRouter ? 'memory' : appConfig?.router?.type;
  const createHistory = process.env.ICE_CORE_ROUTER === 'true'
    ? createRouterHistory(appConfig?.router?.type, memoryRouter)
    : createHistorySingle;
  let createHistoryOptions: Parameters<typeof createHistory>[0] = { window };

  if (routerType === 'memory') {
    const memoryOptions: Parameters<typeof createMemoryHistory>[0] = {};
    memoryOptions.initialEntries = appConfig?.router?.initialEntries || getRoutesPath(routes);
    if (initialEntry) {
      const initialIndex = memoryOptions.initialEntries.findIndex((entry) =>
        typeof entry === 'string' && entry === initialEntry);
      if (initialIndex >= 0) {
        memoryOptions.initialIndex = initialIndex;
      } else {
        console.error(`path: ${initialEntry} do not match any initialEntries ${memoryOptions.initialEntries}`);
      }
    }
    createHistoryOptions = memoryOptions;
  }

  const history = createHistory(createHistoryOptions);
  return history;
}

function createRouterHistory(type: AppConfig['router']['type'], memoryRouter: boolean) {
  if (memoryRouter || type === 'memory') {
    return createMemoryHistory;
  }
  if (type === 'browser') {
    return createBrowserHistory;
  }
  if (type === 'hash') {
    return createHashHistory;
  }
}
