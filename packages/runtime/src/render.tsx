import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { HashRouter, BrowserRouter, matchRoutes } from 'react-router-dom';
import type Runtime from './runtime.js';
import App from './App.js';
import AppRoutes from './AppRoutes.js';
import type { AppRouterProps } from './types';

export default async function render(runtime: Runtime) {
  const appContext = runtime.getAppContext();
  const { appConfig, routes } = appContext;
  const { rootId } = appConfig.app;

  // TODO: set ssr by process env
  const isSSR = true;
  const render = isSSR ? ReactDOM.hydrate : runtime.getRender();

  let AppRouter = runtime.getAppRouter();
  if (!AppRouter) {
    const Router = appConfig.router.type === 'hash' ? HashRouter : BrowserRouter;
    AppRouter = (props: AppRouterProps) => (
      <Router>
        <AppRoutes PageWrappers={props.PageWrappers} />
      </Router>
    );
    runtime.setAppRouter(AppRouter);
  }

  const matchedRoutes = matchRoutes(routes, window.location);
  await loadRouteChunks(matchedRoutes);

  const appMountNode = getAppMountNode(rootId);

  // default ReactDOM.render
  render((
    <App
      runtime={runtime}
    />
  ), appMountNode);
}

function getAppMountNode(rootId: string): HTMLElement {
  return rootId ? document.getElementById(rootId) : document.getElementById('ice-container');
}

async function loadRouteChunks(matchedRoutes) {
  for (let i = 0, n = matchedRoutes.length; i < n; i++) {
    const { route } = matchedRoutes[i];
    route.component = (await route.load()).default;
  }
}