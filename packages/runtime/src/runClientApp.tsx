import React, { useLayoutEffect, useState } from 'react';
import { createHashHistory, createBrowserHistory } from 'history';
import type { HashHistory, BrowserHistory } from 'history';
import Runtime from './runtime.js';
import App from './App.js';
import type { AppContext, AppConfig, RouteItem, AppRouterProps, PageWrapper, RuntimeModules } from './types';
import { loadRouteModules, loadPageData, matchRoutes } from './routes.js';
import getInitialContext from './getInitialContext.js';

export default async function runClientApp(
  appConfig: AppConfig,
  runtimeModules: RuntimeModules,
  routes: RouteItem[],
) {
  const matches = matchRoutes(routes, window.location);
  await loadRouteModules(matches.map(({ route: { id, load } }) => ({ id, load })));
  const initialContext = getInitialContext();

  let appData = (window as any).__ICE_APP_DATA__ || {};
  let { initialData } = appData;
  if (!initialData && appConfig.app?.getInitialData) {
    initialData = await appConfig.app.getInitialData(initialContext);
  }

  let pageData = (window as any).__ICE_PAGE_DATA__ || {};
  if (!pageData) {
    pageData = await loadPageData(matches, initialContext);
  }

  const appContext: AppContext = {
    routes,
    appConfig,
    initialData,
    initialPageData: pageData,
  };

  const runtime = new Runtime(appContext);
  runtimeModules.forEach(m => {
    runtime.loadModule(m);
  });

  render(runtime);
}

async function render(runtime: Runtime) {
  const appContext = runtime.getAppContext();
  const { appConfig } = appContext;
  const { app: { rootId }, router: { type: routerType } } = appConfig;
  const render = runtime.getRender();
  const AppProvider = runtime.composeAppProvider() || React.Fragment;
  const PageWrappers = runtime.getWrapperPageRegistration();
  const AppRouter = runtime.getAppRouter();
  const appMountNode = document.getElementById(rootId);
  const history = (routerType === 'hash' ? createHashHistory : createBrowserHistory)({ window });

  render(
    <BrowserEntry
      history={history}
      appContext={appContext}
      AppProvider={AppProvider}
      PageWrappers={PageWrappers}
      AppRouter={AppRouter}
    />,
    appMountNode,
  );
}

interface BrowserEntryProps {
  history: HashHistory | BrowserHistory;
  appContext: AppContext;
  AppProvider: React.ComponentType<any>;
  PageWrappers: PageWrapper<{}>[];
  AppRouter: React.ComponentType<AppRouterProps>;
}

function BrowserEntry({ history, appContext, ...rest }: BrowserEntryProps) {
  const { routes, initialPageData } = appContext;
  const [historyState, setHistoryState] = useState({
    action: history.action,
    location: history.location,
    pageData: initialPageData,
  });
  const { action, location, pageData } = historyState;

  // listen the history change and update the state which including the latest action and location
  useLayoutEffect(() => {
    history.listen(({ action, location }) => {
      const matches = matchRoutes(routes, location);
      if (!matches) {
        throw new Error(`Routes not found in location ${location}.`);
      }

      loadRouteModules(matches.map(({ route: { id, load } }) => ({ id, load })))
        .then(() => {
          const initialContext = getInitialContext();
          return loadPageData(matches, initialContext);
        })
        .then((pageData) => {
          // just re-render once, so add pageData to historyState :(
          setHistoryState({ action, location, pageData });
        });
    });
  }, []);

  return (
    <App
      action={action}
      location={location}
      navigator={history}
      appContext={{
        ...appContext,
        pageData,
      }}
      {...rest}
    />
  );
}