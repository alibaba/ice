import { addAppLifeCyle } from './appCycles';
import { SHOW, LAUNCH, ERROR, HIDE, TAB_ITEM_CLICK, NOT_FOUND, SHARE, UNHANDLED_REJECTION } from './constants';
import RuntimeModule from './runtimeModule';
import loadRuntimeModules from './loadRuntimeModlues';

let launched = false;

function _handleDynamicConfig(config, env) {
  if (config.dynamicConfig) {
    const { isWeChatMiniProgram, isByteDanceMicroApp, isMiniApp } = env;
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

function createApp(staticConfig, dynamicConfig = {}, options = {}) {
  if (launched) throw new Error('Error: runApp can only be called once.');
  if (dynamicConfig && Object.prototype.toString.call(dynamicConfig) !== '[object Object]') {
    throw new Error('Error: the runApp method second param can only be Object.');
  }

  launched = true;

  const runtime = new RuntimeModule(staticConfig);
  loadRuntimeModules(runtime);

  // const AppProvider = runtime.composeAppProvider();
  // const AppRouter = runtime.getAppRouter();

  // const { routes, rootId = DEFAULE_ROOT_ID } = staticConfig;
  // const { history, driver, env, methods } = options;
  // const { createElement, render } = methods;
  const { env } = options;
  const pageProps = _handleDynamicConfig(dynamicConfig, env);

  return {
    runtime,
    pageProps
  };
};

export default createApp;
