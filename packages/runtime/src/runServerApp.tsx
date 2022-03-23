import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server.js';
import type { Location, To } from 'history';
import { Action, createPath, parsePath } from 'history';
import { createSearchParams, matchRoutes } from 'react-router-dom';
import Runtime from './runtime.js';
import App from './App.js';
import { loadRouteModules } from './routes.js';
import { getCurrentPageData, loadPageData } from './transition.js';
import type { AppContext, AppConfig, RouteItem, ServerContext, InitialContext } from './types';

export default async function runServerApp(
  serverContext: ServerContext,
  appConfig: AppConfig,
  runtimeModules,
  routes: RouteItem[],
  Document,
  documentOnly: boolean,
): Promise<string> {
  const routeModules = await loadRouteModules(routes);
  const { req } = serverContext;
  // ref: https://github.com/remix-run/react-router/blob/main/packages/react-router-dom/server.tsx
  const locationProps = parsePath(req.url);

  const location: Location = {
    pathname: locationProps.pathname || '/',
    search: locationProps.search || '',
    hash: locationProps.hash || '',
    state: null,
    key: 'default',
  };

  const { req } = requestContext;
  const { path } = req;

  const matches = matchRoutes(routes, path);
  const routeData = await getRouteData(requestContext, matches);

  const appContext: AppContext = {
    matches,
    routes,
    routeData,
    appConfig,
    initialData: null,
    assetsManifest,
  };

  if (appConfig?.app?.getInitialData) {
    appContext.initialData = await appConfig.app.getInitialData(initialContext);
  }

  const runtime = new Runtime(appContext);
  runtimeModules.forEach(m => {
    runtime.loadModule(m);
  });

  return serverRender(runtime, requestContext, Document, documentOnly);
}