import React, { useMemo } from 'react';
import type { Action, Location } from 'history';
import type { Navigator } from 'react-router-dom';
import AppErrorBoundary from './AppErrorBoundary.js';
import { AppContextProvider } from './AppContext.js';
import { createRouteElements } from './routes.js';
import type { AppContext, PageWrapper, AppRouterProps } from './types';

interface Props {
  action: Action;
  location: Location;
  navigator: Navigator;
  static?: boolean;
  appContext: AppContext;
  AppProvider: React.ComponentType<any>;
  PageWrappers: PageWrapper<{}>[];
  AppRouter: React.ComponentType<AppRouterProps>;
}

export default function App(props: Props) {
  const {
    location, action, navigator, static: staticProp = false,
    appContext, AppProvider, AppRouter, PageWrappers,
  } = props;
  const { appConfig, routes: originRoutes } = appContext;
  const { strict } = appConfig.app;
  const StrictMode = strict ? React.StrictMode : React.Fragment;

  if (!originRoutes || originRoutes.length === 0) {
    throw new Error('Please add routes(like pages/index.tsx) to your app.');
  }

  const routes = useMemo(
    () => createRouteElements(originRoutes, PageWrappers),
    // `originRoutes` and `PageWrappers` will not be changed
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  let element: React.ReactNode;
  if (routes.length === 1 && !routes[0].children) {
    // TODO: 去除 react-router-dom history 等依赖
    element = routes[0].element;
  } else {
    element = (
      <AppRouter
        action={action}
        location={location}
        navigator={navigator}
        static={staticProp}
        routes={routes}
      />
    );
  }
  return (
    <StrictMode>
      <AppErrorBoundary>
        <AppContextProvider
          value={appContext}
        >
          <AppProvider>
            {element}
          </AppProvider>
        </AppContextProvider>
      </AppErrorBoundary>
    </StrictMode>
  );
}
