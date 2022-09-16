/**
 * Notice: Don't write any top level expressions in this file because it may cause esm loaded cache.
 */
import type { Location } from 'history';
import type { RouteObject } from 'react-router-dom';
import { matchRoutes as originMatchRoutes } from 'react-router-dom';
import type { RouteItem, RouteMatch } from '@ice/types';
import { matchRoutes as matchRoutesSingle } from './single-router.js';

export default function matchRoutes(
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
