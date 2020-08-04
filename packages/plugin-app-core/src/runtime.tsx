import * as React from 'react';
import * as queryString from 'query-string';
// @ts-ignore
import { ErrorBoundary } from 'ice';

const module = ({ addProvider, appConfig, wrapperRouteComponent }) => {
  const { app = {} } = appConfig;
  const { ErrorBoundaryFallback, onErrorBoundaryHander, parseSearchParams } = app;

  const wrapperPageComponent = (PageComponent) => {
    const { pageConfig = {} } = PageComponent;
    const WrapperedPageComponent = (props) => {
      const searchParams = getSearchParams(parseSearchParams, props.location.search);
      if (pageConfig.errorBoundary) {
        return (
          <ErrorBoundary Fallback={ErrorBoundaryFallback} onError={onErrorBoundaryHander}>
            <PageComponent {... Object.assign({}, props, searchParams)} />
          </ErrorBoundary>
        );
      }
      return <PageComponent {... Object.assign({}, props, searchParams)} />;
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
