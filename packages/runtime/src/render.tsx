import * as React from 'react';
import * as ReactDOM from 'react-dom';
import type Runtime from './runtime.js';

function getRenderApp(runtime: Runtime) {
  const appConfig = runtime.getAppConfig();
  const { strict = false } = appConfig.app;
  const AppProvider = runtime.composeAppProvider();

  const AppComponent = runtime.getAppComponent();

  function App() {
    let rootApp = <AppComponent />;
    if (AppProvider) {
      rootApp = (
        <AppProvider>
          {rootApp}
        </AppProvider>
      );
    }
    if (strict) {
      rootApp = (
        <React.StrictMode>
          {rootApp}
        </React.StrictMode>
      );
    }
    return rootApp;
  }
  return App;
}

function getAppMountNode(runtime: Runtime): HTMLElement {
  const appConfig = runtime.getAppConfig();
  const { rootId } = appConfig.app;
  return rootId ? document.getElementById(rootId) : document.getElementById('ice-container');
}

export default async function render(runtime: Runtime) {
  // TODO app lifecycle
  const App = getRenderApp(runtime);
  const appMountNode = getAppMountNode(runtime);
  if (runtime?.modifyDOMRender) {
    runtime?.modifyDOMRender?.({ App, appMountNode });
  } else {
    ReactDOM.render(<App />, appMountNode);
  }
}