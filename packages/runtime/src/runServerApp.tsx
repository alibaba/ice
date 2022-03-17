import Runtime from './runtime.js';
import serverRender from './serverRender.js';
import type { AppContext, AppConfig } from './types';
import matchRoutes from './matchRoutes.js';

export default async function runServerApp(
    requestContext,
    config: AppConfig,
    runtimeModules,
    routes,
    Document,
    documentOnly: boolean,
  ) {
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
    routeData,
    routes,
    appConfig,
    initialData: null,
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

/**
 * prepare data for matched routes
 * @param requestContext
 * @param matches
 * @returns
 */
async function getRouteData(requestContext, matches) {
  const routeData = {};

  const matchedCount = matches.length;

  for (let i = 0; i < matchedCount; i++) {
    const match = matches[i];
    const { route } = match;
    const { component, componentName } = route;

    const { getInitialData, getPageConfig } = component;
    let initialData;
    let pageConfig;

    if (getInitialData) {
      initialData = await getInitialData(requestContext);
    }

    if (getPageConfig) {
      pageConfig = getPageConfig({
        initialData,
      });
    }

    routeData[componentName] = {
      initialData,
      pageConfig,
    };
  }

  return routeData;
}