import * as React from 'react';
import AppStore from '$ice/store';

export default ({ addProvider, appConfig, context }) => {

  const StoreProvider = ({children}) => {
    const storeConfig = appConfig.store || {};
    const initialStates = storeConfig.getInitialStates
      ? storeConfig.getInitialStates(context && context.initialData)
      : storeConfig.initialStates || {};

    return (
      <AppStore.Provider initialStates={initialStates}>
        {children}
      </AppStore.Provider>
    );
  };

  if (AppStore) {
    addProvider(StoreProvider);
  }
};
