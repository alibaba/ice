import * as React from 'react';
import * as ReactDOM from 'react-dom';
import type Runtime from './runtime.js';
import App from './App.js';
import DefaultAppRouter from './AppRouter.js';
import {
  HashRouter,
  BrowserRouter,
} from 'react-router-dom';

export default async function render(runtime: Runtime) {
  const appContext = runtime.getAppContext();
  const { appConfig } = appContext;
  const { rootId, strict } = appConfig.app;

  const StrictMode = strict ? React.StrictMode : React.Fragment;

  // TODO: set ssr by process env
  const isSSR = true;
  const render = isSSR ? ReactDOM.hydrate : runtime.getRender();
  const AppProvider = runtime.composeAppProvider() || React.Fragment;

  let AppRouter = runtime.getAppRouter();
  if (!AppRouter) {
    const Router = appConfig.router.type === 'hash' ? HashRouter : BrowserRouter;

    AppRouter = () => (
      <Router>
        <DefaultAppRouter />
      </Router>
    );
  }

  if (appConfig.app?.getInitialData) {
  }

  const appMountNode = getAppMountNode(rootId);

  // default ReactDOM.render
  render((
    <StrictMode>
      <App
        AppProvider={AppProvider}
        AppRouter={AppRouter}
        appContext={appContext}
      />
    </StrictMode>
  ), appMountNode);
}

function getAppMountNode(rootId: string): HTMLElement {
  return rootId ? document.getElementById(rootId) : document.getElementById('ice-container');
}