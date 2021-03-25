// @ts-ignore
import AppStore from '$store';

export default ({ addProvider, appConfig, context: { initialData = {} as any, createElement } }) => {

  const StoreProvider = ({ children }) => {
    const storeConfig = appConfig.store || {};

    let initialStates = {};

    if (storeConfig.getInitialStates) {
      // @deprecated
      console.warn('Detected that you are using store.getInitialStates, please use app.getInitialData method, Visit https://ice.work/docs/guide/basic/store.');
      initialStates = storeConfig.getInitialStates(initialData);
    } else if (initialData.initialStates) {
      initialStates = initialData.initialStates;
    } else if (storeConfig.initialStates) {
      initialStates = storeConfig.initialStates;
    }

    return createElement(AppStore.Provider, {
      initialStates,
      children
    });
  };
  if (AppStore && AppStore.Provider) {
    addProvider(StoreProvider);
  }
};
