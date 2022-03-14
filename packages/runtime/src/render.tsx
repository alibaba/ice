import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { HashRouter, BrowserRouter, matchRoutes } from 'react-router-dom';
import type Runtime from './runtime.js';
import App from './App.js';
import DefaultAppRouter from './AppRouter.js';

export default async function render(runtime: Runtime) {
  const appContext = runtime.getAppContext();
  const { appConfig, routes } = appContext;
  const { rootId, strict } = appConfig.app;

  const StrictMode = strict ? React.StrictMode : React.Fragment;

  // TODO: set ssr by process env
  const isSSR = true;
  const render = isSSR ? ReactDOM.hydrate : runtime.getRender();
  const AppProvider = runtime.composeAppProvider() || React.Fragment;
  const PageWrappers = runtime.getWrapperPageRegistration();

  let AppRouter = runtime.getAppRouter();
  if (!AppRouter) {
    const Router = appConfig.router.type === 'hash' ? HashRouter : BrowserRouter;
    AppRouter = () => (
      <DefaultAppRouter Router={(props) => <Router>{props.children}</Router>} />
    );
  }

  const matchedRoutes = matchRoutes(routes, window.location);
  await loadRouteModules(matchedRoutes);

  const appMountNode = getAppMountNode(rootId);

  // default ReactDOM.render
  render((
    <StrictMode>
      <App
        AppProvider={AppProvider}
        PageWrappers={PageWrappers}
        AppRouter={AppRouter}
        appContext={appContext}
      />
    </StrictMode>
  ), appMountNode);
}

function getAppMountNode(rootId: string): HTMLElement {
  return rootId ? document.getElementById(rootId) : document.getElementById('ice-container');
}

async function loadRouteModules(matchedRoutes) {
  for (let i = 0, n = matchedRoutes.length; i < n; i++) {
    const { route } = matchedRoutes[i];
    route.component = (await route.load()).default;
  }
}