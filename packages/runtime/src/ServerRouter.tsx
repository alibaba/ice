import React from 'react';
import { StaticRouterProvider } from 'react-router-dom/server.mjs';
import type { AppRouterProps } from './types.js';
import App from './App.js';


function ServerRouter(props: AppRouterProps) {
  const { router, routerContext } = props;

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
