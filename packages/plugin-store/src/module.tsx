import * as React from 'react';
import AppStore from '$ice/store';

export default ({ addProvider, appConfig, context }) => {

  const StoreProvider = ({children}) => {
    const storeConfig = appConfig.store || {};
    const initialData = context ? context.initialData : {};

    let initialStates = {}

    if (initialData.initialStates) {
      initialStates = initialData.initialStates;
    } else if (storeConfig.getInitialStates) {
      // @deprecated
      console.warn('Detected that you are using store.getInitialStates, please use app.getInitialData method, Visit https://ice.work/docs/guide/basic/store.');
      initialStates = storeConfig.getInitialStates(initialData)
    } else if (storeConfig.initialStates) {
      initialStates = storeConfig.initialStates;
    }

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
