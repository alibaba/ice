import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import { getRenderApp } from './renderer';

async function renderInServer(context, options) {
  const { appConfig, buildConfig = {}, staticConfig = {}, createBaseApp, emitLifeCycles } = options;
  const { runtime, appConfig: modifiedAppConfig } = await createBaseApp(appConfig, buildConfig, context);

  options.appConfig = modifiedAppConfig;
  // Emit app launch cycle
  emitLifeCycles();
  const isMobile = Object.keys(staticConfig).length;
  if (isMobile) {
    // TODO: ssr is not support in mobile mode
    return '';
  }
  const App = getRenderApp(runtime, options);
  return ReactDOMServer.renderToString(<App />);
}

export default function reactAppRendererWithSSR(context, options) {
  const { appConfig } = options || {};
  appConfig.router.type = 'static';
  return renderInServer(context, options);
}
