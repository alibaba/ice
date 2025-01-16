import type { AppConfig, AppExport } from './types.js';

const defaultAppConfig: AppConfig = {
  app: {
    strict: false,
    rootId: 'ice-container',
  },
  router: {
    type: 'browser',
  },
} as const;

export default function getAppConfig(appExport: AppExport): AppConfig {
  const { default: appConfig = {} } = appExport || {};
  const { app, router, ...others } = appConfig;

  return {
    app: { ...defaultAppConfig.app, ...app },
    router: { ...defaultAppConfig.router, ...router },
    ...others,
  };
}

export const defineAppConfig = (
  appConfigOrDefineAppConfig: AppConfig | (() => AppConfig),
): AppConfig =>
  (typeof appConfigOrDefineAppConfig === 'function'
    ? appConfigOrDefineAppConfig()
    : appConfigOrDefineAppConfig);
