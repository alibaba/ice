import * as React from 'react';
import {
  HashRouter,
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import type { RenderOptions } from './types';

export default function AppRouter(props: RenderOptions) {
  const { context, appConfig } = props;
  const { routes } = context;

  if (!routes || routes.length === 0) {
    throw new Error('Please add routes(like pages/index.tsx) to your app.');
  } else if (routes.length > 1) {
    // TODO: routes.length > 1 -> process.env.ICE_ROUTER === 'disabled'
    const Router = appConfig.router.type === 'hash' ? HashRouter : BrowserRouter;
    return (
      <Router>
        <Routes>
          {
            routes.map((route, index) => {
              const RouteComponent = route.component;
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <React.Suspense fallback={<>loading chunk....</>}>
                      <RouteComponent />
                    </React.Suspense>
                  }
                />
              );
            })
          }
        </Routes>
      </Router>
    );
  } else {
    // routes.length === 1
    const PageComponent = routes[0].component;
    return (
      <React.Suspense fallback={<>loading chunk....</>}>
        <PageComponent />
      </React.Suspense>
    );
  }
}