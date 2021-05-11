import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import { ChunkExtractor } from '@loadable/server';
import { getRenderApp } from './renderer';

function renderInServer(context, options) {
  const { appConfig, buildConfig = {}, staticConfig = {}, createBaseApp, emitLifeCycles } = options;
  const { runtime, appConfig: modifiedAppConfig } = createBaseApp(appConfig, buildConfig, context);

  const { loadableStatsPath, publicPath } = buildConfig;

  options.appConfig = modifiedAppConfig;
  // Emit app launch cycle
  emitLifeCycles();
  const isMobile = Object.keys(staticConfig).length;
  if (isMobile) {
    // TODO: ssr is not support in mobile mode
    return { bundleContent: '' };
  }

  const App = getRenderApp(runtime, options);

  const webExtractor = new ChunkExtractor({
    statsFile: loadableStatsPath,
    entrypoints: ['index'],
    publicPath
  });
  const jsx = webExtractor.collectChunks(<App />);

  return {
    bundleContent: ReactDOMServer.renderToString(jsx),
    loadableComponentExtractor: webExtractor
  };
}

export default function reactAppRendererWithSSR(context, options) {
  const cloneOptions = deepClone(options);
  const { appConfig } = cloneOptions || {};
  appConfig.router = appConfig.router || {};
  if (appConfig.router.type !== 'browser') {
    throw new Error('[SSR]: Only support BrowserRouter when using SSR. You should set the router type to "browser". For more detail, please visit https://ice.work/docs/guide/basic/router');
  }
  appConfig.router.type = 'static';
  return renderInServer(context, cloneOptions);
}

function deepClone(config) {
  if(typeof config !== 'object' || config === null) {
    return config;
  }
  const ret = {};
  Object.getOwnPropertyNames(config).forEach((key: string) => {
    if (Object.prototype.hasOwnProperty.call(config, key)) {
      ret[key] = deepClone(config[key]);
    }
  });
  return ret;
}
