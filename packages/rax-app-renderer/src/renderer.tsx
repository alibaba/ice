import { render, createElement, useEffect, useState, Fragment, useLayoutEffect } from 'rax';
import { createNavigation, createTabBar } from 'create-app-container';
import { createUseRouter } from 'create-use-router';
import { isWeb, isWeex, isKraken } from 'universal-env';
import UniversalDriver from 'driver-universal';

const useRouter = createUseRouter({ useState, useLayoutEffect });

let driver = UniversalDriver;

function _isNullableComponent(component) {
  return !component || Array.isArray(component) && component.length === 0;
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

function App(props) {
  const { staticConfig, history, routes, InitialComponent } = props;
  const { component } = useRouter(() => ({ history, routes, InitialComponent }));
  // Return null directly if not matched
  if (_isNullableComponent(component)) return null;

  if (isWeb) {
    const AppNavigation = createNavigation({ createElement, useEffect, useState, Fragment });
    return createElement(
      AppNavigation,
      { staticConfig, component, history, location: history.location, routes, InitialComponent },
    );
  }

  const TabBar = createTabBar({ createElement, useEffect, useState, Fragment });
  return createElement(
    Fragment,
    {},
    createElement(component, { history, location: history.location, routes, InitialComponent }),
    createElement(TabBar, { history, config: staticConfig.tabBar })
  );
}

function raxAppRenderer({ appConfig, createBaseApp, emitLifeCycles, pathRedirect, getHistory, staticConfig, createAppInstance }) {
  const {
    runtime,
    appConfig: appDynamicConfig
  } = createBaseApp(appConfig);

  // Set custom driver
  if (typeof staticConfig.driver !== 'undefined') {
    driver = staticConfig.driver;
  }

  const { routes, hydrate = false } = staticConfig;

  // Like https://xxx.com?_path=/page1, use `_path` to jump to a specific route.
  const history = getHistory();
  pathRedirect(history, routes);

  let _initialComponent;
  return _matchInitialComponent(history.location.pathname, routes)
    .then(initialComponent => {
      _initialComponent = initialComponent;
      const props = {
        staticConfig,
        history,
        routes,
        InitialComponent: _initialComponent
      };

      const AppProvider = runtime && runtime.composeAppProvider && runtime.composeAppProvider();
      const RootComponent = () => {
        if (AppProvider) {
          return (
            <AppProvider><App {...props}/></AppProvider>
          );
        }
        return <App {...props}/>;
      };

      const appInstance = typeof createAppInstance === 'function' ? createAppInstance(initialComponent) : createElement(RootComponent, { ...props });

      // Emit app launch cycle
      emitLifeCycles();

      const { app = {} } = appDynamicConfig;
      const rootEl = isWeex || isKraken ? null : document.getElementById(app.rootId);
      if (isWeb && appDynamicConfig.rootId === null) console.warn('Error: Can not find #root element, please check which exists in DOM.');

      return render(
        appInstance,
        rootEl,
        { driver, hydrate }
      );
    });
}


export default raxAppRenderer;

