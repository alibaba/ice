import React from 'react';
import type { RouteItem, RouteModules, RouteWrapperConfig, RenderMode, DataLoaderConfig } from './types.js';
import RouteWrapper from './RouteWrapper.js';
import { useAppContext } from './AppContext.js';
import { callDataLoader } from './dataLoader.js';
import type { RequestContext, ComponentModule } from './types.js';
import { updateRoutesConfig } from './routesConfig.js';

type RouteModule = Pick<RouteItem, 'id' | 'load' | 'lazy'>;

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
  const { id, load, lazy } = route;
  if (
    typeof window !== 'undefined' && // Don't use module cache and should load again in ssr. Ref: https://github.com/ice-lab/ice-next/issues/82
    id in routeModulesCache
  ) {
    return routeModulesCache[id];
  }

  try {
    // Function load will return route module when lazy loaded is disabled.
    const routeModule = lazy ? await lazy() : await load();
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
export function wrapRouteComponent(options: {
  routeId: string;
  isLayout?: boolean;
  RouteComponent: React.ComponentType;
}) {
  const { routeId, isLayout, RouteComponent } = options;
  const { RouteWrappers } = useAppContext();
  return (
    <RouteWrapper id={routeId} isLayout={isLayout} wrappers={RouteWrappers}>
      <RouteComponent />
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

/**
 * Create loader function for route module.
 */
interface LoaderData {
  data: any;
  pageConfig: any;
}

export interface RouteLoaderOptions {
  routeId: string;
  requestContext: RequestContext;
  module: ComponentModule;
  renderMode: RenderMode;
}

export function createRouteLoader(options: RouteLoaderOptions): () => Promise<LoaderData> {
  return async () => {
    const { dataLoader, pageConfig, staticDataLoader, serverDataLoader } = options.module;
    const { requestContext, renderMode, routeId } = options;
    const hasGlobalLoader = typeof window !== 'undefined' && (window as any).__ICE_DATA_LOADER__;
    const globalLoader = hasGlobalLoader ? (window as any).__ICE_DATA_LOADER__ : null;
    let routeData: any;
    if (globalLoader) {
      routeData = await globalLoader.getData(routeId, { renderMode });
    } else {
      let loader: DataLoaderConfig;
      if (renderMode === 'SSG') {
        loader = staticDataLoader;
      } else if (renderMode === 'SSR') {
        loader = serverDataLoader || dataLoader;
      } else {
        loader = dataLoader;
      }
      routeData = dataLoader && await callDataLoader(loader, requestContext);
    }
    const routeConfig = pageConfig ? pageConfig({ data: routeData }) : {};
    const loaderData = { data: routeData, pageConfig: routeConfig };
    console.log('routeid-->', loaderData);
    // CSR and load next route data.
    if (typeof window !== 'undefined') {
      await updateRoutesConfig(loaderData);
    }
    return loaderData;
  };
}
