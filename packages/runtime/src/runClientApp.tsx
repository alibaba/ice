import React from 'react';
import * as ReactDOM from 'react-dom/client';
import { createHashHistory, createBrowserHistory, createMemoryHistory } from '@remix-run/router';
import type { History } from '@remix-run/router';
import type {
  AppContext, WindowContext, AppExport, RouteItem, RuntimeModules, AppConfig, AssetsManifest, ClientAppRouterProps,
  ErrorStack,
} from './types.js';
import { createHistory as createHistorySingle, getSingleRoute } from './singleRouter.js';
import { setHistory } from './history.js';
import Runtime from './runtime.js';
import { getAppData } from './appData.js';
import { getRoutesPath, loadRouteModule } from './routes.js';
import type { RouteLoaderOptions } from './routes.js';
import getRequestContext from './requestContext.js';
import getAppConfig from './appConfig.js';
import matchRoutes from './matchRoutes.js';
import { setFetcher, setDecorator } from './dataLoader.js';
import ClientRouter from './ClientRouter.js';
import addLeadingSlash from './utils/addLeadingSlash.js';
import { AppContextProvider } from './AppContext.js';
import { deprecatedHistory } from './utils/deprecatedHistory.js';
import reportRecoverableError from './reportRecoverableError.js';

export type CreateRoutes = (options: Pick<RouteLoaderOptions, 'renderMode' | 'requestContext'>) => RouteItem[];

export interface RunClientAppOptions {
  app: AppExport;
  runtimeModules: RuntimeModules;
  createRoutes?: CreateRoutes;
  hydrate?: boolean;
  basename?: string;
  memoryRouter?: boolean;
  runtimeOptions?: Record<string, any>;
  dataLoaderFetcher?: Function;
  dataLoaderDecorator?: Function;
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
    dataLoaderDecorator,
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
    revalidate,
  } = windowContext;
  const formattedBasename = addLeadingSlash(basename);
  const requestContext = getRequestContext(window.location);
  const appConfig = getAppConfig(app);
  const routes = createRoutes ? createRoutes({
    requestContext,
    renderMode: 'CSR',
  }) : [];
  const historyOptions = {
    memoryRouter,
    initialEntry: routePath,
    routes,
  };
  const history = createHistory(appConfig, historyOptions);
  // Set history for import it from ice.
  setHistory(deprecatedHistory(history));

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
    revalidate,
  };

  const runtime = new Runtime(appContext, runtimeOptions);
  runtime.setAppRouter<ClientAppRouterProps>(ClientRouter);
  // Load static module before getAppData,
  // so we can call request in in getAppData which provide by `plugin-request`.
  if (runtimeModules.statics) {
    await Promise.all(runtimeModules.statics.map(m => runtime.loadModule(m)).filter(Boolean));
  }

  if (process.env.ICE_CORE_REMOVE_DATA_LOADER !== 'true') {
    dataLoaderFetcher && setFetcher(dataLoaderFetcher);
    dataLoaderDecorator && setDecorator(dataLoaderDecorator);
  }

  if (!appData) {
    appData = await getAppData(app, requestContext);
  }

  const needHydrate = hydrate && !downgrade && !documentOnly;
  if (needHydrate) {
    runtime.setRender((container, element) => {
      const hydrateOptions: ReactDOM.HydrationOptions = {
        // @ts-ignore react-dom do not define the type of second argument of onRecoverableError.
        onRecoverableError: appConfig?.app?.onRecoverableError ||
        ((error: unknown, errorInfo: ErrorStack) => {
          reportRecoverableError(error, errorInfo, { ignoreRuntimeWarning: revalidate });
        }),
      };
      if (appConfig?.app?.onBeforeHydrate) {
        appConfig?.app?.onBeforeHydrate();
      }
      return ReactDOM.hydrateRoot(container, element, hydrateOptions);
    });
  }
  // Reset app context after app context is updated.
  runtime.setAppContext({ ...appContext, appData });
  if (runtimeModules.commons) {
    await Promise.all(runtimeModules.commons.map(m => runtime.loadModule(m)).filter(Boolean));
  }

  return render({ runtime, history, needHydrate });
}

interface RenderOptions {
  history: History;
  runtime: Runtime;
  needHydrate: boolean;
}

async function render({ history, runtime, needHydrate }: RenderOptions) {
  const appContext = runtime.getAppContext();
  const { appConfig, loaderData, routes, basename, routePath } = appContext;
  const appRender = runtime.getRender();
  const AppRuntimeProvider = runtime.composeAppProvider() || React.Fragment;
  const AppRouter = runtime.getAppRouter<ClientAppRouterProps>();

  const rootId = appConfig.app.rootId || 'app';
  let root = document.getElementById(rootId);
  if (!root) {
    root = document.createElement('div');
    root.id = rootId;
    document.body.appendChild(root);
    console.warn(`Root node #${rootId} is not found, current root is automatically created by the framework.`);
  }
  const hydrationData = needHydrate ? { loaderData } : undefined;
  const routeModuleCache = {};
  const location = history.location ? history.location : { pathname: routePath || window.location.pathname };
  if (needHydrate) {
    const lazyMatches = matchRoutes(routes, location, basename).filter((m) => m.route.lazy);
    if (lazyMatches?.length > 0) {
      // Load the lazy matches and update the routes before creating your router
      // so we can hydrate the SSR-rendered content synchronously.
      await Promise.all(
        lazyMatches.map(async (m) => {
          let routeModule = await loadRouteModule(m.route, routeModuleCache);
          Object.assign(m.route, {
            ...routeModule,
            lazy: undefined,
          });
        }),
      );
    }
  }
  const routerOptions: ClientAppRouterProps['routerContext'] = {
    basename,
    routes,
    history,
    hydrationData,
    future: {
      v7_prependBasename: true,
    },
  };
  const SingleComponent = process.env.ICE_CORE_ROUTER !== 'true' &&
    await getSingleRoute(routes, basename, location, routeModuleCache);
  const renderRoot = appRender(
    root,
    <AppContextProvider value={appContext}>
      <AppRuntimeProvider>
        <AppRouter
          routerContext={routerOptions}
          routes={routes}
          location={history.location}
          Component={SingleComponent}
        />
      </AppRuntimeProvider>
    </AppContextProvider>,
  );
  return renderRoot;
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
