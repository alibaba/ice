import React from 'react';
import type {
  AppContext, RunClientAppOptions,
} from '@ice/runtime';
import { AppContextProvider, getAppData, getAppConfig, Runtime } from '@ice/runtime';
import { Current } from '../index.js';
import { eventCenter } from '../emitter/emitter.js';
import { APP_DATA_READY } from '../constants/index.js';
import App from './App.js';
import { createMiniApp } from './connect.js';
import { setHistory } from './history.js';
import injectMiniappLifecycles from './injectMiniappLifecycles.js';

export default async function runClientApp(options: RunClientAppOptions) {
  const { app, runtimeModules, runtimeOptions } = options;
  const appConfig = getAppConfig(app);
  const appContext: AppContext = {
    appExport: app,
    appConfig,
    appData: null,
  };
  const runtime = new Runtime(appContext, runtimeOptions);
  if (runtimeModules.statics && runtimeModules.statics.length > 0) {
    const promises = runtimeModules.statics.map(m => runtime.loadModule(m));
    if (promises.some(promise => promise && promise.then)) {
      console.warn('Miniapp is not support async static runtime modules');
    }
  }

  const { miniappManifest, miniappLifecycles = {} } = app;
  injectMiniappLifecycles(miniappLifecycles);
  // TODO: transform routes to pages in miniappManifest
  createMiniApp(miniappManifest, miniappLifecycles);

  const appData = await getAppData(app);

  setHistory(miniappManifest.routes);
  runtime.setAppContext({ ...appContext, appData });
  if (runtimeModules.commons) {
    await Promise.all(runtimeModules.commons.map(m => runtime.loadModule(m)).filter(Boolean));
  }

  render(runtime);

  Current.appDataReady = true;
  eventCenter.trigger(APP_DATA_READY);
}

async function render(
  runtime: Runtime,
) {
  const appContext = runtime.getAppContext();
  const render = runtime.getRender();
  const AppRuntimeProvider = runtime.composeAppProvider() || React.Fragment;

  render(
    document.getElementById('ice-container'),
    <AppContextProvider value={appContext}>
      <AppRuntimeProvider>
        <App />
      </AppRuntimeProvider>
    </AppContextProvider>,
  );
}
