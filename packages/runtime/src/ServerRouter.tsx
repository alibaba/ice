import React from 'react';
import { StaticRouterProvider, createStaticRouter } from 'react-router-dom/server.mjs';
import type { RouteObject } from 'react-router-dom';
import { RouteComponent } from './routes.js';
import { useOnce } from './utils/useHooks.js';
import type { AppRouterProps } from './types.js';
import App from './App.js';

let router: ReturnType<typeof createStaticRouter> = null;

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

function ServerRouter(props: AppRouterProps) {
  const { routerContext, routes } = props;
  const router = useOnce(() => {
    return createStaticRouter(createServerRoutes(routes), routerContext);
  });

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
