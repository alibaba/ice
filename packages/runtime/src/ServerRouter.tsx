import React from 'react';
import { StaticRouterProvider, createStaticRouter } from 'react-router-dom/server.mjs';
import type { RouteObject } from 'react-router-dom';
import { RouteComponent } from './routes.js';
import type { ServerAppRouterProps } from './types.js';
import App from './App.js';

function createServerRoutes(routes: RouteObject[]) {
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

function ServerRouter(props: ServerAppRouterProps) {
  const { routerContext, routes } = props;
  // Server router only be called once.
  const router = createStaticRouter(createServerRoutes(routes), routerContext);
  console.log('ServerRouter', 'router', router, routerContext);
  return (
    <App>
      <StaticRouterProvider
        router={router}
        context={routerContext}
        hydrate={false} // Don't set hydrate, hydation data has been injected by __window.__ICE_APP_CONTEXT__.
      />
    </App>
  );
}

export default ServerRouter;
