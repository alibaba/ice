import * as path from 'path';
import { formatNestedRouteManifest, generateRouteManifest } from '@ice/route-manifest';
import type { NestedRouteManifest, RouteManifest } from '@ice/route-manifest';

export function generateRoutesRenderData(rootDir: string) {
  const routeManifest = generateRouteManifest(rootDir);
  const routes = formatNestedRouteManifest(routeManifest);

  const componentsImportStr = generateComponentsImportStr(routeManifest);
  const routesStr = generateRoutesStr(routes);

  return { componentsImportStr, routesStr, asyncRoutesStr };
}

function generateComponentsImportStr(routeManifest: RouteManifest) {
  return Object.keys(routeManifest)
    .reduce((prev: string, id: string) => {
      let { file, componentName } = routeManifest[id];
      const fileExtname = path.extname(file);
      file = file.replace(new RegExp(`${fileExtname}$`), '');
      return `${prev}import * as ${componentName} from '@/${file}'; \n`;
  }, '');
}

function generateRoutesStr(nestRouteManifest: NestedRouteManifest[]) {
  const str = generateNestRoutesStr(nestRouteManifest);
  return `[${str}]`;
}

function generateNestRoutesStr(nestRouteManifest: NestedRouteManifest[]) {
  return nestRouteManifest.reduce((prev, route) => {
    const { id, children, path: routePath, index, componentName, file } = route;

    let componentKV;
    if (async) {
      const fileExtname = path.extname(file);
      const componentFile = file.replace(new RegExp(`${fileExtname}$`), '');
      componentKV = `load: () => import(/* webpackChunkName: "${componentName}" */ '@/${componentFile}')`;
    } else {
      componentKV = `component: ${componentName}`;
    }

    let str = `{
      path: '${path || ''}',
      component: ${componentName},
      componentName: '${componentName}',
      index: ${index},
      exact: true,
      id: '${id}',
    `;
    if (children) {
      str += `children: [${generateNestRoutesStr(children)}],`;
    }
    str += '},';
    prev += str;
    return prev;
  }, '');
}