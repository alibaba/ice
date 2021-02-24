export default ({
  // @ts-ignore
  addProvider, // @ts-ignore
  appConfig, // @ts-ignore
  context, // @ts-ignore
  wrapperRouteComponent
}) => {
  const { createElement } = context;
  const { rootStore, storesWithPath } = appConfig.store || {};

  // @ts-ignore
  const AppHooksStoreProvider = ({ children }) => {
    console.log(children);
    return createElement(rootStore.Provider, { children });
  };

  if (rootStore && rootStore.Provider) {
    addProvider(AppHooksStoreProvider);
  }

  wrapperRouteComponent((PageComponent: any) => {
    const ProviderWrapperedComponent = () => {
      //@ts-ignore
      let pageStore;

      for (let i = 0; i <= storesWithPath.length - 1; i++) {
        console.log(document.location.hash.split("#")[1]);
        console.log(storesWithPath[i].path);
        if (document.location.hash.split("#")[1] === storesWithPath[i].path) {
          console.log("asdfasd");
          pageStore = storesWithPath[i].store;
          break;
        }
      }

      return pageStore && pageStore.Provider
        ? createElement(pageStore.Provider, null, createElement(PageComponent))
        : createElement(PageComponent);
    };
    return ProviderWrapperedComponent;
  });
};
