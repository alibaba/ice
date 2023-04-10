import React, { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { createRouter } from '@remix-run/router';
import type { AppRouterProps } from './types.js';
import App from './App.js';
import { DataContextProvider } from './single-router.js';
import { useAppContext } from './AppContext.js';

let router: ReturnType<typeof createRouter> = null;
function ClientRouter(props: AppRouterProps) {
  const { Component, loaderData, routerContext } = props;
  const { revalidate } = useAppContext();

  function clearRouter() {
    if (router) {
      router.dispose();
      router = null;
    }
  }
  // API createRouter only needs to be called once, and create before mount.
  if (process.env.ICE_CORE_ROUTER === 'true') {
    // Clear router before re-create in case of hot module replacement.
    clearRouter();
    router = createRouter(routerContext).initialize();
  }
  useEffect(() => {
    if (revalidate) {
      // Revalidate after render for SSG while staticDataLoader and dataLoader both defined.
      router?.revalidate();
    }
    return () => {
      // In case of micro app, ClientRouter will be unmounted,
      // duspose router before mount again.
      clearRouter();
    };
  }, [revalidate]);

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
