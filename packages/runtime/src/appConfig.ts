import type { AppConfig, AppExport } from './types';

const defaultAppConfig: AppConfig = {
  app: {
    strict: true,
    rootId: 'ice-container',
  },
  router: {
    type: 'browser',
  },
};

export default function getAppConfig(appExport: AppExport): AppConfig {
  const appConfig = appExport?.default || {};

  const { app, router, ...others } = appConfig;

  return {
    app: {
      ...defaultAppConfig.app,
      ...(appConfig.app || {}),
    },
    router: {
      ...defaultAppConfig.router,
      ...(appConfig.router || {}),
    },
    ...others,
  };
}

export function defineAppConfig(appConfig: AppConfig) {
  return appConfig;
}