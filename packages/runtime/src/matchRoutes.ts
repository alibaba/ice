/**
 * Notice: Don't write any top level expressions in this file because it may cause esm loaded cache.
 */
import type { Location } from 'history';
import type { RouteObject } from 'react-router-dom';
import { matchRoutes as originMatchRoutes } from 'react-router-dom';
import type { RouteMatch } from '@ice/runtime-kit';
import type { RouteItem } from './types.js';
import { matchRoutes as matchRoutesSingle } from './singleRouter.js';

export default function matchRoutes(
  routes: unknown[],
  location: Partial<Location> | string,
  basename?: string,
): RouteMatch[] {
  const matchRoutesFn = process.env.ICE_CORE_ROUTER === 'true' ? originMatchRoutes : matchRoutesSingle;
  let matches = matchRoutesFn(routes as RouteObject[], location, basename);
  if (!matches) return [];
  return matches.map(({ params, pathname, pathnameBase, route }) => ({
    params,
    pathname,
    route: route as RouteItem,
    pathnameBase,
  }));
}
