import * as queryString from 'query-string';

const module = ({ addProvider, appConfig, wrapperRouteComponent, context: { createElement } }) => {
  const { app = {} } = appConfig;
  const { parseSearchParams } = app;

  const wrapperPageComponent = (PageComponent) => {
    const WrapperedPageComponent = (props) => {
      const searchParams = getSearchParams(parseSearchParams, props.location.search);
      return createElement(PageComponent, {... Object.assign({}, props, searchParams)});
    };
    return WrapperedPageComponent;
  };

  wrapperRouteComponent(wrapperPageComponent);

  if (appConfig.app && appConfig.app.addProvider) {
    addProvider(appConfig.app.addProvider);
  }
};

function getSearchParams(parseSearchParams, locationSearch) {
  if (parseSearchParams) {
    const searchParams = queryString.parse(locationSearch);
    return { searchParams };
  }
}

export default module;
