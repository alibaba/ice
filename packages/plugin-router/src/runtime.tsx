import * as React from 'react';
// @ts-ignore
import defaultRoutes from '$ice/routes';
import { IceRouter, Routes, parseRoutes } from './runtime/Router';
import formatRoutes from './runtime/formatRoutes';
import { RouteItemProps } from './types/base';
import { IRouterConfig } from './types';

const module = ({ setRenderApp, appConfig, modifyRoutes, modifyRoutesComponent, buildConfig, context, applyRuntimeAPI }) => {
  const { router: appConfigRouter = {} } = appConfig;

  modifyRoutes(() => {
    return formatRoutes(appConfigRouter.routes || defaultRoutes, '');
  });

  // add default RoutesComponent
  modifyRoutesComponent(() => Routes);

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
      routerProps.history = applyRuntimeAPI('createHistory', {
        type: appConfigRouter.type,
        basename: appConfigRouter.basename,
        initialIndex: appConfigRouter.initialIndex,
        initialEntries: appConfigRouter.initialEntries
      });
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
