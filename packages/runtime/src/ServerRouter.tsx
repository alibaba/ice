import React from 'react';
import { createStaticRouter, StaticRouterProvider } from 'react-router-dom/server.mjs';
import type { AppRouterProps } from './types.js';
import { RouteItem } from './types.js';
import { useAppContext } from './AppContext.js';
import App from './App.js';
import { RouteComponent } from './routes.js';


function createServerRoutes(routes: AppRouterProps['routes']) {
  return routes.map((route) => {
    let dataRoute = {
      // Static Router need element or Component when matched.
      element: <RouteComponent id={route.id} />,
      id: route.id,
      index: route.index,
      path: route.path,
      children: null,
    };

    if (route?.children?.length > 0) {
      let children = createServerRoutes(
        route.children,
      );
      dataRoute.children = children;
    }
    return dataRoute;
  });
}

function ServerRouter(props: AppRouterProps) {
  const { routes, loaderData, location } = props;
  const { matches, basename } = useAppContext();

  const routerContext = {
    matches, basename, loaderData, location,
  };

  const router = createStaticRouter(createServerRoutes(routes), routerContext);

  return (
    <App>
      <StaticRouterProvider
        router={router}
        context={routerContext}
      />
    </App>
  );
}

export default ServerRouter;
