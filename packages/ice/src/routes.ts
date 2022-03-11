import * as path from 'path';
import { formatNestedRouteManifest, generateRouteManifest } from '@ice/route-manifest';
import type { NestedRouteManifest, RouteManifest } from '@ice/route-manifest';

export function generateRoutesRenderData(rootDir: string) {
  const routeManifest = generateRouteManifest(rootDir);
  const routes = formatNestedRouteManifest(routeManifest);

  const componentsImportStr = generateComponentsImportStr(routeManifest);
  const routesStr = generateRoutesStr(routes);

  return { componentsImportStr, routesStr };
}

function generateComponentsImportStr(routeManifest: RouteManifest) {
  return Object.keys(routeManifest)
    .reduce((prev: string, id: string) => {
      let { file, componentName } = routeManifest[id];
      const fileExtname = path.extname(file);
      file = file.replace(new RegExp(`${fileExtname}$`), '');
      return `${prev}const ${componentName} = React.lazy(() => import(/* webpackChunkName: "${componentName}" */ '@/${file}'))\n`;
  }, '');
}

function generateRoutesStr(nestRouteManifest: NestedRouteManifest[]) {
  const str = generateNestRoutesStr(nestRouteManifest);
  return `[${str}]`;
}

function generateNestRoutesStr(nestRouteManifest: NestedRouteManifest[]) {
  return nestRouteManifest.reduce((prev, route) => {
    const { children, path, index, componentName } = route;
    let str = `{
      path: '${path || ''}',
      component: ${componentName},
      componentName: '${componentName}',
      index: ${index},
      exact: true,
    `;
    if (children) {
      str += `children: [${generateNestRoutesStr(children)}],`;
    }
    str += '},';
    prev += str;
    return prev;
  }, '');
}