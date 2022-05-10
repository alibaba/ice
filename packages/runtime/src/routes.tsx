import React from 'react';
import type { Location } from 'history';
import type { RouteObject } from 'react-router-dom';
import { matchRoutes as originMatchRoutes } from 'react-router-dom';
import { matchRoutesSingle } from './utils/history-single.js';
import RouteWrapper from './RouteWrapper.js';
import type { RouteItem, RouteModules, RouteWrapperConfig, RouteMatch, RequestContext, RoutesConfig, RoutesData } from './types';
import { useAppContext } from './AppContext.js';

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
    console.error('loadRouteModule', error);
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

/**
* get data for the matched routes.
*/
export async function loadRoutesData(
  matches: RouteMatch[],
  requestContext: RequestContext,
  routeModules: RouteModules,
): Promise<RoutesData> {
  const routesData: RoutesData = {};

  const hasGlobalLoader = typeof window !== 'undefined' && (window as any).__ICE_DATA_LOADER__;

  if (hasGlobalLoader) {
    const load = (window as any).__ICE_DATA_LOADER__;

    await Promise.all(
      matches.map(async (match) => {
        const { id } = match.route;
        routesData[id] = await load(id);
      }),
    );

    return routesData;
  }

  await Promise.all(
    matches.map(async (match) => {
      const { id } = match.route;
      const routeModule = routeModules[id];
      const { getData } = routeModule;

      if (getData) {
        routesData[id] = await getData(requestContext);
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
      const { getConfig } = routeModule;
      const data = routesData[id];
      if (getConfig) {
        const value = getConfig({ data });
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

function RouteComponent({ id }: { id: string }) {
  // get current route component from latest routeModules
  const { routeModules } = useAppContext();
  const { default: Component } = routeModules[id];
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

export function matchRoutes(
  routes: RouteItem[],
  location: Partial<Location> | string,
  basename?: string,
): RouteMatch[] {
  const matchRoutesFn = process.env.ICE_CORE_ROUTER === 'true' ? originMatchRoutes : matchRoutesSingle;
  let matches = matchRoutesFn(routes as unknown as RouteObject[], location, basename);
  if (!matches) return [];

  return matches.map(({ params, pathname, pathnameBase, route }) => ({
    params,
    pathname,
    route: route as unknown as RouteItem,
    pathnameBase,
  }));
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