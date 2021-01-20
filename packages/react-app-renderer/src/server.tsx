import * as React from 'react';
import * as path from 'path';
import * as ReactDOMServer from 'react-dom/server';
import { ChunkExtractor } from '@loadable/server';
import { getRenderApp } from './renderer';

async function renderInServer(context, options) {
  const { appConfig, buildConfig = {}, staticConfig = {}, createBaseApp, emitLifeCycles } = options;
  const { runtime, appConfig: modifiedAppConfig } = createBaseApp(appConfig, buildConfig, context);

  let { loadableStatsPath } = buildConfig;

  options.appConfig = modifiedAppConfig;
  // Emit app launch cycle
  emitLifeCycles();
  const isMobile = Object.keys(staticConfig).length;
  if (isMobile) {
    // TODO: ssr is not support in mobile mode
    return { bundleContent: '' };
  }

  const App = await getRenderApp(runtime, options);

  if (process.env.NODE_ENV === 'development') {
    loadableStatsPath = '/Users/luhc228/Documents/ice/ice/examples/basic-ssr-with-lazy-load/build/loadable-stats.json';
  }

  const webExtractor = new ChunkExtractor({ statsFile: loadableStatsPath, entrypoints: ['index'] });
  const jsx = webExtractor.collectChunks(<App />);

  return {
    bundleContent: ReactDOMServer.renderToString(jsx),
    loadableComponentExtractor: webExtractor
  };
}

export default async function reactAppRendererWithSSR(context, options) {
  const { appConfig } = options || {};
  console.log('options===>', options);
  appConfig.router.type = 'static';
  return await renderInServer(context, options);
}
