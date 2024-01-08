import React, { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { createRouter } from '@remix-run/router';
import type { To, History, Router } from '@remix-run/router';
import type { ClientAppRouterProps } from './types.js';
import App from './App.js';
import { DataContextProvider } from './singleRouter.js';
import { useAppContext } from './AppContext.js';
import { setHistory } from './history.js';
import { disableHistoryWarning } from './utils/deprecatedHistory.js';

function createRouterHistory(history: History, router: Router) {
  const routerHistory = history;
  routerHistory.push = (to: To, state) => {
    router.navigate(to, { replace: false, state });
  };
  routerHistory.replace = (to: To, state) => {
    router.navigate(to, { replace: true, state });
  };
  routerHistory.go = (delta: number) => {
    router.navigate(delta);
  };
  return routerHistory;
}

let router: Router = null;
function ClientRouter(props: ClientAppRouterProps) {
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
    // @ts-expect-error routes type should be AgnosticBaseRouteObject[]
    router = createRouter(routerContext).initialize();
    disableHistoryWarning();
    // Replace history methods by router navigate for backwards compatibility.
    setHistory(createRouterHistory({ ...routerContext.history }, router));
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
