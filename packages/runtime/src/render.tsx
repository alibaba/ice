import * as React from 'react';
import * as ReactDOM from 'react-dom';
import type Runtime from './runtime.js';

function getAppMountNode(runtime: Runtime): HTMLElement {
  const appConfig = runtime.getAppConfig();
  const { rootId } = appConfig.app;
  return rootId ? document.getElementById(rootId) : document.getElementById('ice-container');
}

export default async function render(runtime: Runtime) {
  const AppProvider = runtime.composeAppProvider();
  const AppComponent = runtime.getAppComponent();

  const AppWrapper = () => {
    return AppProvider ? (
      <AppProvider>
        { AppComponent }
      </AppProvider>
    ) : AppComponent;
  };

  const appMountNode = getAppMountNode(runtime);
  if (runtime?.modifyDOMRender) {
    runtime?.modifyDOMRender?.({ App: AppWrapper, appMountNode });
  } else {
    ReactDOM.render(<AppWrapper />, appMountNode);
  }
}