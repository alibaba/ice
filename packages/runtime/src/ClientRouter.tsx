import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { createRouter } from '@remix-run/router';
import type { AppRouterProps } from './types.js';
import App from './App.js';
import { Router } from './single-router.js';

function ClientRouter(props: AppRouterProps) {
  const { routes, history, loaderData } = props;
  let element: React.ReactNode;
  if (process.env.ICE_CORE_ROUTER === 'true') {
    const routerOptions = {
      routes,
      history,
      hydrationData: loaderData ? { loaderData } : undefined,
    };
    const router = createRouter(routerOptions).initialize();
    element = <RouterProvider router={router} />;
  } else {
    element = <Router routes={routes} />;
  }

  return (
    <App>
      {element}
    </App>
  );
}

export default ClientRouter;
