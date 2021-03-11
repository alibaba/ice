import AppHooksStore from '$hooksStore';

export default ({ addProvider, appConfig, context: { initialData = {} as any, createElement } }) => {

  const AppHooksStoreProvider = ({ children }) => {
    const hooksStoreConfig = appConfig.hooksStore || {};

    let hooksStoreInitialStates = {};

    if (initialData.initialStates) {
      hooksStoreInitialStates = initialData.initialStates;
    } else if (hooksStoreConfig.hooksStoreInitialStates) {
      hooksStoreInitialStates = hooksStoreConfig.hooksStoreInitialStates;
    }

    return createElement(AppHooksStore.Provider, {
      hooksStoreInitialStates,
      children
    });
  };
  if (AppHooksStore && AppHooksStore.Provider) {
    addProvider(AppHooksStoreProvider);
  }
};
