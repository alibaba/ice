import React from 'react';
import { RouterProvider } from 'react-router-dom';

import type { AppRouterProps } from './types.js';
import App from './App.js';
import { Router } from './single-router.js';

function ClientRouter(props: AppRouterProps) {
  const { router, routes } = props;

  let element: React.ReactNode;
  if (process.env.ICE_CORE_ROUTER === 'true') {
    element = <RouterProvider router={router} fallbackElement={<>loading</>} />;
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
