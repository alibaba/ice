import React from 'react';
import type {
  AppContext, RouteWrapperConfig,
} from '@ice/types';
import { AppContextProvider, AppDataProvider, getAppData, getAppConfig, Runtime } from '@ice/runtime';
import type { RunClientAppOptions } from '@ice/runtime';
import App from './App.js';
import { createMiniApp } from './connect.js';
import { setHistory } from './history.js';

export default async function runClientApp(options: RunClientAppOptions) {
  const { app, runtimeModules } = options;
  const appData = await getAppData(app);
  const { miniappManifest } = app;
  const appConfig = getAppConfig(app);
  setHistory(miniappManifest.routes);
  const appContext: AppContext = {
    appExport: app,
    appConfig,
    appData,
  };
  const runtime = new Runtime(appContext);

  // TODO: to be tested
  await Promise.all(runtimeModules.map(m => runtime.loadModule(m)).filter(Boolean));
  render(runtime);
  // TODO: transform routes to pages in miniappManifest
  createMiniApp(miniappManifest);
}

async function render(
  runtime: Runtime,
) {
  const appContext = runtime.getAppContext();
  const { appConfig } = appContext;
  const render = runtime.getRender();
  const AppProvider = runtime.composeAppProvider() || React.Fragment;
  const RouteWrappers = runtime.getWrappers();

  // TODO:支持设置 rootId (在 miniapp-runtime 中修改)
  render(
    document.getElementById(appConfig.app.rootId || 'app'),
    <BrowserEntry
      appContext={appContext}
      AppProvider={AppProvider}
      RouteWrappers={RouteWrappers}
    />,
  );
}

interface BrowserEntryProps {
  appContext: AppContext;
  AppProvider: React.ComponentType<any>;
  RouteWrappers: RouteWrapperConfig[];
}

function BrowserEntry({
  appContext,
  ...rest
}: BrowserEntryProps) {
  const {
    appData,
  } = appContext;

  return (
    <AppContextProvider value={appContext}>
      <AppDataProvider value={appData}>
        <App
          {...rest}
        />
      </AppDataProvider>
    </AppContextProvider>
  );
}
