import React, { useLayoutEffect, useState } from 'react';
import { createHashHistory, createBrowserHistory } from 'history';
import type { HashHistory, BrowserHistory, Action, Location } from 'history';
import { createHistorySingle } from './utils/history-single.js';
import { createSearchParams } from './utils/createSearchParams.js';
import Runtime from './runtime.js';
import App from './App.js';
import { AppContextProvider } from './AppContext.js';
import { AppDataProvider } from './AppData.js';
import type {
  AppContext, AppConfig, RouteItem, AppRouterProps, RoutesData, RoutesConfig,
  RouteWrapper, RuntimeModules, InitialContext, RouteMatch, ComponentWithChildren,
} from './types';
import { loadRouteModules, loadRoutesData, getRoutesConfig, matchRoutes, filterMatchesToLoad } from './routes.js';
import { loadStyleLinks, loadScripts } from './assets.js';
import { getLinks, getScripts } from './routesConfig.js';

interface RunClientAppOptions {
  appConfig: AppConfig;
  routes: RouteItem[];
  runtimeModules: RuntimeModules;
  Document: ComponentWithChildren<{}>;
}

export default async function runClientApp(options: RunClientAppOptions) {
  const {
    appConfig,
    routes,
    runtimeModules,
    Document,
  } = options;

  const matches = matchRoutes(routes, window.location);
  await loadRouteModules(matches.map(({ route: { id, load } }) => ({ id, load })));

  const appContextFromServer: AppContext = (window as any).__ICE_APP_CONTEXT__ || {};
  let { appData, routesData, routesConfig, assetsManifest } = appContextFromServer;

  const initialContext = getInitialContext();
  if (!appData && appConfig.app?.getData) {
    appData = await appConfig.app.getData(initialContext);
  }

  if (!routesData) {
    routesData = await loadRoutesData(matches, initialContext);
  }

  if (!routesConfig) {
    routesConfig = getRoutesConfig(matches, routesConfig);
  }

  const appContext: AppContext = {
    routes,
    appConfig,
    appData,
    routesData,
    routesConfig,
    assetsManifest,
    matches,
  };

  const runtime = new Runtime(appContext);
  runtimeModules.forEach(m => {
    runtime.loadModule(m);
  });

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
    document,
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
  RouteWrappers: RouteWrapper[];
  AppRouter: React.ComponentType<AppRouterProps>;
  Document: ComponentWithChildren<{}>;
}

interface HistoryState {
  action: Action;
  location: Location;
  routesData: RoutesData;
  routesConfig: RoutesConfig;
  matches: RouteMatch[];
}

function BrowserEntry({ history, appContext, Document, ...rest }: BrowserEntryProps) {
  const {
    routes, matches: originMatches, routesData: initialRoutesData,
    routesConfig: initialRoutesConfig, appData,
  } = appContext;

  const [historyState, setHistoryState] = useState<HistoryState>({
    action: history.action,
    location: history.location,
    routesData: initialRoutesData,
    routesConfig: initialRoutesConfig,
    matches: originMatches,
  });

  const { action, location, routesData, routesConfig, matches } = historyState;

  // listen the history change and update the state which including the latest action and location
  useLayoutEffect(() => {
    if (history) {
      history.listen(({ action, location }) => {
        const currentMatches = matchRoutes(routes, location);
        if (!currentMatches.length) {
          throw new Error(`Routes not found in location ${location.pathname}.`);
        }

        loadNextPage(currentMatches, historyState).then(({ routesData, routesConfig }) => {
          setHistoryState({
            action,
            location,
            routesData,
            routesConfig,
            matches: currentMatches,
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
  });

  return (
    <AppContextProvider value={appContext}>
      <AppDataProvider value={appData}>
        <Document>
          <App
            action={action}
            location={location}
            navigator={history}
            {...rest}
          />
        </Document>
      </AppDataProvider>
    </AppContextProvider>
  );
}

/**
 * Prepare for the next pages.
 * Load modules、getPageData and preLoad the custom assets.
 */
async function loadNextPage(currentMatches: RouteMatch[], prevHistoryState: HistoryState) {
  const {
    matches: preMatches,
    routesData: preRoutesData,
  } = prevHistoryState;

  await loadRouteModules(currentMatches.map(({ route: { id, load } }) => ({ id, load })));

  // load data for changed route.
  const initialContext = getInitialContext();
  const matchesToLoad = filterMatchesToLoad(preMatches, currentMatches);
  const data = await loadRoutesData(matchesToLoad, initialContext);

  const routesData: RoutesData = {};
  // merge page data.
  currentMatches.forEach(({ route }) => {
    const { id } = route;
    routesData[id] = data[id] || preRoutesData[id];
  });

  const routesConfig = getRoutesConfig(currentMatches, routesData);

  const links = getLinks(currentMatches, routesConfig);
  const scripts = getScripts(currentMatches, routesConfig);

  await Promise.all([
    loadStyleLinks(links),
    loadScripts(scripts),
  ]);

  return {
    routesData,
    routesConfig,
  };
}

function getInitialContext() {
  const { href, origin, pathname, search } = window.location;
  const path = href.replace(origin, '');
  const query = Object.fromEntries(createSearchParams(search));
  const initialContext: InitialContext = {
    pathname,
    path,
    query,
  };

  return initialContext;
}