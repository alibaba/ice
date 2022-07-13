import React, { useLayoutEffect, useState } from 'react';
import * as ReactDOM from 'react-dom/client';
import { createHashHistory, createBrowserHistory } from 'history';
import type { HashHistory, BrowserHistory, Action, Location } from 'history';
import { createHistorySingle } from './utils/history-single.js';
import Runtime from './runtime.js';
import App from './App.js';
import { AppContextProvider } from './AppContext.js';
import type {
  AppContext, AppExport, RouteItem, AppRouterProps, RoutesData, RoutesConfig,
  RouteWrapperConfig, RuntimeModules, RouteMatch, ComponentWithChildren, RouteModules,
} from './types.js';
import { loadRouteModules, loadRoutesData, getRoutesConfig, filterMatchesToLoad } from './routes.js';
import { updateRoutesConfig } from './routesConfig.js';
import getRequestContext from './requestContext.js';
import getAppConfig from './appConfig.js';
import matchRoutes from './matchRoutes.js';

interface RunClientAppOptions {
  app: AppExport;
  routes: RouteItem[];
  runtimeModules: RuntimeModules;
  Document: ComponentWithChildren<{}>;
  basename?: string;
  hydrate: boolean;
}

export default async function runClientApp(options: RunClientAppOptions) {
  const {
    app,
    routes,
    runtimeModules,
    Document,
    basename: defaultBasename,
    hydrate,
  } = options;
  const appContextFromServer: AppContext = (window as any).__ICE_APP_CONTEXT__ || {};
  let { routesData, routesConfig, assetsManifest, basename: basenameFromServer } = appContextFromServer;

  const requestContext = getRequestContext(window.location);

  const appConfig = getAppConfig(app);

  const basename = basenameFromServer || defaultBasename;

  const matches = matchRoutes(routes, window.location, basename);
  const routeModules = await loadRouteModules(matches.map(({ route: { id, load } }) => ({ id, load })));

  if (!routesData) {
    routesData = await loadRoutesData(matches, requestContext, routeModules);
  }
  if (!routesConfig) {
    routesConfig = getRoutesConfig(matches, routesConfig, routeModules);
  }

  const appContext: AppContext = {
    appExport: app,
    routes,
    appConfig,
    routesData,
    routesConfig,
    assetsManifest,
    matches,
    routeModules,
    basename,
  };

  const runtime = new Runtime(appContext);

  if (hydrate) {
    runtime.setRender((container, element) => {
      ReactDOM.hydrateRoot(container, element);
    });
  }

  await Promise.all(runtimeModules.map(m => runtime.loadModule(m)).filter(Boolean));

  render(runtime, Document);
}

async function render(runtime: Runtime, Document: ComponentWithChildren<{}>) {
  const appContext = runtime.getAppContext();
  const render = runtime.getRender();
  const AppProvider = runtime.composeAppProvider() || React.Fragment;
  const RouteWrappers = runtime.getWrappers();
  const AppRouter = runtime.getAppRouter();

  const createHistory = process.env.ICE_CORE_ROUTER === 'true'
    ? (appContext.appConfig?.router?.type === 'hash' ? createHashHistory : createBrowserHistory)
    : createHistorySingle;
  const history = createHistory({ window });

  render(
    document.getElementById(appContext.appConfig.app.rootId),
    <BrowserEntry
      history={history}
      appContext={appContext}
      AppProvider={AppProvider}
      RouteWrappers={RouteWrappers}
      AppRouter={AppRouter}
      Document={Document}
    />,
  );
}

interface BrowserEntryProps {
  history: HashHistory | BrowserHistory | null;
  appContext: AppContext;
  AppProvider: React.ComponentType<any>;
  RouteWrappers: RouteWrapperConfig[];
  AppRouter: React.ComponentType<AppRouterProps>;
  Document: ComponentWithChildren<{}>;
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
  Document,
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
async function loadNextPage(
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