import { AppConfig } from './types';

export const APP_CONFIG = Symbol.for('server-app-config');

export function setAppConfig(appConfig: AppConfig = {}) {
  globalThis[APP_CONFIG] = appConfig;
}

export function getAppConfig() {
  return globalThis[APP_CONFIG];
}
