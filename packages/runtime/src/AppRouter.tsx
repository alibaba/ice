import * as React from 'react';
import type { RouteObject } from 'react-router-dom';
import { Router, useRoutes } from 'react-router-dom';
import type { AppRouterProps, AppRouteProps } from './types.js';

const AppRouter: React.ComponentType<AppRouterProps> = (props) => {
  const { action, location, navigator, static: staticProps, routes } = props;
  return (
    <Router
      navigationType={action}
      location={location}
      navigator={navigator}
      static={staticProps}
    >
      <AppRoutes routes={routes} />
    </Router>
  );
};

export const AppRoutes: React.ComponentType<AppRouteProps> = ({ routes }) => {
  return (
    <Routes routes={routes} />
  );
};

interface RoutesProps {
  routes: RouteObject[];
}

function Routes({ routes }: RoutesProps) {
  const element = useRoutes(routes);
  return element;
}

export default AppRouter;