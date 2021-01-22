import RuntimeModule from './runtimeModule';
import { createHistory } from './history';
import { isMiniAppPlatform } from './env';
import collectAppLifeCycle from './collectAppLifeCycle';
import getSearchParams from './getSearchParams';

// eslint-disable-next-line
const deepmerge = require('deepmerge');

const DEFAULE_APP_CONFIG = {
  app: {
    rootId: 'root'
  },
  router: {
    type: 'hash'
  }
};

export default ({ loadRuntimeModules, createElement, initHistory = true }) => {
  const createBaseApp = async (appConfig, buildConfig, context: any = {}) => {

    // Merge default appConfig to user appConfig
    appConfig = deepmerge(DEFAULE_APP_CONFIG, appConfig);

    // Set history
    let history: any = {};
    if (!isMiniAppPlatform && initHistory) {
      const { router } = appConfig;
      const { type, basename, history: customHistory } = router;
      const location = context.initialContext ? context.initialContext.location : null;
      history = createHistory({ type, basename, location, customHistory });
      appConfig.router.history = history;
    }

    if (!context.initialData) {
      context.initialData = await appConfig?.app?.getInitialData({
        pathname: history.location.pathname,
        query: getSearchParams()
      });
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
