import * as React from 'react';
import defaultRoutes from '$ice/routes';
import { Router } from './runtime/Router';
import formatRoutes, { wrapperPage, wrapperPageWithSSR } from './runtime/formatRoutes';

const module = ({ setRenderRouter, appConfig, modifyRoutes, wrapperRouteComponent, buildConfig, context }) => {
  const { router = {} } = appConfig;
  // plugin-router 内置确保了 defaultRoutes 最先被添加
  modifyRoutes(() => {
    return formatRoutes(router.routes || defaultRoutes, '');
  });
  const wrapperPageFn = process.env.__IS_SERVER__ ? wrapperPageWithSSR(context, defaultRoutes) : wrapperPage;
  wrapperRouteComponent(wrapperPageFn)
  if (router.modifyRoutes) {
    modifyRoutes(router.modifyRoutes);
  }

  const { router: buildConfigRouter } = buildConfig
  const renderRouter = (routes) => () => {
    const routerProps = {
      ...router,
      routes,
      lazy: buildConfigRouter && buildConfigRouter.lazy,
    };
    return <Router {...routerProps} />;
  }
  setRenderRouter(renderRouter);
}

export default module;
