import * as React from 'react';
// @ts-ignore
import { ErrorBoundary } from '$ice/ErrorBoundary';
import defaultRoutes from '$ice/routes';
import { IceRouter } from './runtime/Router';
import formatRoutes, { wrapperPageWithCSR, wrapperPageWithSSR } from './runtime/formatRoutes';

const module = ({ setRenderRouter, appConfig, modifyRoutes, wrapperRouteComponent, buildConfig, context }) => {
  const { router: appConfigRouter = {}, app = {} } = appConfig;
  const { ErrorBoundaryFallback, onErrorBoundaryHander } = app;

  // plugin-router 内置确保了 defaultRoutes 最先被添加
  modifyRoutes(() => {
    return formatRoutes(appConfigRouter.routes || defaultRoutes, '');
  });

  const wrapperPageErrorBoundary = (PageComponent) => {
    const { pageConfig = {} } = PageComponent;
    const WrapperedPageErrorBoundary = (props) => {
      if (pageConfig.errorBoundary) {
        return (
          <ErrorBoundary Fallback={ErrorBoundaryFallback} onError={onErrorBoundaryHander}>
            <PageComponent {...props} />
          </ErrorBoundary>
        );
      }
      return <PageComponent {...props} />;
    };
    return WrapperedPageErrorBoundary;
  };

  const wrapperPageFn = process.env.__IS_SERVER__ ? wrapperPageWithSSR(context, defaultRoutes) : wrapperPageWithCSR();
  wrapperRouteComponent(wrapperPageFn);
  wrapperRouteComponent(wrapperPageErrorBoundary);
  if (appConfigRouter.modifyRoutes) {
    modifyRoutes(appConfigRouter.modifyRoutes);
  }

  const lazy = buildConfig && buildConfig.router && buildConfig.router.lazy;
  const renderRouter = (routes) => () => {
    let routerProps = {
      ...appConfigRouter,
      routes,
      lazy
    };

    if (process.env.__IS_SERVER__) {
      const { pathname, staticContext = {}, searchParams } = context;
      routerProps = Object.assign({}, routerProps, { location: pathname, context: staticContext, searchParams });
    }

    return <IceRouter {...routerProps} />;
  };
  setRenderRouter(renderRouter);
};

export default module;
