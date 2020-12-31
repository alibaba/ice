import * as React from 'react';
// @ts-ignore
import { ErrorBoundary } from '$ice/ErrorBoundary';
import defaultRoutes from '$ice/routes';
import { IceRouter } from './runtime/Router';
import formatRoutes, { wrapperPageWithCSR, wrapperPageWithSSR } from './runtime/formatRoutes';

const module = ({ setRenderRouter, appConfig, modifyRoutes, wrapperRouteComponent, buildConfig, context, createHistory }) => {
  const { router: appConfigRouter = {}, app = {}, renderComponent } = appConfig;
  const { ErrorBoundaryFallback, onErrorBoundaryHander } = app;

  // plugin-router 内置确保了 defaultRoutes 最先被添加
  modifyRoutes(() => {
    return renderComponent ? [{ component: renderComponent }] : formatRoutes(appConfigRouter.routes || defaultRoutes, '');
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

  const wrapperPageFn = process.env.__IS_SERVER__ ? wrapperPageWithSSR(context) : wrapperPageWithCSR();
  wrapperRouteComponent(wrapperPageFn);
  wrapperRouteComponent(wrapperPageErrorBoundary);
  if (appConfigRouter.modifyRoutes) {
    modifyRoutes(appConfigRouter.modifyRoutes);
  }

  let renderRouter = null;
  if (renderComponent) {
    renderRouter = ((routes) => () => {
      const [mainRoute] = routes;
      if (mainRoute) {
        const RenderComponent = mainRoute.component;
        let initalProps = {};
        if (process.env.__IS_SERVER__) {
          initalProps = context.initialContext || {};
        }
        return <RenderComponent {...initalProps} />;
      }
      return null;
    });
  } else {
    const lazy = buildConfig && buildConfig.router && buildConfig.router.lazy;
    renderRouter = (routes) => () => {
      let routerProps = {
        ...appConfigRouter,
        routes,
        lazy
      };
      if (!routerProps.history) {
        routerProps.history = createHistory({ type: appConfigRouter.type, basename: appConfigRouter.basename });
      }
      if (process.env.__IS_SERVER__) {
        const { initialContext = {} } = context;
        routerProps = Object.assign({}, routerProps, { location: initialContext.location, context: initialContext });
      }

      return <IceRouter {...routerProps} />;
    };
  }

  setRenderRouter(renderRouter);
};

export default module;
