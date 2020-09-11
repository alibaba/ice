import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as ReactDOMServer from 'react-dom/server';
import { createNavigation } from 'create-app-container';
import { createUseRouter } from 'create-use-router';

const { createElement, useEffect, useState, Fragment, useLayoutEffect } = React;

const useRouter = createUseRouter({ useState, useLayoutEffect });

export function reactAppRendererWithSSR(context, options) {
  const { appConfig } = options || {};
  appConfig.router.type = 'static';
  return _renderApp(context, options);
}

export async function reactAppRenderer(options) {
  const { appConfig, setAppConfig, loadStaticModules } = options || {};

  setAppConfig(appConfig);

  loadStaticModules(appConfig);

  if (process.env.__IS_SERVER__) return;

  let initialData = {};
  let pageInitialProps = {};

  // ssr enabled and the server has returned data
  if ((window as any).__ICE_APP_DATA__) {
    initialData = (window as any).__ICE_APP_DATA__;
    pageInitialProps = (window as any).__ICE_PAGE_PROPS__;
  } else {
    // ssr not enabled, or SSR is enabled but the server does not return data
    // eslint-disable-next-line
    if (appConfig.app && appConfig.app.getInitialData) {
      initialData = await appConfig.app.getInitialData();
    }
  }

  const context = { initialData, pageInitialProps };
  _renderApp(context, options);
}

function _renderApp(context, options) {
  const { appConfig, staticConfig = {}, buildConfig = {}, createBaseApp, emitLifeCycles } = options;
  const { runtime, history, appConfig: modifiedAppConfig } = createBaseApp(appConfig, buildConfig, context);

  options.appConfig = modifiedAppConfig;

  // Emit app launch cycle
  emitLifeCycles();

  const isMobile = Object.keys(staticConfig).length;
  if (isMobile) {
    return _renderMobile({ runtime, history }, options);
  } else {
    return _render({ runtime }, options);
  }
}

function _render({ runtime }, options) {
  const { ErrorBoundary, appConfig = {} } = options;
  const { ErrorBoundaryFallback, onErrorBoundaryHander, errorBoundary } = appConfig.app;
  const AppProvider = runtime?.composeAppProvider?.();
  const AppRouter = runtime?.getAppRouter?.();
  const { rootId, mountNode } = appConfig.app;

  function App() {
    const appRouter = <AppRouter />;
    const rootApp = AppProvider ? <AppProvider>{appRouter}</AppProvider> : appRouter;
    if (errorBoundary) {
      return (
        <ErrorBoundary Fallback={ErrorBoundaryFallback} onError={onErrorBoundaryHander}>
          {rootApp}
        </ErrorBoundary>
      );
    }
    return rootApp;
  }

  if (process.env.__IS_SERVER__) {
    return ReactDOMServer.renderToString(<App />);
  }

  const appMountNode = _getAppMountNode(mountNode, rootId);
  if (runtime?.modifyDOMRender) {
    return runtime?.modifyDOMRender?.({ App, appMountNode });
  }

  return ReactDOM[(window as any).__ICE_SSR_ENABLED__ ? 'hydrate' : 'render'](<App />, appMountNode);
}

function _renderMobile({ runtime, history }, options) {
  const { staticConfig, appConfig = {} } = options;
  const { routes } = staticConfig;
  const { rootId, mountNode } = appConfig.app;
  const appMountNode = _getAppMountNode(mountNode, rootId);

  return _matchInitialComponent(history.location.pathname, routes)
    .then(InitialComponent => {
      const App = () => {
        const AppNavigation = createNavigation({ createElement, useEffect, useState, Fragment });
        const { component } = useRouter({ routes, history, InitialComponent });

        return createElement(
          AppNavigation,
          {
            staticConfig,
            component,
            history,
            location: history.location,
            routes
          }
        );
      };

      const AppProvider = runtime?.composeAppProvider?.();

      const Root = () => {
        if (AppProvider) {
          return createElement(AppProvider, null, createElement(App));
        }
        return createElement(App);
      };

      const appInstance = createElement(Root);

      ReactDOM.render(appInstance, appMountNode);
    });
}

function _matchInitialComponent(fullpath, routes) {
  let initialComponent = null;
  for (let i = 0, l = routes.length; i < l; i++) {
    if (fullpath === routes[i].path || routes[i].regexp && routes[i].regexp.test(fullpath)) {
      initialComponent = routes[i].component;
      if (typeof initialComponent === 'function') initialComponent = initialComponent();
      break;
    }
  }

  return Promise.resolve(initialComponent);
}

function _getAppMountNode(mountNode, rootId) {
  return mountNode || document.getElementById(rootId) || document.getElementById('ice-container');
}
