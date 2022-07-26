import * as path from 'path';
import { formatNestedRouteManifest, generateRouteManifest } from '@ice/route-manifest';
import type { NestedRouteManifest } from '@ice/route-manifest';
import type { UserConfig } from '@ice/types';
import { getRouteExports } from './service/analyze.js';

export async function generateRoutesInfo(rootDir: string, routesConfig: UserConfig['routes'] = {}) {
  const routeManifest = generateRouteManifest(rootDir, routesConfig.ignoreFiles, routesConfig.defineRoutes);

  const analyzeTasks = Object.keys(routeManifest).map(async (key) => {
    const routeItem = routeManifest[key];
    const routeId = routeItem.id;
    // add exports filed for route manifest
    routeItem.exports = await getRouteExports({
      rootDir,
      routeConfig: {
        file: path.join('./src/pages', routeItem.file),
        routeId,
      },
    });
  });
  await Promise.all(analyzeTasks);

  const routes = formatNestedRouteManifest(routeManifest);
  const routesStr = generateRoutesStr(routes);
  let routesCount = 0;
  Object.keys(routeManifest).forEach((key) => {
    const routeItem = routeManifest[key];
    if (!routeItem.layout) {
      routesCount += 1;
    }
  });

  return {
    routesCount,
    routeManifest,
    routesStr,
    routes,
    loaders: generateRouteConfig(routes, 'getData', (str, imports) => {
      return `${str}
const loaders = {
  ${imports.map(([routeId, importKey]) => `'${routeId}': ${importKey},`).join('\n  ')}
};`;
    }),
    routesConfig: generateRouteConfig(routes, 'getConfig', (str, imports) => {
      return `${str}
export default {
  ${imports.map(([, importKey, routePath]) => `'${routePath}': ${importKey},`).join('\n  ')}
};`;
    }),
  };
}

function generateRoutesStr(nestRouteManifest: NestedRouteManifest[]) {
  return `[
  ${recurseRoutesStr(nestRouteManifest)}
]`;
}

function recurseRoutesStr(nestRouteManifest: NestedRouteManifest[], depth = 0) {
  return nestRouteManifest.reduce((prev, route) => {
    const { children, path: routePath, index, componentName, file, id, layout, exports } = route;

    const componentPath = id.startsWith('__') ? file : `@/pages/${file}`.replace(new RegExp(`${path.extname(file)}$`), '');
    const routeProperties: string[] = [
      `path: '${routePath || ''}',`,
      `load: () => import(/* webpackChunkName: "${componentName}" */ '${componentPath}'),`,
      `componentName: '${componentName}',`,
      `index: ${index},`,
      `id: '${id}',`,
      'exact: true,',
      `exports: ${JSON.stringify(exports)},`,
    ];
    if (layout) {
      routeProperties.push('layout: true,');
    }
    if (children) {
      routeProperties.push(`children: [${recurseRoutesStr(children, depth + 1)}]`);
    }

    prev += formatRoutesStr(depth, routeProperties);
    return prev;
  }, '');
}

function formatRoutesStr(deep: number, strs: string[]) {
  const identSpaces = ' '.repeat(2 * (deep + 1));
  const twoSpaces = ' '.repeat(2);
  return `{
${identSpaces + twoSpaces}${strs.join(`\n${`${identSpaces + twoSpaces}`}`)}
${identSpaces}},`;
}

/**
 * generate loader template for routes
 */
function generateRouteConfig(
  routes: NestedRouteManifest[],
  exportKey: string,
  template: (importStr: string, imports: [string, string, string][]) => string): string {
  const imports = [];

  function importConfig(routes: NestedRouteManifest[], parentPath: string) {
    return routes.reduce((prev, route) => {
      const { children, file, id, exports } = route;
      if (exports.indexOf(exportKey) === -1) {
        return prev;
      }

      const fileExtname = path.extname(file);
      const componentFile = file.replace(new RegExp(`${fileExtname}$`), '');
      const componentPath = path.isAbsolute(componentFile) ? componentFile : `@/pages/${componentFile}`;

      const loaderName = `${exportKey}_${id}`.replace(/[-/]/g, '_');
      const routePath = route.path || (route.index ? 'index' : '/');
      const fullPath = path.join(parentPath, routePath);
      imports.push([id, loaderName, fullPath]);
      let str = `import { ${exportKey} as ${loaderName} } from '${componentPath}';\n`;

      if (children) {
        str += importConfig(children, routePath);
      }

      prev += str;

      return prev;
    }, '');
  }
  return template(importConfig(routes, ''), imports);
}