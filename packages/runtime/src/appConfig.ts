import type { AppConfig, AppExport } from '@ice/types';

const defaultAppConfig: AppConfig = {
  app: {
    strict: false,
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
      ...(app || {}),
    },
    router: {
      ...defaultAppConfig.router,
      ...(router || {}),
    },
    ...others,
  };
}

export function defineAppConfig(appConfigOrDefineAppConfig: AppConfig | (() => AppConfig)): AppConfig {
  if (typeof appConfigOrDefineAppConfig === 'function') {
    return appConfigOrDefineAppConfig();
  } else {
    return appConfigOrDefineAppConfig;
  }
}
