import React, { useMemo } from 'react';
import type { Action, Location } from 'history';
import type { Navigator } from 'react-router-dom';
import type { RouteWrapperConfig, AppRouterProps } from './types.js';
import AppErrorBoundary from './AppErrorBoundary.js';
import { useAppContext } from './AppContext.js';
import { createRouteElements } from './routes.js';

interface Props {
  action: Action;
  location: Location;
  navigator: Navigator;
  static?: boolean;
  RouteWrappers: RouteWrapperConfig[];
  AppRouter: React.ComponentType<AppRouterProps>;
}

export default function App(props: Props) {
  const {
    location,
    action,
    navigator,
    static: staticProp = false,
    AppRouter,
    RouteWrappers,
  } = props;

  const { appConfig, routes: originRoutes, basename } = useAppContext();
  const { strict, errorBoundary } = appConfig.app;
  const StrictMode = strict ? React.StrictMode : React.Fragment;

  if (!originRoutes || originRoutes.length === 0) {
    throw new Error('Please add routes(like pages/index.tsx) to your app.');
  }

  const routes = useMemo(
    () => createRouteElements(originRoutes, RouteWrappers),
    // `originRoutes` and `RouteWrappers` will not be changed
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const ErrorBoundary = errorBoundary ? AppErrorBoundary : React.Fragment;

  let element: React.ReactNode = (
    <AppRouter
      action={action}
      location={location}
      navigator={navigator}
      static={staticProp}
      routes={routes}
      basename={basename}
    />
  );

  return (
    <StrictMode>
      <ErrorBoundary>
        {element}
      </ErrorBoundary>
    </StrictMode>
  );
}
