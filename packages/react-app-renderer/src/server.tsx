import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import { ChunkExtractor } from '@loadable/server';
import { getRenderApp } from './renderer';

async function renderInServer(context, options) {
  const { appConfig, buildConfig = {}, staticConfig = {}, createBaseApp, emitLifeCycles } = options;
  const { runtime, appConfig: modifiedAppConfig } = await createBaseApp(appConfig, buildConfig, context);

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
  const { appConfig } = options || {};
  appConfig.router.type = 'static';
  return renderInServer(context, options);
}
