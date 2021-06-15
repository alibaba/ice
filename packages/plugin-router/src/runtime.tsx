import * as React from 'react';
// @ts-ignore
import ErrorBoundary from '$ice/ErrorBoundary';
// @ts-ignore
import defaultRoutes from '$ice/routes';
import { IceRouter, Routes, parseRoutes } from './runtime/Router';
import formatRoutes, { wrapperPageWithCSR, wrapperPageWithSSR } from './runtime/formatRoutes';
import { RouteItemProps } from './types/base';
import { IRouterConfig } from './types';

const module = ({ setRenderRouter, appConfig, modifyRoutes, wrapperRouteComponent, modifyRoutesComponent, buildConfig, context, createHistory }) => {
  const { router: appConfigRouter = {}, app = {}, renderComponent } = appConfig;
  const { ErrorBoundaryFallback, onErrorBoundaryHander, onErrorBoundaryHandler } = app;

  // plugin-router 内置确保了 defaultRoutes 最先被添加
  modifyRoutes(() => {
    return renderComponent ? [{ component: renderComponent }] : formatRoutes(appConfigRouter.routes || defaultRoutes, '');
  });

  // add default RoutesComponent
  modifyRoutesComponent(() => Routes);

  const wrapperPageErrorBoundary = (PageComponent) => {
    const { pageConfig = {} } = PageComponent;
    const WrapperedPageErrorBoundary = (props) => {
      if (pageConfig.errorBoundary) {
        return (
          <ErrorBoundary Fallback={ErrorBoundaryFallback} onError={onErrorBoundaryHandler || onErrorBoundaryHander}>
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

  let renderRouter: React.ReactNode | null = null;
  if (renderComponent) {
    renderRouter = ((routes: RouteItemProps[]) => () => {
      const [mainRoute] = routes;
      if (mainRoute) {
        const RenderComponent = mainRoute.component as React.ComponentType;
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
    renderRouter = (routes: RouteItemProps[], RoutesComponent: React.ComponentType<{routes: IRouterConfig[]; fallback: React.ComponentType}>, customRouterProps = {}) => () => {
      let routerProps = {
        ...appConfigRouter,
        lazy,
        ...customRouterProps,
      };
      if (!routerProps.history) {
        routerProps.history = createHistory({ type: appConfigRouter.type, basename: appConfigRouter.basename });
      }
      if (process.env.__IS_SERVER__) {
        const { initialContext = {} } = context;
        routerProps = Object.assign({}, routerProps, { location: initialContext.location, context: initialContext });
      }
      const { fallback, ...restRouterProps } = routerProps;
      return (
        <IceRouter {...restRouterProps}>
          { RoutesComponent ? <RoutesComponent routes={parseRoutes(routes, fallback)} fallback={fallback} /> : null }
        </IceRouter>
      );
    };
  }

  setRenderRouter(renderRouter);
};

export default module;
