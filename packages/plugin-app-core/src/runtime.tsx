const module = ({ addProvider, appConfig, wrapperRouteComponent, applyRuntimeAPI, context: { createElement } }) => {
  const { app = {} } = appConfig;
  const { parseSearchParams = true } = app;
  const wrapperPageComponent = (PageComponent) => {
    const WrapperedPageComponent = (props) => {
      const searchParams = parseSearchParams && applyRuntimeAPI('getSearchParams');
      return createElement(PageComponent, {...Object.assign({}, props, { searchParams })});
    };
    return WrapperedPageComponent;
  };

  wrapperRouteComponent(wrapperPageComponent);

  if (appConfig.app && appConfig.app.addProvider) {
    addProvider(appConfig.app.addProvider);
  }
};

export default module;
