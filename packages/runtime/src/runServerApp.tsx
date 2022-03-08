import * as React from 'react';
import Runtime from './runtime.js';
import serverRender from './serverRender.js';
import type { AppContext, AppConfig } from './types';

export default async function runServerApp(appConfig, runtimeModules, routes) {

  const appContext: AppContext = {
    routes,
    appConfig,
    initialData: null,
    document: Document,
  };

  if (appConfig?.app?.getInitialData) {
    appContext.initialData = await appConfig.app.getInitialData(requestContext);
  }

  const runtime = new Runtime(appContext);
  runtimeModules.forEach(m => {
    runtime.loadModule(m);
  });

  return serverRender(runtime, requestContext);
}