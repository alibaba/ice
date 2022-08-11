import * as React from 'react';
import type { AppExport, AppData, RequestContext } from './types.js';

const Context = React.createContext<AppData | undefined>(undefined);

Context.displayName = 'AppDataContext';

function useAppData <T = AppData>(): T {
  const value = React.useContext(Context);
  return value;
}

const AppDataProvider = Context.Provider;

/**
 * Call the getData of app config.
 */
async function getAppData(appExport: AppExport, requestContext: RequestContext): Promise<AppData> {
  const hasGlobalLoader = typeof window !== 'undefined' && (window as any).__ICE_DATA_LOADER__;

  if (hasGlobalLoader) {
    const load = (window as any).__ICE_DATA_LOADER__;
    return await load('__app');
  }

  if (appExport?.getAppData) {
    return await appExport.getAppData(requestContext);
  }
}

export {
  getAppData,
  useAppData,
  AppDataProvider,
};