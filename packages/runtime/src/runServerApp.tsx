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
  const routeAssets = getRouteAssets(assetsManifest, routes);

  const appContext: AppContext = {
    matches,
    routes,
    routeData,
    routeAssets,
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

// TODO: format when generate
function getRouteAssets(assets, routes) {
  const result = {};

  for (let i = 0, len = routes.length; i < len; i++) {
    const route = routes[i];
    const { componentName, id } = route;

    const links = [];
    const scripts = [];

    // TODO: should return chunk info
    if (assets[`${componentName}.js`]) {
      scripts.push(assets[`${componentName}.js`]);
    }

    if (assets[`${componentName}.css`]) {
      links.push(assets[`${componentName}.css`]);
    }

    result[id] = {
      links,
      scripts,
    };

    if (route.children) {
      const childResult = getRouteAssets(assets, route.children);
      Object.assign(result, childResult);
    }
  }

  return result;
}