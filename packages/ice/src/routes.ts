import * as path from 'path';
import { formatNestedRouteManifest, generateRouteManifest } from '@ice/route-manifest';
import type { NestedRouteManifest, RouteManifest } from '@ice/route-manifest';

export function generateRoutesRenderData(rootDir: string) {
  const routeManifest = generateRouteManifest(rootDir);
  const routes = formatNestedRouteManifest(routeManifest);

  const componentsImportStr = generateComponentsImportStr(routeManifest);
  const routesStr = generateRoutesStr(routes);
  const asyncRoutesStr = generateRoutesStr(routes, true);

  return { componentsImportStr, routesStr, asyncRoutesStr, routes };
}

function generateComponentsImportStr(routeManifest: RouteManifest) {
  return Object.keys(routeManifest)
    .reduce((prev: string, id: string) => {
      let { file, componentName } = routeManifest[id];
      const fileExtname = path.extname(file);
      file = file.replace(new RegExp(`${fileExtname}$`), '');
      return `${prev}import ${componentName} from '@/${file}'; \n`;
  }, '');
}

function generateRoutesStr(nestRouteManifest: NestedRouteManifest[], async?: boolean) {
  const str = generateNestRoutesStr(nestRouteManifest, async);
  return `[${str}]`;
}

function generateNestRoutesStr(nestRouteManifest: NestedRouteManifest[], async?: boolean) {
  return nestRouteManifest.reduce((prev, route) => {
    const { children, path: routePath, index, componentName, file } = route;

    let componentKV;
    if (async) {
      const fileExtname = path.extname(file);
      const componentFile = file.replace(new RegExp(`${fileExtname}$`), '');
      componentKV = `load: () => import(/* webpackChunkName: "${componentName}" */ '@/${componentFile}')`;
    } else {
      componentKV = `component: ${componentName}`;
    }

    let str = `{
      path: '${routePath || ''}',
      ${componentKV},
      componentName: '${componentName}',
      index: ${index},
      exact: true,
    `;
    if (children) {
      str += `children: [${generateNestRoutesStr(children, async)}],`;
    }
    str += '},';
    prev += str;
    return prev;
  }, '');
}