import * as path from 'path';
import type { NestedRouteManifest } from '@ice/route-manifest';
import formatPath from './formatPath.js';

/**
 * get all route path
 * @param routes
 * @returns
 */
export default function getRoutePaths(routes: NestedRouteManifest[], parentPath = ''): string[] {
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

export function getRoutesFile(routes: NestedRouteManifest[]): string[] {
  let fileList = [];

  routes.forEach(route => {
    if (route.children) {
      fileList = fileList.concat(getRoutesFile(route.children));
    } else {
      fileList.push(`src/pages/${route.file}`);
    }
  });

  return fileList;
}
