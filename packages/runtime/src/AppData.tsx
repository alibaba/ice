import * as React from 'react';
import type { AppEntry, AppData, RequestContext } from './types';

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
async function getAppData(appEntry: AppEntry, requestContext: RequestContext): Promise<AppData> {
  const hasGlobalLoader = typeof window !== 'undefined' && (window as any).__ICE_DATA_LOADER__;

  if (hasGlobalLoader) {
    const load = (window as any).__ICE_DATA_LOADER__;
    return await load('__app');
  }

  if (appEntry?.getAppData) {
    return await appEntry.getAppData(requestContext);
  }
}

export {
  getAppData,
  useAppData,
  AppDataProvider,
};