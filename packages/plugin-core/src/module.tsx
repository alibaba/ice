// @ts-ignore
import { ErrorBoundary } from 'renderer-react';

const module = ({ addProvider, appConfig, wrapperRouteComponent, context }) => {
  const { app = {} } = appConfig;
  const { ErrorBoundaryFallback, onErrorBoundaryHander } = app;
  const { createElement } = context;

  const wrapperComponent = (PageComponent) => {
    const { pageConfig = {} } = PageComponent;
    const ErrorBoundaryWrapperedComponent = (props) => {
      if (pageConfig.errorBoundary) {
        return createElement(
          ErrorBoundary,
          {
            Fallback: ErrorBoundaryFallback,
            onError: onErrorBoundaryHander
          },
          createElement(
            PageComponent,
            {...props}
          )
        );
      }
      return createElement(PageComponent, {...props});
    };
    return ErrorBoundaryWrapperedComponent;
  };

  wrapperRouteComponent(wrapperComponent);
  if (appConfig.app && appConfig.app.addProvider) {
    addProvider(appConfig.app.addProvider);
  }
};

export default module;
