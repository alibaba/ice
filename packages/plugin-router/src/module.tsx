import * as React from 'react';
import defaultRoutes from '$ice/routes';
import { Router } from './runtime/Router';
import formatRoutes, { wrapperPage } from './runtime/formatRoutes';

const module = ({ setRenderRouter, appConfig, modifyRoutes, wrapperRouteComponent }) => {
  const { router = {} } = appConfig;
  // plugin-router 内置确保了 defaultRoutes 最先被添加
  modifyRoutes(() => {
    return formatRoutes(defaultRoutes, '');
  });
  wrapperRouteComponent(wrapperPage);
  if (router.modifyRoutes) {
    modifyRoutes(router.modifyRoutes);
  }
  const renderRouter = (routes) => () => {
    const { type, basename } = router;
    const routerProps = {
      type,
      basename,
      routes,
    };
    return <Router {...routerProps} />;
  }
  setRenderRouter(renderRouter);
}

export default module;
