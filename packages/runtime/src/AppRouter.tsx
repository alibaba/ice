import * as React from 'react';
import type { RouteObject } from 'react-router-dom';
import { useRoutes } from 'react-router-dom';
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

  const newRoutes = updateRouteElement(routes, PageWrappers);

  return (
    <Router {...routerProps}>
      <App routes={newRoutes} />
    </Router>
  );
};

export default AppRouter;

interface AppProps extends AppRouterProps {
  routes: RouteObject[];
}

function App({ routes }: AppProps) {
  const element = useRoutes(routes);
  return element;
}

function updateRouteElement(routes: RouteItem[], PageWrappers?: PageWrapper<any>[]) {
  return routes.map(({ path, component: PageComponent, children, index, load }: RouteItem) => {
    let element;

    if (PageComponent) {
      element = (
        <RouteWrapper PageComponent={PageComponent} PageWrappers={PageWrappers} />
      );
    } else if (load) {
      const LazyComponent = React.lazy(load);

      element = (
        <React.Suspense fallback={<>loading chunk....</>}>
          <RouteWrapper PageComponent={LazyComponent} PageWrappers={PageWrappers} />
        </React.Suspense>
      );
    } else {
      element = 'Page Component is not found.';
    }

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
