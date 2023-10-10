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
    const routePath = formatPath(path.join('/', parentPath.replace(/^\//, ''), route.path || ''));
    if (route.children) {
      pathList = pathList.concat(getRoutePaths(route.children, routePath));
    } else {
      pathList.push(routePath);
    }
  });

  return pathList;
}

export function getRoutesFile(routes: NestedRouteManifest[]): string[] {
  let fileList = [];

  routes.forEach(route => {
    fileList.push(`src/pages/${route.file}`);

    if (route.children) {
      fileList = fileList.concat(getRoutesFile(route.children));
    }
  });

  return fileList;
}
