// @ts-ignore
import { render, createElement, Fragment } from 'rax';
import { Navigation, TabBar } from 'rax-pwa';
import { useRouter } from 'rax-use-router';
import { isWeb, isWeex, isKraken } from 'universal-env';
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
  const { appConfig, history, routes, InitialComponent } = props;
  const { component: PageComponent } = useRouter(() => ({ history, routes, InitialComponent }));
  // Return null directly if not matched
  if (_isNullableComponent(PageComponent)) return null;
  const navigationProps = { appConfig, component: PageComponent, history, location: history.location, routes, InitialComponent };
  if (isWeb) {
    return <Navigation {...navigationProps} />;
  }
  const pageProps = { history, location: history.location, routes, InitialComponent };
  const tabBarProps = { history, config: appConfig.tabBar };
  return <Fragment>
    <PageComponent {...pageProps} />
    <TabBar {...tabBarProps} />
  </Fragment>;
}

function raxAppRenderer({ appConfig, createBaseApp, emitLifeCycles, pathRedirect, getHistory, staticConfig, createAppInstance, ErrorBoundary }) {
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
        appConfig: staticConfig,
        history,
        routes,
        InitialComponent: _initialComponent
      };

      const { app = {} } = appDynamicConfig;
      const { rootId, ErrorBoundaryFallback, onErrorBoundaryHander, errorBoundary } = app;

      let appInstance;

      // For rax-app 2.x
      if (typeof createAppInstance === 'function') {
        appInstance = createAppInstance(initialComponent);
      } else {
        const AppProvider = runtime?.composeAppProvider?.();
        const RootComponent = () => {
          if (AppProvider) {
            return (
              <AppProvider><App {...props}/></AppProvider>
            );
          }
          return <App {...props}/>;
        };
        const Root = <RootComponent />;

        if (errorBoundary) {
          appInstance = <ErrorBoundary Fallback={ErrorBoundaryFallback} onError={onErrorBoundaryHander}>
            {Root}
          </ErrorBoundary>;
        } else {
          appInstance = Root;
        }
      }

      // Emit app launch cycle
      emitLifeCycles();

      const rootEl = isWeex || isKraken ? null : document.getElementById(rootId);
      if (isWeb && rootId === null) console.warn('Error: Can not find #root element, please check which exists in DOM.');

      return render(
        appInstance,
        rootEl,
        { driver, hydrate }
      );
    });
}


export default raxAppRenderer;

