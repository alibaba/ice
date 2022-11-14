import React from 'react';
import { RouteComponent } from './types.js';
import type { RouteItem, RouteModules, RouteWrapperConfig, RouteMatch, RequestContext, RoutesConfig, RoutesData, RenderMode } from './types.js';
import RouteWrapper from './RouteWrapper.js';
import { useAppContext } from './AppContext.js';
import { callDataLoader } from './dataLoader.js';

type RouteModule = Pick<RouteItem, 'id' | 'load'>;

export async function loadRouteModule(route: RouteModule, routeModulesCache: RouteModules) {
  const { id, load } = route;
  if (
    typeof window !== 'undefined' && // Don't use module cache and should load again in ssr. Ref: https://github.com/ice-lab/ice-next/issues/82
    id in routeModulesCache
  ) {
    return routeModulesCache[id];
  }

  try {
    const routeModule = await load();
    routeModulesCache[id] = routeModule;
    return routeModule;
  } catch (error) {
    console.error(`Failed to load route module: ${id}.`);
    console.debug(error);
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

export interface LoadRoutesDataOptions {
  renderMode?: RenderMode;
}

/**
* get data for the matched routes.
*/
export async function loadRoutesData(
  matches: RouteMatch[],
  requestContext: RequestContext,
  routeModules: RouteModules,
  options?: LoadRoutesDataOptions,
): Promise<RoutesData> {
  const { renderMode } = options || {};
  const routesData: RoutesData = {};

  const hasGlobalLoader = typeof window !== 'undefined' && (window as any).__ICE_DATA_LOADER__;
  const globalLoader = hasGlobalLoader ? (window as any).__ICE_DATA_LOADER__ : null;

  await Promise.all(
    matches.map(async (match) => {
      const { id } = match.route;

      if (globalLoader && globalLoader.hasLoad(id)) {
        routesData[id] = await globalLoader.getData(id);
        return;
      }

      const routeModule = routeModules[id];
      const { dataLoader, serverDataLoader, staticDataLoader } = routeModule ?? {};

      let loader;

      // SSG -> getStaticData
      // SSR -> getServerData || getData
      // CSR -> getData
      if (renderMode === 'SSG') {
        loader = staticDataLoader;
      } else if (renderMode === 'SSR') {
        loader = serverDataLoader || dataLoader;
      } else {
        loader = dataLoader;
      }

      if (loader) {
        routesData[id] = await callDataLoader(loader, requestContext);
      }
    }),
  );

  return routesData;
}

/**
 * Get page config for matched routes.
 */
export function getRoutesConfig(
  matches: RouteMatch[],
  routesData: RoutesData,
  routeModules: RouteModules,
): RoutesConfig {
  const routesConfig: RoutesConfig = {};

  matches.forEach(async (match) => {
    const { id } = match.route;
    const routeModule = routeModules[id];

    if (typeof routeModule === 'object') {
      const { pageConfig } = routeModule;
      const data = routesData[id];
      if (pageConfig) {
        const value = pageConfig({ data });
        routesConfig[id] = value;
      }
    } else {
      routesConfig[id] = {};
    }
  });

  return routesConfig;
}

/**
 * Create elements in routes which will be consumed by react-router-dom
 */
export function createRouteElements(
  routes: RouteItem[],
  RouteWrappers?: RouteWrapperConfig[],
) {
  return routes.map((routeItem: RouteItem) => {
    let { path, children, index, id, layout, element, ...rest } = routeItem;
    element = (
      <RouteWrapper id={id} isLayout={layout} wrappers={RouteWrappers}>
        <RouteComponent id={id} />
      </RouteWrapper>
    );

    const route: RouteItem = {
      path,
      element,
      index,
      id,
      ...rest,
    };

    if (children) {
      route.children = createRouteElements(children, RouteWrappers);
    }

    return route;
  });
}

export function RouteComponent({ id }: { id: string }) {
  // get current route component from latest routeModules
  const { routeModules } = useAppContext();
  const { default: Component } = routeModules[id] || {};
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
 * filter matches is new or path changed.
 */
export function filterMatchesToLoad(prevMatches: RouteMatch[], currentMatches: RouteMatch[]): RouteMatch[] {
  let isNew = (match: RouteMatch, index: number) => {
    // [a] -> [a, b]
    if (!prevMatches[index]) return true;
    // [a, b] -> [a, c]
    return match.route.id !== prevMatches[index].route.id;
  };

  let matchPathChanged = (match: RouteMatch, index: number) => {
    return (
      // param change, /users/123 -> /users/456
      prevMatches[index].pathname !== match.pathname ||
      // splat param changed, which is not present in match.path
      // e.g. /files/images/avatar.jpg -> files/finances.xls
      (prevMatches[index].route.path?.endsWith('*') &&
        prevMatches[index].params['*'] !== match.params['*'])
    );
  };

  return currentMatches.filter((match, index) => {
    return isNew(match, index) || matchPathChanged(match, index);
  });
}
