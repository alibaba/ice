'use client';
import { RouteErrorComponent, WrapRouteComponent, createRouteLoader } from '@ice/runtime';
import { createStaticRouter } from 'react-router-dom/server.mjs';
import { createServerRoutes } from '@ice/runtime';
import { useAppContext } from '@ice/runtime';
import React from 'react';
import { AppErrorBoundary } from '@ice/runtime';
import TestClient from './components/testClient';

async function generateRoutesDefinition(nestRouteManifest, renderMode) {
  const routeDefinitionObj: any[] = [];
  console.log('generateRoutesDefinition', nestRouteManifest);

  for (const route of nestRouteManifest) {
    const { children, path: routePath, index, componentName, file, id, layout, exports } = route;
    const componentModule = await import('@/pages/layout');
    console.log('componentModule', componentModule);

    const currentRouteDefinition = {
      path: routePath,
      async lazy() {
        return {
          ...componentModule,
          Component: () => WrapRouteComponent({
            routeId: id,
            isLayout: layout,
            routeExports: componentModule,
          }),
          loader: createRouteLoader({
            routeId: id,
            renderMode,
            module: componentModule,
          }),
        };
      },
      errorElement: <RouteErrorComponent />,
      componentName,
      index,
      id,
      exact: true,
      exports: JSON.stringify(exports),
      layout,
    };

    if (children) {
      const res = generateRoutesDefinition(children, renderMode);
      currentRouteDefinition['children'] = res;
    }
    routeDefinitionObj.push(currentRouteDefinition);
    console.log('after push', routeDefinitionObj);
  }

  return routeDefinitionObj;
}

export default async function RscServerRouter(props) {
  //  the routes object here need to be a sierilazable object
  const { routerContext, routes: routeManifest, requestContext, renderMode } = props;
  const routes = await generateRoutesDefinition(routeManifest, renderMode);
  // Server router only be called once.
  const router = createStaticRouter(createServerRoutes(routes), routerContext);

  return (
    <>
      <TestClient name={'RCC props'} />
      <div>Server component: rscServerRouter</div>
    </>
  );
}

function App({ children }) {
  const { appConfig } = useAppContext();
  const { strict, errorBoundary } = appConfig.app;
  const StrictMode = strict ? React.StrictMode : React.Fragment;
  const ErrorBoundary = errorBoundary ? AppErrorBoundary : React.Fragment;

  return (
    <StrictMode>
      <ErrorBoundary>
        {children}
      </ErrorBoundary>
    </StrictMode>
  );
}