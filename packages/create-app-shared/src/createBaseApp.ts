import { History } from 'history';
import RuntimeModule from './runtimeModule';
import { createHistory, getHistory } from './history';
import { isMiniAppPlatform } from './env';
import collectAppLifeCycle from './collectAppLifeCycle';

const DEFAULE_APP_CONFIG = {
  app: {
    rootId: 'root'
  },
  router: {
    type: 'hash'
  }
};

function mergeDefaultConfig(defaultConfig, config) {
  Object.keys(defaultConfig).forEach(key => {
    if (typeof config[key] === 'object' && config[key] !== null) {
      config[key] = mergeDefaultConfig(defaultConfig[key], config[key]);
    } else if (!Object.prototype.hasOwnProperty.call(config, key)) {
      config[key] = defaultConfig[key];
    }
  });
  return config;
}

export default ({ loadRuntimeModules, createElement, initHistory = true }) => {
  const createBaseApp = (appConfig, buildConfig, context: any = {}) => {

    // Merge default appConfig to user appConfig
    appConfig = mergeDefaultConfig(DEFAULE_APP_CONFIG, appConfig);

    // Set history
    let history: History;
    if (!isMiniAppPlatform && initHistory) {
      if (!getHistory()) {
        const { router } = appConfig;
        const { type, basename, history: customHistory } = router;
        const location = context.initialContext ? context.initialContext.location : null;
        createHistory({ type, basename, location, customHistory });
      }

      history = getHistory();
      appConfig.router.history = getHistory();
    }

    context.createElement = createElement;

    // Load runtime modules
    const runtime = new RuntimeModule(appConfig, buildConfig, context);
    loadRuntimeModules(runtime);

    // Collect app lifeCyle
    collectAppLifeCycle(appConfig);
    return {
      history,
      runtime,
      appConfig
    };
  };

  return createBaseApp;
};
