import React, { useLayoutEffect, useState } from 'react';
import * as ReactDOM from 'react-dom/client';
import { createHashHistory, createBrowserHistory, createMemoryHistory } from 'history';
import type { HashHistory, BrowserHistory, Action, Location, InitialEntry, MemoryHistory } from 'history';
import type {
  AppContext, WindowContext, AppExport, RouteItem, AppRouterProps, RoutesData, RoutesConfig,
  RouteWrapperConfig, RuntimeModules, RouteMatch, RouteModules, AppConfig, AssetsManifest,
} from './types.js';
import { createHistory as createHistorySingle } from './single-router.js';
import { setHistory } from './history.js';
import Runtime from './runtime.js';
import App from './App.js';
import { AppContextProvider } from './AppContext.js';
import { AppDataProvider, getAppData } from './AppData.js';
import { loadRouteModules, loadRoutesData, getRoutesConfig, filterMatchesToLoad } from './routes.js';
import { updateRoutesConfig } from './routesConfig.js';
import getRequestContext from './requestContext.js';
import getAppConfig from './appConfig.js';
import matchRoutes from './matchRoutes.js';
import DefaultAppRouter from './AppRouter.js';

export interface RunClientAppOptions {
  app: AppExport;
  runtimeModules: RuntimeModules;
  routes?: RouteItem[];
  hydrate?: boolean;
  basename?: string;
  memoryRouter?: boolean;
  runtimeOptions?: Record<string, any>;
}

type History = BrowserHistory | HashHistory | MemoryHistory;

export default async function runClientApp(options: RunClientAppOptions) {
  const {
    app,
    routes,
    runtimeModules,
    basename,
    hydrate,
    memoryRouter,
    runtimeOptions,
  } = options;
  const windowContext: WindowContext = (window as any).__ICE_APP_CONTEXT__ || {};
  const assetsManifest: AssetsManifest = (window as any).__ICE_ASSETS_MANIFEST__ || {};
  let {
    appData,
    routesData,
    routesConfig,
    routePath,
    downgrade,
    documentOnly,
  } = windowContext;

  const requestContext = getRequestContext(window.location);
  const appConfig = getAppConfig(app);
  const history = createHistory(appConfig, { memoryRouter, routePath });
  // Set history for import it from ice.
  setHistory(history);

  const appContext: AppContext = {
    appExport: app,
    routes,
    appConfig,
    appData,
    routesData,
    routesConfig,
    assetsManifest,
    basename,
    routePath,
  };

  const runtime = new Runtime(appContext, runtimeOptions);
  runtime.setAppRouter(DefaultAppRouter);
  // Load static module before getAppData,
  // so we can call request in in getAppData which provide by `plugin-request`.
  if (runtimeModules.statics) {
    await Promise.all(runtimeModules.statics.map(m => runtime.loadModule(m)).filter(Boolean));
  }

  if (!appData) {
    appData = await getAppData(app, requestContext);
  }

  const matches = matchRoutes(
    routes,
    memoryRouter ? routePath : history.location,
    basename,
  );
  const routeModules = await loadRouteModules(matches.map(({ route: { id, load } }) => ({ id, load })));

  if (!routesData) {
    routesData = await loadRoutesData(matches, requestContext, routeModules);
  }
  if (!routesConfig) {
    routesConfig = getRoutesConfig(matches, routesData, routeModules);
  }

  if (hydrate && !downgrade && !documentOnly) {
    runtime.setRender((container, element) => {
      ReactDOM.hydrateRoot(container, element);
    });
  }
  // Reset app context after app context is updated.
  runtime.setAppContext({ ...appContext, matches, routeModules, routesData, routesConfig, appData });
  if (runtimeModules.commons) {
    await Promise.all(runtimeModules.commons.map(m => runtime.loadModule(m)).filter(Boolean));
  }

  render({ runtime, history });
}

interface RenderOptions {
  history: History;
  runtime: Runtime;
}
async function render({ history, runtime }: RenderOptions) {
  const appContext = runtime.getAppContext();
  const { appConfig, appData } = appContext;
  const render = runtime.getRender();
  const AppRuntimeProvider = runtime.composeAppProvider() || React.Fragment;
  const RouteWrappers = runtime.getWrappers();
  const AppRouter = runtime.getAppRouter();

  const rootId = appConfig.app.rootId || 'app';
  let root = document.getElementById(rootId);
  if (!root) {
    root = document.createElement('div');
    root.id = rootId;
    document.body.appendChild(root);
    console.warn(`Root node #${rootId} is not found, current root is automatically created by the framework.`);
  }

  render(
    root,
    <AppDataProvider value={appData}>
      <AppRuntimeProvider>
        <BrowserEntry
          history={history}
          appContext={appContext}
          RouteWrappers={RouteWrappers}
          AppRouter={AppRouter}
        />
      </AppRuntimeProvider>
    </AppDataProvider>,
  );
}

interface BrowserEntryProps {
  history: HashHistory | BrowserHistory | null;
  appContext: AppContext;
  RouteWrappers: RouteWrapperConfig[];
  AppRouter: React.ComponentType<AppRouterProps>;
}

interface HistoryState {
  action: Action;
  location: Location;
}

interface RouteState {
  routesData: RoutesData;
  routesConfig: RoutesConfig;
  matches: RouteMatch[];
  routeModules: RouteModules;
}

function BrowserEntry({
  history,
  appContext,
  ...rest
}: BrowserEntryProps) {
  const {
    routes,
    matches: originMatches,
    routesData: initialRoutesData,
    routesConfig: initialRoutesConfig,
    routeModules: initialRouteModules,
    basename,
  } = appContext;

  const [historyState, setHistoryState] = useState<HistoryState>({
    action: history.action,
    location: history.location,
  });
  const [routeState, setRouteState] = useState<RouteState>({
    routesData: initialRoutesData,
    routesConfig: initialRoutesConfig,
    matches: originMatches,
    routeModules: initialRouteModules,
  });

  const { action, location } = historyState;
  const { routesData, routesConfig, matches, routeModules } = routeState;

  // listen the history change and update the state which including the latest action and location
  useLayoutEffect(() => {
    if (history) {
      history.listen(({ action, location }) => {
        const currentMatches = matchRoutes(routes, location, basename);
        if (!currentMatches.length) {
          throw new Error(`Routes not found in location ${location.pathname}.`);
        }

        loadNextPage(currentMatches, routeState).then(({ routesData, routesConfig, routeModules }) => {
          setHistoryState({
            action,
            location,
          });
          setRouteState({
            routesData,
            routesConfig,
            matches: currentMatches,
            routeModules,
          });
        });
      });
    }
    // just trigger once
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // update app context for the current route.
  Object.assign(appContext, {
    matches,
    routesData,
    routesConfig,
    routeModules,
  });

  return (
    <AppContextProvider value={appContext}>
      <App
        action={action}
        location={location}
        navigator={history}
        {...rest}
      />
    </AppContextProvider>
  );
}

/**
 * Prepare for the next pages.
 * Load modules、getPageData and preLoad the custom assets.
 */
export async function loadNextPage(
  currentMatches: RouteMatch[],
  preRouteState: RouteState,
) {
  const {
    matches: preMatches,
    routesData: preRoutesData,
    routeModules: preRouteModules,
  } = preRouteState;

  const routeModules = await loadRouteModules(
    currentMatches.map(({ route: { id, load } }) => ({ id, load })),
    preRouteModules,
  );

  // load data for changed route.
  const initialContext = getRequestContext(window.location);
  const matchesToLoad = filterMatchesToLoad(preMatches, currentMatches);
  const data = await loadRoutesData(matchesToLoad, initialContext, routeModules);

  const routesData: RoutesData = {};
  // merge page data.
  currentMatches.forEach(({ route }) => {
    const { id } = route;
    routesData[id] = data[id] || preRoutesData[id];
  });

  const routesConfig = getRoutesConfig(currentMatches, routesData, routeModules);
  await updateRoutesConfig(currentMatches, routesConfig);

  return {
    routesData,
    routesConfig,
    routeModules,
  };
}

function createHistory(
  appConfig: AppConfig,
  { memoryRouter, routePath }: { memoryRouter: boolean; routePath: string },
): History {
  const createHistory = process.env.ICE_CORE_ROUTER === 'true'
    ? createRouterHistory(appConfig?.router?.type, memoryRouter)
    : createHistorySingle;
  const createHistoryOptions: Parameters<typeof createHistory>[0] = { window };

  if (memoryRouter || appConfig?.router?.type === 'memory') {
    let initialEntries: InitialEntry[] = [];
    if (memoryRouter) {
      initialEntries = [routePath];
    } else if (appConfig?.router?.type === 'memory') {
      initialEntries = appConfig?.router?.initialEntries || [window.location.pathname];
    }
    (createHistoryOptions as Parameters<typeof createMemoryHistory>[0]).initialEntries = initialEntries;
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
