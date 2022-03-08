
import * as React from 'react';
import Runtime from './runtime.js';
import App from './App.js';
import serverRender from './serverRender.js';
import type { BuildConfig, Context, AppConfig } from './types';

export default async function runServerApp(config: AppConfig, runtimeModules, routes, Document, requestContext) {
  const appConfig: AppConfig = {
    ...config,
    app: {
      rootId: 'root',
      strict: true,
      ...(config?.app || {}),
    },
    router: {
      type: 'hash',
      ...(config?.router || {}),
    },
  };

  // loadStaticModules(appConfig);

  // TODO generate buildConfig
  const buildConfig: BuildConfig = {};

  // TODO getInitialData in server side

  const context: Context = {
    routes,
  };

  const runtime = new Runtime(appConfig, buildConfig, context);
  runtime.setRenderApp((args) => {
    return <App {...args} />;
  });

  runtimeModules.forEach(m => {
    runtime.loadModule(m);
  });

  return serverRender(requestContext, runtime, Document);
}