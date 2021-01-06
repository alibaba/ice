const { getOptions } = require('loader-utils');
const { join, isAbsolute } = require('path');
const { formatPath, getRoutesByAppJson } = require('@builder/app-helpers');
const getRouteName = require('../../utils/getRouteName');
const { getProcessedSubAppRoutes } = require('../../utils/getProcessedRoutes');

/**
 * universal-app-config-loader
 * return {
 *  "routes": [
      {
        "path": "/",
        "source": "pages/Home/index",
        "component": fn,
      }
    ]
    "hydrate": false
  }
 */

module.exports = function (appJSON) {
  const options = getOptions(this) || {};
  const { target, libName, mpa } = options;
  const appConfig = JSON.parse(appJSON);
  const isRootAppJsonPath = this.resourcePath === join(this.rootContext, 'src', 'app.json');

  const appRoutes = getRoutesByAppJson(target, { appJsonContent: appConfig });

  if (mpa) {
    if (isRootAppJsonPath) {
      return `
      const appConfig = ${appJSON};
      export default appConfig;
      `;
    }
    appConfig.routes = getProcessedSubAppRoutes(appRoutes, this.resourcePath, this.rootContext);
  } else {
    appConfig.routes = appRoutes;
  }

  const assembleRoutes = appConfig.routes.map((route) => {
    if (!route.path || !route.source) {
      throw new Error('route object should have path and source.');
    }

    // Set page title: Web use document.title; Weex need Native App support title api;
    // Default route title: appConfig.window.title
    let routeTitle = appConfig.window && appConfig.window.title ? appConfig.window.title : '';
    if (route.window && route.window.title) {
      // Current route title: route.window.title
      routeTitle = route.window.title;
    }

    // First level function to support hooks will autorun function type state,
    // Second level function to support rax-use-router rule autorun function type component.
    const dynamicImportComponent =
      `(routeProps) =>
      import(/* webpackChunkName: "${getRouteName(route, this.rootContext).toLocaleLowerCase()}.chunk" */ '${formatPath(isAbsolute(route.source) ? route.source : join(this.rootContext, 'src', route.source))}')
      .then((mod) => () => {
        const reference = interopRequire(mod);
        function Component(props) {
          return createElement(reference, Object.assign({}, routeProps, props));
        }
        ${routeTitle ? `document.title="${routeTitle}"` : ''}
        Component.__path = '${route.path}';
        Component.getInitialProps = reference.getInitialProps;
        return Component;
      })
    `;
    const importComponent = `() => () => interopRequire(require('${formatPath(isAbsolute(route.source) ? route.source : join(this.rootContext, 'src', route.source))}'))`;
    return `routes.push(
      {
        ...${JSON.stringify(route)},
        component: ${target === 'web' ? dynamicImportComponent : importComponent}
      }
    );`;
  }).join('\n');

  return `
    import { createElement } from '${libName}';
    const interopRequire = (mod) => mod && mod.__esModule ? mod.default : mod;
    const routes = [];
    ${assembleRoutes}
    const appConfig = {
      ...${appJSON},
      routes
    };
    export default appConfig;
  `;
};
