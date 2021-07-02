import RuntimeModule from './runtimeModule';
import { DEFAULT_APP_CONFIG } from './constants';
import collectAppLifeCycle from './collectAppLifeCycle';
import type { AppConfig, BuildConfig, Context } from './types';

function mergeDefaultConfig(defaultConfig: AppConfig, config: AppConfig) {
  Object.keys(defaultConfig).forEach(key => {
    if (typeof config[key] === 'object' && config[key] !== null) {
      config[key] = mergeDefaultConfig(defaultConfig[key], config[key]);
    } else if (!Object.prototype.hasOwnProperty.call(config, key)) {
      config[key] = defaultConfig[key];
    }
  });
  return config;
}

export default ({ loadRuntimeModules, createElement, runtimeAPI = {} }) => {
  const createBaseApp = <T = AppConfig, P = BuildConfig, S = Context>(appConfig: T, buildConfig: P, context: S) => {

    // Merge default appConfig to user appConfig
    appConfig = mergeDefaultConfig(DEFAULT_APP_CONFIG, appConfig) as T;
    (context as Context).createElement = createElement;

    // Load runtime modules
    const runtime = new RuntimeModule(appConfig, buildConfig, context);
    Object.keys(runtimeAPI).forEach((apiKey: string) => {
      runtime.registerRuntimeAPI(apiKey, runtimeAPI[apiKey]);
    });
    loadRuntimeModules(runtime);

    // Collect app lifeCyle
    collectAppLifeCycle(appConfig);
    return {
      runtime,
      appConfig
    };
  };

  return createBaseApp;
};
