import type { RouteObject } from 'react-router-dom';
import { matchRoutes } from 'react-router-dom';

import type { RouteItem, RouteMatch } from './types';

export default function matchRouteItems(
  routes: RouteItem[],
  pathname: string,
): RouteMatch<RouteItem>[] {
  let matches = matchRoutes(routes as unknown as RouteObject[], pathname);
  if (!matches) return [];

  return matches.map(match => ({
    params: match.params,
    pathname: match.pathname,
    route: match.route as unknown as RouteItem,
  }));
}
