import * as React from 'react';
import defaultRoutes from '$ice/routes';
import { Router } from './runtime/Router';
import formatRoutes, { wrapperPage, wrapperPageWithSSR } from './runtime/formatRoutes';

const module = ({ setRenderRouter, appConfig, modifyRoutes, wrapperRouteComponent, buildConfig, context }) => {
  const { router: appConfigRouter = {} } = appConfig;

  // plugin-router 内置确保了 defaultRoutes 最先被添加
  modifyRoutes(() => {
    return formatRoutes(appConfigRouter.routes || defaultRoutes, '');
  });

  const wrapperPageFn = process.env.__IS_SERVER__ ? wrapperPageWithSSR(context, defaultRoutes) : wrapperPage;
  wrapperRouteComponent(wrapperPageFn);
  if (appConfigRouter.modifyRoutes) {
    modifyRoutes(appConfigRouter.modifyRoutes);
  }

  const lazy = buildConfig.router && buildConfig.router.lazy;
  const renderRouter = (routes) => () => {
    let routerProps = {
      ...appConfigRouter,
      routes,
      lazy
    };

    if (process.env.__IS_SERVER__) {
      const { pathname, staticContext = {} } = context;
      routerProps = Object.assign({}, routerProps, { location: pathname, context: staticContext });
    }

    return <Router {...routerProps} />;
  };
  setRenderRouter(renderRouter);
};

export default module;
