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

    const pageSource = formatPath(route.pageSource || join(dirname(this.resourcePath), route.source));

    if (route.pageSource) {
      route.pageSource = pageSource;
    } else if (mpa) {
      // Compat miniapp subpackages
      route.source = pageSource.replace(formatPath(`${this.rootContext}/src/`), '');
    }

    // First level function to support hooks will autorun function type state,
    // Second level function to support rax-use-router rule autorun function type component.
    const dynamicImportComponent =
      `(routeProps) =>
      import(/* webpackChunkName: "${getRouteName(route)}.chunk" */ '${pageSource}')
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

    const importComponentDirectly = `() => {
      function Component(props) {
        return createElement(require('${pageSource}').default, { pageConfig: ${JSON.stringify(route)}, ...props })
      }
      return Component;
    }`;

    // For rax-use-router lazy load page component
    const importComponentInClient = `() => ${importComponentDirectly}`;

    let importComponent;
    if (target === 'web') {
      importComponent = dynamicImportComponent;
    } else if (target === 'ssr') {
      // without useRouter
      importComponent = importComponentDirectly;
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
    // Only add page when route has targets field and includes target
    if (route.targets && !route.targets.includes(target)) return;
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

  if (appConfig.tabBar && !appConfig.tabBar.custom) {
    appConfig.tabBar.items = formatTabBarItems(appConfig.tabBar.items);
  }

  return `
    import { createElement } from '${libName}';
    const routes = [];
    ${assembleRoutes.join('\n')}
    const appConfig = {
      ...${JSON.stringify(appConfig)},
      routes
    };
    export default appConfig;
  `;
};

function formatTabBarItems(tabBarItems) {
  return tabBarItems.map(item => {
    const { path, name, text, pageName, ...otherConfigs } = item;
    return {
      ...otherConfigs,
      text: text || name,
      pageName: pageName || path,
    };
  });
}
