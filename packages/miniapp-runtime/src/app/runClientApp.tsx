import React from 'react';
import type {
  AppContext, RunClientAppOptions,
} from '@ice/runtime';
import { AppContextProvider, AppDataProvider, getAppData, getAppConfig, Runtime } from '@ice/runtime';
import App from './App.js';
import { createMiniApp } from './connect.js';
import { setHistory } from './history.js';

export default async function runClientApp(options: RunClientAppOptions) {
  const { app, runtimeModules } = options;
  const appConfig = getAppConfig(app);
  const appContext: AppContext = {
    appExport: app,
    appConfig,
    appData: null,
  };
  const runtime = new Runtime(appContext);
  if (runtimeModules.statics) {
    await Promise.all(runtimeModules.statics.map(m => runtime.loadModule(m)).filter(Boolean));
  }
  const appData = await getAppData(app);
  const { miniappManifest } = app;

  setHistory(miniappManifest.routes);
  runtime.setAppContext({ ...appContext, appData });
  // TODO: to be tested
  if (runtimeModules.commons) {
    await Promise.all(runtimeModules.commons.map(m => runtime.loadModule(m)).filter(Boolean));
  }
  render(runtime);
  // TODO: transform routes to pages in miniappManifest
  createMiniApp(miniappManifest);
}

async function render(
  runtime: Runtime,
) {
  const appContext = runtime.getAppContext();
  const { appConfig, appData } = appContext;
  const render = runtime.getRender();
  const AppRuntimeProvider = runtime.composeAppProvider() || React.Fragment;

  // TODO:支持设置 rootId (在 miniapp-runtime 中修改)
  render(
    document.getElementById(appConfig.app.rootId || 'app'),
    <AppDataProvider value={appData}>
      <AppRuntimeProvider>
        <BrowserEntry appContext={appContext} />
      </AppRuntimeProvider>
    </AppDataProvider>,
  );
}

interface BrowserEntryProps {
  appContext: AppContext;
}

function BrowserEntry({
  appContext,
}: BrowserEntryProps) {
  return (
    <AppContextProvider value={appContext}>
      <App />
    </AppContextProvider>
  );
}
