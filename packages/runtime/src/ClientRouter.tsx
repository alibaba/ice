import React from 'react';
import { RouterProvider } from 'react-router-dom';

import type { AppRouterProps } from './types.js';
import App from './App.js';
import { DataContextProvider } from './single-router.js';

function ClientRouter(props: AppRouterProps) {
  const { router, routes, Component, loaderData } = props;

  let element: React.ReactNode;
  if (process.env.ICE_CORE_ROUTER === 'true') {
    element = <RouterProvider router={router} fallbackElement={<></>} />;
  } else {
    const routeItem = routes[0];
    element = (
      <DataContextProvider value={loaderData}>
        <Component />
      </DataContextProvider>
    );
  }
  return (
    <App>
      {element}
    </App>
  );
}

export default ClientRouter;
