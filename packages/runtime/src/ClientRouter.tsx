import React, { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { createRouter } from '@remix-run/router';

import type { AppRouterProps } from './types.js';
import App from './App.js';
import { DataContextProvider } from './single-router.js';

// createRouter only needs to be called once.
let router: ReturnType<typeof createRouter>;

function ClientRouter(props: AppRouterProps) {
  const { Component, loaderData, routerContext } = props;

  useEffect(() => {
    return () => {
      // In case of micro app, ClientRouter will be unmounted,
      // duspose router before mount again.
      router.dispose();
      router = null;
    };
  }, []);

  let element: React.ReactNode;
  if (process.env.ICE_CORE_ROUTER === 'true') {
    if (!router) {
      // Do not call createRouter outside of the component,
      // otherwise it cause error in the use case of micro app.
      router = createRouter(routerContext).initialize();
    }
    element = <RouterProvider router={router} fallbackElement={null} />;
  } else {
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
