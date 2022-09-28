import * as path from 'path';
import type { NestedRouteManifest } from '@ice/route-manifest';
import formatPath from './formatPath.js';

/**
 * get all route path
 * @param routes
 * @returns
 */
function getRoutePaths(routes: NestedRouteManifest[], parentPath = ''): string[] {
  let pathList = [];

  routes.forEach(route => {
    if (route.children) {
      pathList = pathList.concat(getRoutePaths(route.children, route.path));
    } else {
      pathList.push(formatPath(path.join('/', parentPath, route.path || '')));
    }
  });

  return pathList;
}

export function getRoutePathsFromCache(dataCache: Map<string, string>): string[] {
  const routes = dataCache.get('routes');

  const routeManifest = JSON.parse(routes)?.routeManifest || {};
  const routeFiles = Object.keys(routeManifest).map((key) => {
    const { file } = routeManifest[key];
    return `src/pages/${file}`;
  });

  return routeFiles;
}

export default getRoutePaths;
