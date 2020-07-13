import { render, createElement, Fragment } from 'rax';
import { Navigation, TabBar } from 'rax-pwa';
import { useRouter } from 'rax-use-router';
import UniversalDriver from 'driver-universal';
import { isWeb, isMiniApp, isWeChatMiniProgram, isByteDanceMicroApp } from 'universal-env';
import { emit, addAppLifeCyle } from './appCycles';
import { SHOW, LAUNCH, ERROR, HIDE, TAB_ITEM_CLICK, NOT_FOUND, SHARE, UNHANDLED_REJECTION } from './constants';

// eslint-disable-next-line
const DEFAULE_ROOT_ID = document.getElementById('root');

let launched = false;

function _handleDynamicConfig(config) {
  if (config.dynamicConfig) {
    const { onLaunch, onShow, onError, onHide, onTabItemClick } = config;
    // multi-end valid lifecycle
    // Add app lanuch callback
    addAppLifeCyle(LAUNCH, onLaunch);
    // Add app show callback
    addAppLifeCyle(SHOW, onShow);
    // Add app error callback
    addAppLifeCyle(ERROR, onError);
    // Add app hide callback
    addAppLifeCyle(HIDE, onHide);
    // Add tab bar item click callback
    addAppLifeCyle(TAB_ITEM_CLICK, onTabItemClick);
    // Add lifecycle callbacks which only valid in Wechat MiniProgram and ByteDance MicroApp
    if (isWeChatMiniProgram || isByteDanceMicroApp) {
      const { onPageNotFound, onShareAppMessage } = config;
      // Add global share callback
      addAppLifeCyle(SHARE, onShareAppMessage);
      // Add page not found callback
      addAppLifeCyle(NOT_FOUND, onPageNotFound);
    }
    // Add lifecycle callbacks which only valid in Alibaba MiniApp
    if (isMiniApp) {
      const { onShareAppMessage, onUnhandledRejection } = config;
      // Add global share callback
      addAppLifeCyle(SHARE, onShareAppMessage);
      // Add unhandledrejection callback
      addAppLifeCyle(UNHANDLED_REJECTION, onUnhandledRejection);
    }
    return {};
  }
  // Compatible with pageProps
  return config;
}

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


function createApp(staticConfig, dynamicConfig = {}, options = {}) {
  if (launched) throw new Error('Error: runApp can only be called once.');
  if (dynamicConfig && Object.prototype.toString.call(dynamicConfig) !== '[object Object]') {
    throw new Error('Error: the runApp method second param can only be Object.');
  }

  launched = true;

  const { routes, rootId = DEFAULE_ROOT_ID } = staticConfig;
  const pageProps = _handleDynamicConfig(dynamicConfig);
  const { history } = options;

  // Set custom driver

  // Set history

  let _initialComponent;
  return _matchInitialComponent(history.location.pathname, routes)
    .then(initialComponent => {
      _initialComponent = initialComponent;
      const appInstance = createElement(App, {
        appConfig: staticConfig,
        history,
        routes,
        pageProps,
        InitialComponent: _initialComponent
      });

      // TODO：
      // if (shell) { }

      // Emit app launch cycle
      emit('launch');

      if (isWeb && rootId === null) console.warn('Error: Can not find #root element, please check which exists in DOM.');

      return render(
        appInstance,
        rootId,
        { driver: UniversalDriver }
      );
    });
};

export default createApp;
