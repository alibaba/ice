import * as React from 'react';
import type { RuntimePlugin, AppProvider, RouteWrapper } from '@ice/runtime';
import { PAGE_STORE_INITIAL_STATES, PAGE_STORE_PROVIDER } from './constants.js';
import type { StoreConfig } from './types.js';

const EXPORT_CONFIG_NAME = 'storeConfig';

const runtime: RuntimePlugin = async ({ appContext, addWrapper, addProvider }, runtimeOptions) => {
  const { appExport, appData } = appContext;
  const exported = appExport[EXPORT_CONFIG_NAME];
  const storeConfig: StoreConfig = (typeof exported === 'function' ? await exported(appData) : exported) || {};
  const { initialStates } = storeConfig;

  // Add app store <Provider />.
  const StoreProvider: AppProvider = ({ children }) => {
    if (runtimeOptions?.appStore?.Provider) {
      const { Provider } = runtimeOptions.appStore;
      return (
        <Provider initialStates={initialStates}>
          {children}
        </Provider>
      );
    }
    return <>{children}</>;
  };

  addProvider(StoreProvider);

  // Add page store <Provider />.
  const StoreProviderWrapper: RouteWrapper = ({ routeExports, children }) => {
    if (routeExports?.[PAGE_STORE_PROVIDER]) {
      const Provider = routeExports[PAGE_STORE_PROVIDER];
      const initialStates = routeExports[PAGE_STORE_INITIAL_STATES];
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

export { createModel, createStore } from '@ice/store';
