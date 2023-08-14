'use client';
import { RouteErrorComponent, WrapRouteComponent, createRouteLoader } from '@ice/runtime';
// import { NestedRouteManifest } from "../../../packages/route-manifest/esm";
import { StaticRouterProvider, createStaticRouter } from 'react-router-dom/server.mjs';
import { path } from 'ice';
// import { App } from '@ice/runtime';
import { createServerRoutes } from '@ice/runtime';
import { useAppContext } from '@ice/runtime';
import React from 'react';
import { AppErrorBoundary } from '@ice/runtime';
import TestClient from './testClient';

async function generateRoutesDefinition(nestRouteManifest, /* : NestedRouteManifest[] */ renderMode) {
  const routeDefinitionObj: any[] = [];
  console.log('generateRoutesDefinition', nestRouteManifest);

  for (const route of nestRouteManifest) {
    const { children, path: routePath, index, componentName, file, id, layout, exports } = route;
    console.log('route', route);
    console.log('id', id);
    console.log('file', file, path.extname(file));
    // const componentPath = id.startsWith('__') ? file : `../../src/pages/${file}`.replace(new RegExp(`${path.extname(file)}$`), '');
    const componentPath = '../../src/pages/layout';
    const componentModule = await import('@/pages/layout');
    console.log('componentModule', componentModule);

    const currentRouteDefinition = {
      path: formatPath(routePath || ''),
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
            // requestContext,
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
  // //  这里的 routes 应该是一个可序列化的对象
  // const { routerContext, routes: routeManifest, requestContext, renderMode } = props;
  // const routes = await generateRoutesDefinition(routeManifest, renderMode);
  // console.log('执行了 client 组件', routerContext, routeManifest);
  // console.log('执行 client')
  // console.log('serverRouter rscRouter', routes);
  // // Server router only be called once.
  // const router = createStaticRouter(createServerRoutes(routes), routerContext);

  return (
    <>
      {/* <App> */}
      {/* <div></div> */}
      {/* <StaticRouterProvider
        router={router}
        context={routerContext}
        hydrate={false} // Don't set hydrate, hydation data has been injected by __window.__ICE_APP_CONTEXT__.
      /> */}
      {/* <div onClick={()=>{alert('sdafasfdaf')}}>faisudhfasd89fg7as9</div> */}
      <TestClient name={() => { alert('asfas'); }} />
      {/* </App> */}
    </>
  );
}

function formatPath(pathStr) {
  return pathStr; //  process.platform === 'win32' ? pathStr.split(path.sep).join('/') :
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