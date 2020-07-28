import * as React from 'react';
// @ts-ignore
import { ErrorBoundary } from '$ice/common';

const module = ({ addProvider, appConfig, wrapperRouteComponent }) => {
  const { ErrorBoundaryFallback, onErrorBoundaryHander } = appConfig.app;

  const wrapperComponent = (PageComponent) => {
    const { pageConfig = {} } = PageComponent;
    const StoreWrapperedComponent = (props) => {
      if (pageConfig.errorBoundary) {
        return (
          <ErrorBoundary Fallback={ErrorBoundaryFallback} onError={onErrorBoundaryHander}>
            <PageComponent {...props} />
          </ErrorBoundary>
        );
      }
      return <PageComponent {...props} />;
    };
    return StoreWrapperedComponent;
  };

  wrapperRouteComponent(wrapperComponent);
  if (appConfig.app && appConfig.app.addProvider) {
    addProvider(appConfig.app.addProvider);
  }
};

export default module;
