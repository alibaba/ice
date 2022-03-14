import * as React from 'react';
import type {
  RouteObject } from 'react-router-dom';
import {
  HashRouter,
  BrowserRouter,
  useRoutes,
} from 'react-router-dom';
import { useAppContext } from './AppContext.js';
import RouteWrapper from './RouteWrapper.js';
import type { PageWrapper, RouteItem } from './types';

interface AppRouterProps {
  PageWrappers?: PageWrapper<any>[];
  Router?: React.ComponentType;
  routerProps?: object;
}

const AppRouter: React.ComponentType<AppRouterProps> = (props) => {
  const { PageWrappers, Router, routerProps = {} } = props;
  const appContext = useAppContext();
  const { routes } = appContext;

  console.log('renderAppRouter', props);

  if (!routes || routes.length === 0) {
    throw new Error('Please add routes(like pages/index.tsx) to your app.');
  }

  if (routes.length === 1 && !routes[0].children) {
    const Page = routes[0].component;
    return <Page />;
  }

  const Router = appConfig.router.type === 'hash' ? HashRouter : BrowserRouter;
  return (
    <Router {...routerProps}>
      <App routes={routes} PageWrappers={PageWrappers} />
    </Router>
  );
};

export default AppRouter;

interface AppProps extends AppRouterProps {
  routes: RouteItem[];
}

function App({ routes, PageWrappers }: AppProps) {
  const newRoutes = updateRouteElement(routes, PageWrappers);
  const element = useRoutes(newRoutes);
  return element;
}

function updateRouteElement(routes: RouteItem[], PageWrappers?: PageWrapper<any>[]) {
  return routes.map(({ path, component: PageComponent, children, index }: RouteItem) => {
    const element = (
      <React.Suspense fallback={<>loading chunk....</>}>
        <RouteWrapper PageComponent={PageComponent} PageWrappers={PageWrappers} />
      </React.Suspense>
    );
    const route: RouteObject = {
      path,
      element: element,
      index,
    };
    if (children) {
      route.children = updateRouteElement(children, PageWrappers);
    }
    return route;
  });
}