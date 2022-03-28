import React, { useLayoutEffect, useReducer } from 'react';
import type { Update } from 'history';
import { createHashHistory, createBrowserHistory } from 'history';
import Runtime from './runtime.js';
import App from './App.js';
import type { AppContext, AppConfig, RouteItem } from './types';
import { loadRouteModules, loadPageData, matchRoutes } from './routes.js';
import getInitialData from './getInitialData.js';

export default async function runBrowserApp(
  appConfig: AppConfig,
  runtimeModules,
  routes,
) {
  const matches = matchRoutes(routes, window.location);
  const routeModules = await loadRouteModules(matches.map(match => match.route as RouteItem));
  const pageData = await loadPageData(matches, routeModules, {});
  const appContext: AppContext = {
    routes,
    appConfig,
    initialData: null,
    routeModules,
    pageData,
  };
  if (process.env.ICE_RUNTIME_INITIAL_DATA) {
    appContext.initialData = await getInitialData(appConfig);
  }

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
  const appMountNode = document.getElementById(rootId);

  render(
    <BrowserEntry
      runtime={runtime}
      routerType={routerType}
    />,
    appMountNode,
  );
}

function BrowserEntry({ runtime, routerType }: { runtime: Runtime; routerType: AppConfig['router']['type'] }) {
  const history = (routerType === 'hash' ? createHashHistory : createBrowserHistory)({ window });
  const [state, dispatch] = useReducer(
    (_: Update, update: Update) => update,
    {
      action: history.action,
      location: history.location,
    },
  );
  // listen the history change and update the state which including the latest action and location
  useLayoutEffect(() => history.listen(dispatch), [history]);

  const { action, location } = state;
  return (
    <App
      runtime={runtime}
      action={action}
      location={location}
      navigator={history}
    />
  );
}