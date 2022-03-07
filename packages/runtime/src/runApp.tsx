
import * as React from 'react';
import Runtime from './runtime.js';
import App from './App.js';
import render from './render.js';
import type { BuildConfig, Context, InitialContext, AppConfig } from './types';

export default async function runApp(config: AppConfig, runtimeModules, routes) {
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

  const context: Context = {
    routes,
  };

  // ssr enabled and the server has returned data
  if ((window as any).__ICE_APP_DATA__) {
    context.initialData = (window as any).__ICE_APP_DATA__;
    // context.pageInitialProps = (window as any).__ICE_PAGE_PROPS__;
  } else if (appConfig?.app?.getInitialData) {
    const { href, origin, pathname, search } = window.location;
    const path = href.replace(origin, '');
    // const query = queryString.parse(search);
    const query = {};
    const ssrError = (window as any).__ICE_SSR_ERROR__;
    const initialContext: InitialContext = {
      pathname,
      path,
      query,
      ssrError,
    };
    context.initialData = await appConfig.app.getInitialData(initialContext);
  }

  const runtime = new Runtime(appConfig, buildConfig, context);
  runtime.setRenderApp((args) => {
    return <App {...args} />;
  });

  runtimeModules.forEach(m => {
    runtime.loadModule(m);
  });

  render(runtime);
}