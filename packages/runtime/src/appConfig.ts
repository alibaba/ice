import type { AppConfig, AppEntry } from './types';

const defaultAppConfig: AppConfig = {
  app: {
    strict: true,
    rootId: 'ice-container',
  },
  router: {
    type: 'browser',
  },
};

export default function getAppConfig(appEntry: AppEntry): AppConfig {
  const appConfig = appEntry?.default || {};

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
