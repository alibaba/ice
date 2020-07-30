// @ts-ignore
import { render, createElement, Fragment } from 'rax';
import { Navigation, TabBar } from 'rax-pwa';
import { useRouter } from 'rax-use-router';
import { isWeb } from 'universal-env';
import UniversalDriver from 'driver-universal';

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
  const { appConfig, history, routes, pageProps, InitialComponent } = props;
  const { component } = useRouter(() => ({ history, routes, InitialComponent }));
  // Return null directly if not matched
  if (_isNullableComponent(component)) return null;

  // TODO
  // if (isSSR) {}

  if (isWeb) {
    return createElement(
      Navigation,
      Object.assign(
        { appConfig, component, history, location: history.location, routes, InitialComponent },
        pageProps
      )
    );
  }

  return createElement(
    Fragment,
    {},
    createElement(component, Object.assign({ history, location: history.location, routes, InitialComponent }, pageProps)),
    createElement(TabBar, { history, config: appConfig.tabBar })
  );
}

function raxRenderer({ appConfig, createBaseApp, emitLifeCycles, pathRedirect, getHistory, staticConfig }) {
  const {
    runtime,
    appConfig: appDynamicConfig
  } = createBaseApp(appConfig);

  // Set custom driver
  if (typeof staticConfig.driver !== 'undefined') {
    driver = staticConfig.driver;
  }

  const { routes } = staticConfig;

  // Like https://xxx.com?_path=/page1, use `_path` to jump to a specific route.
  const history = getHistory();
  pathRedirect(history, routes);

  let _initialComponent;
  return _matchInitialComponent(history.location.pathname, routes)
    .then(initialComponent => {
      _initialComponent = initialComponent;
      const props = {
        appConfig: staticConfig,
        history,
        routes,
        pageProps: {},
        InitialComponent: _initialComponent
      };

      const AppProvider = runtime.composeAppProvider && runtime.composeAppProvider();
      const RootComponent = () => {
        if (AppProvider) {
          return (
            <AppProvider><App {...props}/></AppProvider>
          );
        }
        return <App {...props}/>;
      };

      const appInstance = createElement(RootComponent, { ...props });

      // TODO：
      // if (shell) { }

      // Emit app launch cycle
      emitLifeCycles();

      const { app = {} } = appDynamicConfig;
      const rootId = document.getElementById(app.rootId);
      if (isWeb && appDynamicConfig.rootId === null) console.warn('Error: Can not find #root element, please check which exists in DOM.');

      return render(
        appInstance,
        rootId,
        { driver }
      );
    });
}


export default raxRenderer;

