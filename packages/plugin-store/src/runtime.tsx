import * as React from 'react';
import type { RuntimePlugin, AppProvider, RouteWrapper } from '@ice/types';
import { PAGE_STORE_INITIAL_STATES, PAGE_STORE_PROVIDER } from './constants.js';
import type { StoreConfig } from './types.js';
import appStore from '$store';

const runtime: RuntimePlugin = async ({ appContext, addWrapper, addProvider, useAppContext }) => {
  const { appExport, appData } = appContext;
  const storeConfig: StoreConfig = (typeof appExport.store === 'function'
    ? (await appExport.store(appData)) : appExport.store) || {};
  const { initialStates } = storeConfig;
  if (appStore && Object.prototype.hasOwnProperty.call(appStore, 'Provider')) {
    // Add app store Provider
    const StoreProvider: AppProvider = ({ children }) => {
      return (
        <appStore.Provider initialStates={initialStates}>
          {children}
        </appStore.Provider>
      );
    };
    addProvider(StoreProvider);
  }
  // page store
  const StoreProviderWrapper: RouteWrapper = ({ children, routeId }) => {
    const { routeModules } = useAppContext();
    const routeModule = routeModules[routeId];
    if (routeModule[PAGE_STORE_PROVIDER]) {
      const Provider = routeModule[PAGE_STORE_PROVIDER];
      const initialStates = routeModule[PAGE_STORE_INITIAL_STATES];
      if (initialStates) {
        return <Provider initialStates={initialStates}>{children}</Provider>;
      }
      return <Provider>{children}</Provider>;
    }
    return <>{children}</>;
  };

  addWrapper(StoreProviderWrapper, true);
};

export default runtime;
