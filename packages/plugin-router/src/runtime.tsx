import * as React from 'react';
// @ts-ignore
import ErrorBoundary from '$ice/ErrorBoundary';
// @ts-ignore
import defaultRoutes from '$ice/routes';
import { IceRouter, Routes, parseRoutes } from './runtime/Router';
import formatRoutes, { wrapperPageWithCSR, wrapperPageWithSSR } from './runtime/formatRoutes';
import { RouteItemProps } from './types/base';
import { IRouterConfig } from './types';

const module = ({ setRenderApp, appConfig, modifyRoutes, wrapperPageComponent, modifyRoutesComponent, buildConfig, context, applyRuntimeAPI }) => {
  const { router: appConfigRouter = {}, app = {} } = appConfig;
  const { ErrorBoundaryFallback, onErrorBoundaryHandler } = app;

  const { parseSearchParams = true } = app;
  const WrappedPageComponent = (PageComponent) => {
    const InnerWrappedPageComponent = (props) => {
      const searchParams = parseSearchParams && applyRuntimeAPI('getSearchParams');
      return <PageComponent {...Object.assign({}, props, { searchParams })} />;
    };
    return InnerWrappedPageComponent;
  };

  wrapperPageComponent(WrappedPageComponent);

  if (!buildConfig.mpa && defaultRoutes && appConfigRouter.routes) {
    // SPA 场景下 router.routes 与 src/routes|文件约定路由冲突
    console.warn('[icejs]', '手动配置了 app.router.routes 字段，src/routes 配置或文件路由将失效。');
  }

  // plugin-router 内置确保了 defaultRoutes 最先被添加
  modifyRoutes(() => {
    return formatRoutes(appConfigRouter.routes || defaultRoutes, '');
  });

  // add default RoutesComponent
  modifyRoutesComponent(() => Routes);

  const wrapperPageErrorBoundary = (PageComponent) => {
    const { pageConfig = {} } = PageComponent;
    const WrappedPageErrorBoundary = (props) => {
      if (pageConfig.errorBoundary) {
        return (
          <ErrorBoundary Fallback={ErrorBoundaryFallback} onError={onErrorBoundaryHandler}>
            <PageComponent {...props} />
          </ErrorBoundary>
        );
      }
      return <PageComponent {...props} />;
    };
    return WrappedPageErrorBoundary;
  };

  const wrapperPageFn = process.env.__IS_SERVER__ ? wrapperPageWithSSR(context) : wrapperPageWithCSR();
  wrapperPageComponent(wrapperPageFn);
  wrapperPageComponent(wrapperPageErrorBoundary);
  if (appConfigRouter.modifyRoutes) {
    modifyRoutes(appConfigRouter.modifyRoutes);
  }

  const lazy = buildConfig && buildConfig.router && buildConfig.router.lazy;
  const renderRouter = (routes: RouteItemProps[], RoutesComponent: React.ComponentType<{ routes: IRouterConfig[]; fallback: React.ComponentType }>, customRouterProps = {}) => () => {
    let routerProps = {
      ...appConfigRouter,
      lazy,
      ...customRouterProps,
    };
    if (!routerProps.history) {
      routerProps.history = applyRuntimeAPI('createHistory', { type: appConfigRouter.type, basename: appConfigRouter.basename });
    }
    if (process.env.__IS_SERVER__) {
      const { initialContext = {} } = context;
      routerProps = Object.assign({}, routerProps, { location: initialContext.location, context: initialContext });
    }
    const { fallback, ...restRouterProps } = routerProps;
    return (
      <IceRouter {...restRouterProps}>
        { RoutesComponent ? <RoutesComponent routes={parseRoutes(routes, fallback)} fallback={fallback} /> : null}
      </IceRouter>
    );
  };

  setRenderApp(renderRouter);
};

export default module;
