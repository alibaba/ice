import Runtime from './runtime.js';
import serverRender from './serverRender.js';
import type { AppContext, AppConfig } from './types';
import matchRoutes from './matchRoutes.js';

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

  const assets = {};
  formatAssetsManifest(assetsManifest, routes, assets);

  console.log(assets);

  const appContext: AppContext = {
    matches,
    routeData,
    routes,
    appConfig,
    assets,
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

// TODO: format when generate
function formatAssetsManifest(assets, routes, result) {
  for (let i = 0, len = routes.length; i < len; i++) {
    const route = routes[i];
    const { componentName } = route;

    if (assets[`${componentName}.js`]) {
      result[componentName] = {
        links: [],
        scripts: [],
      };
      result[componentName].scripts.push(assets[`${componentName}.js`]);
    }

    if (assets[`${componentName}.css`]) {
      result[componentName].links.push(assets[`${componentName}.css`]);
    }

    if (route.children) {
      formatAssetsManifest(assets, route.children, result);
    }
  }
}