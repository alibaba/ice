import AppStore from '$store';

export default ({ addProvider, context: { createElement } }) => {

  const StoreProvider = ({ children }) => {

    return createElement(AppStore.Provider, { children });
  };
  if (AppStore && AppStore.Provider) {
    addProvider(StoreProvider);
  }
};
