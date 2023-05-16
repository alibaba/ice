import type { AppExport, AppData, RequestContext } from './types.js';
import { callDataLoader } from './dataLoader.js';

/**
 * Call the getData of app config.
 */
async function getAppData(appExport: AppExport, requestContext?: RequestContext): Promise<AppData> {
  const hasGlobalLoader = typeof window !== 'undefined' && (window as any).__ICE_DATA_LOADER__;
  const globalLoader = hasGlobalLoader ? (window as any).__ICE_DATA_LOADER__ : null;

  if (globalLoader) {
    return await globalLoader.getData('__app');
  }

  const appDataLoaderConfig = appExport?.dataLoader;

  if (!appDataLoaderConfig) {
    return null;
  }

  let loader;

  if (typeof appDataLoaderConfig === 'function' || Array.isArray(appDataLoaderConfig)) {
    loader = appDataLoaderConfig;
  } else {
    loader = appDataLoaderConfig.loader;
  }

  return await callDataLoader(loader, requestContext);
}

export {
  getAppData,
};
