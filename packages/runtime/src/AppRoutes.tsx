import * as React from 'react';
import type { RouteObject } from 'react-router-dom';
import { useRoutes } from 'react-router-dom';
import { useAppContext } from './AppContext.js';
import RouteWrapper from './RouteWrapper.js';
import type { PageWrapper, RouteItem } from './types';

interface AppRoutersProps {
  PageWrappers?: PageWrapper<any>[];
}

const AppRouters: React.ComponentType<AppRoutersProps> = (props) => {
  const { PageWrappers } = props;
  const appContext = useAppContext();
  const { routes } = appContext;

  const newRoutes = updateRouteElement(routes, PageWrappers);
  return (
    <Routes routes={newRoutes} />
  );
};

export default AppRouters;

interface RoutesProps extends AppRoutersProps {
  routes: RouteObject[];
}

function Routes({ routes }: RoutesProps) {
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
      element,
      index,
    };

    if (children) {
      route.children = updateRouteElement(children, PageWrappers);
    }

    return route;
  });
}
