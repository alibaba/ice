import Runtime from './runtime.js';
import serverRender from './serverRender.js';
import type { AppContext, AppConfig } from './types';

export default async function runServerApp(
    requestContext,
    config: AppConfig,
    runtimeModules,
    routes,
    Document,
    documentOnly: boolean,
  ) {
  const appConfig: AppConfig = {
    ...config,
    app: {
      rootId: 'root',
      strict: true,
      ...(config?.app || {}),
    },
    router: {
      type: 'browser',
      ...(config?.router || {}),
    },
  };

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

  return serverRender(runtime, requestContext, Document, documentOnly);
}