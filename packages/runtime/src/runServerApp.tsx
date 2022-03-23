import Runtime from './runtime.js';
import serverRender from './serverRender.js';
import type { AppContext, AppConfig } from './types';
import matchRoutes from './matchRoutes.js';
import getRouteData from './routeData.js';

export default async function runServerApp(options) {
  const {
    requestContext,
    appConfig: config,
    runtimeModules,
    routes,
    Document,
    documentOnly,
    assetsManifest,
  } = options;

  // TODO: move this to defineAppConfig
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

  const { req } = requestContext;
  const { path } = req;

  const matches = matchRoutes(routes, path);
  const routeData = await getRouteData(requestContext, matches);

  const appContext: AppContext = {
    matches,
    routes,
    routeData,
    appConfig,
    initialData: null,
    assetsManifest,
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