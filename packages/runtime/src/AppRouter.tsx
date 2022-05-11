import * as React from 'react';
import type { RouteObject } from 'react-router-dom';
import { Router, useRoutes } from 'react-router-dom';
import { RouterSingle, useRoutesSingle } from './utils/history-single.js';
import type { AppRouterProps } from './types.js';

const AppRouter: React.ComponentType<AppRouterProps> = (props) => {
  const { action, location, navigator, static: staticProps, routes, basename } = props;
  const IceRouter = process.env.ICE_CORE_ROUTER === 'true' ? Router : RouterSingle;

  return (
    <IceRouter
      basename={basename}
      navigationType={action}
      location={location}
      navigator={navigator}
      static={staticProps}
    >
      <Routes routes={routes} />
    </IceRouter>
  );
};

interface RoutesProps {
  routes: RouteObject[];
}

function Routes({ routes }: RoutesProps) {
  const useIceRoutes = process.env.ICE_CORE_ROUTER === 'true' ? useRoutes : useRoutesSingle;
  const element = useIceRoutes(routes);
  return element;
}

export default AppRouter;