const { getOptions } = require('loader-utils');
const { join, dirname } = require('path');
const { formatPath } = require('@builder/app-helpers');
const getRouteName = require('../../utils/getRouteName');

/**
 * return {
 *  "routes": [
      {
        "path": "/",
        "source": "pages/Home/index",
        "component": fn,
      }
    ]
  }
 */

module.exports = function (appJSON) {
  const options = getOptions(this) || {};
  const { target, libName, mpa } = options;
  const appConfig = JSON.parse(appJSON);
  const isRootAppJsonPath = this.resourcePath === join(this.rootContext, 'src', 'app.json');

  if (mpa && isRootAppJsonPath) {
    return `
      const appConfig = ${appJSON};
      export default appConfig;
      `;
  }

  const getRouteInfo = (route) => {
    let routeTitle = appConfig.window && appConfig.window.title ? appConfig.window.title : '';
    if (route.window && route.window.title) {
      // Current route title: route.window.title
      routeTitle = route.window.title;
    }
    const pageSource = (route.pageSource || join(dirname(this.resourcePath), route.source));
    route.source = formatPath(pageSource).replace(`${formatPath(this.rootContext)}/src/`, '');

    // First level function to support hooks will autorun function type state,
    // Second level function to support rax-use-router rule autorun function type component.
    const dynamicImportComponent =
      `(routeProps) =>
      import(/* webpackChunkName: "${getRouteName(route)}.chunk" */ '${formatPath(pageSource)}')
      .then((mod) => () => {
        const reference = mod.default;
        function Component(props) {
          ${routeTitle ? `document.title="${routeTitle}"` : ''}
          return createElement(reference, { pageConfig: ${JSON.stringify(route)}, ...routeProps, ...props });
        }
        Component.__path = '${route.path}';
        Component.getInitialProps = reference.getInitialProps;
        return Component;
      })
    `;
    const importComponentInClient = `() => () => {
      function Component(props) {
        return createElement(require('${formatPath(pageSource)}').default, { pageConfig: ${JSON.stringify(route)}, ...props })
      }
      return Component;
    }`;
    // without useRouter
    const importComponentInServer = `() => {
      function Component(props) {
        return createElement(require('${formatPath(pageSource)}').default, { pageConfig: ${JSON.stringify(route)}, ...props })
      }
      return Component;
    }`;

    let importComponent;
    if (target === 'web') {
      importComponent = dynamicImportComponent;
    } else if (target === 'ssr') {
      importComponent = importComponentInServer;
    } else {
      importComponent = importComponentInClient;
    }
    return `routes.push(
      {
        ...${JSON.stringify(route)},
        component: ${importComponent}
      }
    );`;
  };

  const assembleRoutes = [];

  appConfig.routes.forEach((route) => {
    // Set page title: Web use document.title; Weex need Native App support title api;
    // Default route title: appConfig.window.title
    if (route.source) {
      assembleRoutes.push(getRouteInfo(route));
    }
    if (Array.isArray(route.frames)) {
      route.frames.forEach(frame => assembleRoutes.push(getRouteInfo(frame)));
    }
    if (route.pageHeader) {
      assembleRoutes.push(getRouteInfo(route.pageHeader));
    }
  });

  return `
    import { createElement } from '${libName}';
    const routes = [];
    ${assembleRoutes.join('\n')}
    const appConfig = {
      ...${appJSON},
      routes
    };
    export default appConfig;
  `;
};
