import React, { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { createRouter } from '@remix-run/router';
import { useOnce } from './utils/useHooks.js';
import type { AppRouterProps } from './types.js';
import App from './App.js';
import { DataContextProvider } from './single-router.js';

function ClientRouter(props: AppRouterProps) {
  const { Component, loaderData, routerContext } = props;
  // createRouter only needs to be called once.
  const router = useOnce(() => {
    return process.env.ICE_CORE_ROUTER === 'true' ? createRouter(routerContext).initialize() : {};
  });
  useEffect(() => {
    return () => {
      // In case of micro app, ClientRouter will be unmounted,
      // duspose router before mount again.
      router.dispose();
    };
  }, []);

  let element: React.ReactNode;
  if (process.env.ICE_CORE_ROUTER === 'true') {
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
