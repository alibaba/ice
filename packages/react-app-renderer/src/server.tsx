import * as React from 'react';
import * as path from 'path';
import * as ReactDOMServer from 'react-dom/server';
import { ChunkExtractor } from '@loadable/server';
import { getRenderApp } from './renderer';

async function renderInServer(context, options) {
  const { appConfig, buildConfig = {}, staticConfig = {}, createBaseApp, emitLifeCycles } = options;
  const { runtime, appConfig: modifiedAppConfig } = createBaseApp(appConfig, buildConfig, context);

  options.appConfig = modifiedAppConfig;
  // Emit app launch cycle
  emitLifeCycles();
  const isMobile = Object.keys(staticConfig).length;
  if (isMobile) {
    // TODO: ssr is not support in mobile mode
    return { bundleContent: '' };
  }

  // const nodeStats = path.resolve('/Users/luhc228/Documents/ice/ice/examples/basic-ssr/build/server/loadable-stats.json');
  const webStats = path.resolve('/Users/luhc228/Documents/ice/ice/examples/basic-ssr/build/loadable-stats.json');
  // TODO: old version
  const App = await getRenderApp(runtime, options);
  // const nodeExtractor = new ChunkExtractor({ statsFile: nodeStats, entrypoints: ['server'] });
  // const { default: App } = nodeExtractor.requireEntrypoint();
  // console.log('nodeExtractor ==>');
  const webExtractor = new ChunkExtractor({ statsFile: webStats, entrypoints: ['index'] });
  const jsx = webExtractor.collectChunks(<App />);
  console.log('webExtractor ==>');

  return {
    bundleContent: ReactDOMServer.renderToString(jsx),
    loadableComponentExtractor: webExtractor
  };
}

export default async function reactAppRendererWithSSR(context, options) {
  const { appConfig } = options || {};
  appConfig.router.type = 'static';
  return await renderInServer(context, options);
}
