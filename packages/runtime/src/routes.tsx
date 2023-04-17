import React, { Suspense } from 'react';
import { useRouteError, defer, Await as ReactRouterAwait } from 'react-router-dom';
// eslint-disable-next-line camelcase
import type { UNSAFE_DeferredData } from '@remix-run/router';
import type { RouteItem, RouteModules, RenderMode, RequestContext, ComponentModule, DataLoaderConfig } from './types.js';
import RouteWrapper from './RouteWrapper.js';
import { useAppContext } from './AppContext.js';
import { callDataLoader } from './dataLoader.js';
import { updateRoutesConfig } from './routesConfig.js';

type RouteModule = Pick<RouteItem, 'id' | 'lazy'>;

export function getRoutesPath(routes: RouteItem[], parentPath = ''): string[] {
  let paths = [];

  routes.forEach((route) => {
    const pathId = `${parentPath}/${route.path || ''}`;
    if (route.children) {
      paths.push(...getRoutesPath(route.children, pathId));
    } else {
      paths.push(pathId);
    }
  });
  return paths.map(str => str.replace('//', '/'));
}

export async function loadRouteModule(route: RouteModule, routeModulesCache = {}) {
  const { id, lazy } = route;
  if (
    typeof window !== 'undefined' && // Don't use module cache and should load again in ssr. Ref: https://github.com/ice-lab/ice-next/issues/82
    id in routeModulesCache
  ) {
    return routeModulesCache[id];
  }

  try {
    const routeModule = await lazy();
    routeModulesCache[id] = routeModule;
    return routeModule;
  } catch (error) {
    console.error(`Failed to load route module: ${id}.`);
    console.error(error);
  }
}

export async function loadRouteModules(routes: RouteModule[], originRouteModules: RouteModules = {}) {
  const routeModules = { ...originRouteModules };
  for (const route of routes) {
    const routeModule = await loadRouteModule(route, routeModules);
    routeModules[route.id] = routeModule;
  }
  return routeModules;
}

// Wrap route component with runtime wrappers.
export function WrapRouteComponent(options: {
  routeId: string;
  isLayout?: boolean;
  routeExports: ComponentModule;
}) {
  const { routeId, isLayout, routeExports } = options;
  const { RouteWrappers } = useAppContext();
  return (
    <RouteWrapper routeExports={routeExports} id={routeId} isLayout={isLayout} wrappers={RouteWrappers}>
      <routeExports.default />
    </RouteWrapper>
  );
}

export function RouteComponent({ id }: { id: string }) {
  // get current route component from latest routeModules
  const { routeModules } = useAppContext();
  const { Component } = routeModules[id] || {};
  if (process.env.NODE_ENV === 'development') {
    if (!Component) {
      throw new Error(
        `Route "${id}" has no component! Please go add a \`default\` export in the route module file.\n` +
        'If you were trying to navigate or submit to a resource route, use `<a>` instead of `<Link>` or `<Form reloadDocument>`.',
      );
    }
  }
  return <Component />;
}

export function RouteErrorComponent() {
  const error = useRouteError();
  if (error) {
    // Re-throws the error so it can be caught by App Error Boundary.
    throw error;
  }
  return <></>;
}

export function Await(props) {
  return (
    <Suspense fallback={props.fallback}>
      <ReactRouterAwait
        resolve={props.resolve}
        errorElement={props.errorElement}
      >
        {props.children}
      </ReactRouterAwait>
    </Suspense>
  );
}

/**
 * Create loader function for route module.
 */
interface LoaderData {
  data?: any;
  pageConfig?: any;
}

export interface RouteLoaderOptions {
  routeId: string;
  requestContext?: RequestContext;
  module: ComponentModule;
  renderMode: RenderMode;
}

// eslint-disable-next-line camelcase
type LoaderFunction = () => LoaderData | UNSAFE_DeferredData | Promise<LoaderData>;

export function createRouteLoader(options: RouteLoaderOptions): LoaderFunction {
  const { dataLoader, pageConfig, staticDataLoader, serverDataLoader } = options.module;
  const { requestContext, renderMode, routeId } = options;

  let dataLoaderConfig: DataLoaderConfig;
  if (renderMode === 'SSG') {
    dataLoaderConfig = staticDataLoader;
  } else if (renderMode === 'SSR') {
    dataLoaderConfig = serverDataLoader || dataLoader;
  } else {
    dataLoaderConfig = dataLoader;
  }

  if (!dataLoaderConfig) {
    return () => {
      return {
        pageConfig: pageConfig ? pageConfig({}) : {},
      };
    };
  }

  const [loader, loaderOptions] = dataLoaderConfig;

  const getData = () => {
    const hasGlobalLoader = typeof window !== 'undefined' && (window as any).__ICE_DATA_LOADER__;
    const globalLoader = hasGlobalLoader ? (window as any).__ICE_DATA_LOADER__ : null;
    let routeData: any;
    if (globalLoader) {
      routeData = globalLoader.getData(routeId, { renderMode });
    } else {
      routeData = callDataLoader(loader, requestContext);
    }
    return routeData;
  };

  // Async dataLoader.
  if (loaderOptions?.defer) {
    return async () => {
      const promise = getData();

      return defer({
        data: promise,
        // Call pageConfig without data.
        pageConfig: pageConfig ? pageConfig({}) : {},
      });
    };
  }

  // Await dataLoader before render.
  return async () => {
    const result = getData();

    let routeData;
    try {
      if (Array.isArray(result)) {
        routeData = await Promise.all(result);
      } else if (result instanceof Promise) {
        routeData = await result;
      } else {
        routeData = result;
      }
    } catch (error) {
      console.error('DataLoader: getData error.\n', error);

      routeData = {
        message: 'DataLoader: getData error.',
        error,
      };
    }

    const routeConfig = pageConfig ? pageConfig({ data: routeData }) : {};
    const loaderData = {
      data: routeData,
      pageConfig: routeConfig,
    };

    // CSR and load next route data.
    if (typeof window !== 'undefined') {
      await updateRoutesConfig(loaderData);
    }
    return loaderData;
  };
}
