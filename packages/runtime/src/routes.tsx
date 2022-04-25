import React from 'react';
import type { Location } from 'history';
import type { RouteObject } from 'react-router-dom';
import { matchRoutes as originMatchRoutes } from 'react-router-dom';
import RouteWrapper from './RouteWrapper.js';
import type { RouteItem, RouteModules, RouteWrapper as IRouteWrapper, RouteMatch, InitialContext, RoutesConfig, RoutesData } from './types';

// global route modules cache
const routeModules: RouteModules = {};

type RouteModule = Pick<RouteItem, 'id' | 'load'>;

export async function loadRouteModule(route: RouteModule) {
  const { id, load } = route;
  if (
    typeof window !== 'undefined' && // Don't use module cache and should load again in ssr. Ref: https://github.com/ice-lab/ice-next/issues/82
    id in routeModules
  ) {
    return routeModules[id];
  }

  try {
    const routeModule = await load();
    routeModules[id] = routeModule;
    return routeModule;
  } catch (error) {
    console.error(error);
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  }
}

export async function loadRouteModules(routes: RouteModule[]) {
  for (const route of routes) {
    await loadRouteModule(route);
  }
  return routeModules;
}

/**
* get data for the matched routes.
*/
export async function loadRoutesData(matches: RouteMatch[], initialContext: InitialContext): Promise<RoutesData> {
  const routesData: RoutesData = {};

  await Promise.all(
    matches.map(async (match) => {
      const { id } = match.route;
      const routeModule = routeModules[id];
      const { getData } = routeModule;

      if (getData) {
        const initialData = await getData(initialContext);
        routesData[id] = initialData;
      }
    }),
  );

  return routesData;
}

/**
 * Get page config for matched routes.
 */
export function getRoutesConfig(matches: RouteMatch[], routesData: RoutesData): RoutesConfig {
  const routesConfig: RoutesConfig = {};

  matches.forEach(async (match) => {
    const { id } = match.route;
    const routeModule = routeModules[id];
    const { getConfig } = routeModule;
    const data = routesData[id];

    if (getConfig) {
      const value = getConfig({ data });
      routesConfig[id] = value;
    }
  });

  return routesConfig;
}

/**
 * Create elements in routes which will be consumed by react-router-dom
 */
export function createRouteElements(routes: RouteItem[], RouteWrappers?: IRouteWrapper[]) {
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

function RouteComponent({ id, ...props }: { id: string }) {
  // get current route component from latest routeModules
  const { default: Component } = routeModules[id];
  if (process.env.NODE_ENV === 'development') {
    if (!Component) {
      throw new Error(
        `Route "${id}" has no component! Please go add a \`default\` export in the route module file.\n` +
          'If you were trying to navigate or submit to a resource route, use `<a>` instead of `<Link>` or `<Form reloadDocument>`.',
      );
    }
  }
  return <Component {...props} />;
}

export function matchRoutes(
  routes: RouteItem[],
  location: Partial<Location> | string,
  basename?: string,
): RouteMatch[] {
  let matches = originMatchRoutes(routes as unknown as RouteObject[], location, basename);
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