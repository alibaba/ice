// @ts-ignore
import AppStore from '$store';

export default ({ addProvider, appConfig, context: { initialData = {} as any, createElement } }) => {

  const StoreProvider = ({ children }) => {
    const storeConfig = appConfig.store || {};

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
  if (AppStore && Object.prototype.hasOwnProperty.call(AppStore, 'Provider')) {
    addProvider(StoreProvider);
  }
};
