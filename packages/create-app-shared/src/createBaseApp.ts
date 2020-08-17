import RuntimeModule from './runtimeModule';
import { createHistory } from './history';
import { isMiniAppPlatform } from './env';
import collectAppLifeCycle from './collectAppLifeCycle';

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

export default ({ loadRuntimeModules, createElement }) => {
  const createBaseApp = (appConfig, buildConfig, context: any = {}) => {

    // load module to run before createApp ready
    appConfig = deepmerge(DEFAULE_APP_CONFIG, appConfig);

    // Set history
    let history = {};
    if (!isMiniAppPlatform) {
      const { router } = appConfig;
      const { type, basename } = router;
      history = createHistory({ type, basename });
      appConfig.router.history = history;
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
