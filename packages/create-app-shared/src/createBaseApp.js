import deepmerge from 'deepmerge';
import { addAppLifeCycle } from './appLifeCycles';
import { SHOW, LAUNCH, ERROR, HIDE, TAB_ITEM_CLICK, NOT_FOUND, SHARE, UNHANDLED_REJECTION } from './constants';
import RuntimeModule from './runtimeModule';
import { createHistory } from './history';

const DEFAULE_APP_CONFIG = {
  app: {
    rootId: 'root'
  },
  router: {
    type: 'hash'
  }
};

function _handleAppLifeCycle(appConfig, env) {
  const { isWeChatMiniProgram, isByteDanceMicroApp, isMiniApp } = env;
  const { onLaunch, onShow, onError, onHide, onTabItemClick } = appConfig;
  // multi-end valid lifecycle
  // Add app lanuch callback
  addAppLifeCycle(LAUNCH, onLaunch);
  // Add app show callback
  addAppLifeCycle(SHOW, onShow);
  // Add app error callback
  addAppLifeCycle(ERROR, onError);
  // Add app hide callback
  addAppLifeCycle(HIDE, onHide);
  // Add tab bar item click callback
  addAppLifeCycle(TAB_ITEM_CLICK, onTabItemClick);
  // Add lifecycle callbacks which only valid in Wechat MiniProgram and ByteDance MicroApp
  if (isWeChatMiniProgram || isByteDanceMicroApp) {
    const { onPageNotFound, onShareAppMessage } = appConfig;
    // Add global share callback
    addAppLifeCycle(SHARE, onShareAppMessage);
    // Add page not found callback
    addAppLifeCycle(NOT_FOUND, onPageNotFound);
  }
  // Add lifecycle callbacks which only valid in Alibaba MiniApp
  if (isMiniApp) {
    const { onShareAppMessage, onUnhandledRejection } = appConfig;
    // Add global share callback
    addAppLifeCycle(SHARE, onShareAppMessage);
    // Add unhandledrejection callback
    addAppLifeCycle(UNHANDLED_REJECTION, onUnhandledRejection);
  }
}

function createBaseApp({ loadRuntimeModules, loadStaticModules, createElement }) {
  return (appConfig, buildConfig, context = {}) => {

    appConfig = deepmerge(DEFAULE_APP_CONFIG, appConfig);

    // load module to run before createApp ready
    loadStaticModules(appConfig);

    const { env } = context;

    // Set history
    let history = {};
    if (!env.isMiniApp) {
      const { router } = appConfig;
      const { type, basename } = router;
      history = createHistory({ type, basename });
      appConfig.router.history = history;
    }

    context.createElement = createElement;

    // Load runtime modules
    const runtime = new RuntimeModule(appConfig, buildConfig, context);
    loadRuntimeModules(runtime);

    // Handle app lifeCyle
    _handleAppLifeCycle(appConfig, env);

    return {
      history,
      runtime,
      appConfig
    };
  };
}

export default createBaseApp;
