import AppStore from '$hooksStore';

export default ({ addProvider, context: { createElement } }) => {

  const StoreProvider = ({ children }) => {

    return createElement(AppStore.Provider, { children });
  };
  if (AppStore && AppStore.Provider) {
    addProvider(StoreProvider);
  }
};
