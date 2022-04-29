import type { AppConfig, AppData, AppEntry } from './types';

const defaultAppConfig: AppConfig = {
  app: {
    strict: true,
  },
  router: {
    type: 'browser',
  },
};

export default function getAppConfig(appEntry: AppEntry, appData: AppData): AppConfig {
  const appConfig = appEntry.getAppConfig(appData);

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
