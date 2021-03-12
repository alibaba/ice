import AppStore from '$store';

export default ({ addProvider, appConfig, context: { initialData = {} as any, createElement } }) => {

  const StoreProvider = ({ children }) => {
    const storeConfig = appConfig.hooksStore || {};

    let initialStates = {};

    if (initialData.initialStates) {
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
