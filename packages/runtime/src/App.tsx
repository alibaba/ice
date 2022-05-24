import React, { useMemo } from 'react';
import type { Action, Location } from 'history';
import type { Navigator } from 'react-router-dom';
import AppErrorBoundary from './AppErrorBoundary.js';
import { useAppContext } from './AppContext.js';
import { createRouteElements } from './routes.js';
import type { RouteWrapperConfig, AppRouterProps } from './types';

interface Props {
  action: Action;
  location: Location;
  navigator: Navigator;
  static?: boolean;
  AppProvider: React.ComponentType<any>;
  RouteWrappers: RouteWrapperConfig[];
  AppRouter: React.ComponentType<AppRouterProps>;
}

export default function App(props: Props) {
  const {
    location,
    action,
    navigator,
    static: staticProp = false,
    AppProvider,
    AppRouter,
    RouteWrappers,
  } = props;

  const { appConfig, routes: originRoutes } = useAppContext();
  const { strict } = appConfig.app;
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

  let element: React.ReactNode = (
    <AppRouter
      action={action}
      location={location}
      navigator={navigator}
      static={staticProp}
      routes={routes}
      basename={appConfig?.router?.basename}
    />
  );

  return (
    <StrictMode>
      <AppErrorBoundary>
        <AppProvider>
          {element}
        </AppProvider>
      </AppErrorBoundary>
    </StrictMode>
  );
}
