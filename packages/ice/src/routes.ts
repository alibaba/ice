import * as path from 'path';
import { formatNestedRouteManifest, generateRouteManifest } from '@ice/route-manifest';
import type { NestedRouteManifest } from '@ice/route-manifest';
import type { UserConfig } from './types/userConfig.js';
import { getFileExports } from './service/analyze.js';
import formatPath from './utils/formatPath.js';

export async function generateRoutesInfo(rootDir: string, routesConfig: UserConfig['routes'] = {}) {
  const routeManifest = generateRouteManifest(
    rootDir,
    routesConfig.ignoreFiles,
    routesConfig.defineRoutes,
    routesConfig.config,
  );

  const analyzeTasks = Object.keys(routeManifest).map(async (key) => {
    const routeItem = routeManifest[key];
    // add exports filed for route manifest
    routeItem.exports = await getFileExports({
      rootDir,
      file: formatPath(path.join('./src/pages', routeItem.file)),
    });
  });
  await Promise.all(analyzeTasks);

  const routes = formatNestedRouteManifest(routeManifest);
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
    routes,
    loaders: generateRouteConfig(routes, 'dataLoader', (str, imports) => {
      return imports.length > 0 ? `${str}
export default {
  ${imports.map(([routeId, importKey]) => `'${routeId}': ${importKey},`).join('\n  ')}
};` : '';
    }),
    routesConfig: generateRouteConfig(routes, 'pageConfig', (str, imports) => {
      return `${str}
export default {
  ${imports.map(([routeId, importKey]) => `'${routeId}': ${importKey},`).join('\n  ')}
};`;
    }),
  };
}

export function getRoutesDefination(nestRouteManifest: NestedRouteManifest[], lazy = false, depth = 0) {
  const routeImports: string[] = [];
  const routeDefination = nestRouteManifest.reduce((prev, route) => {
    const { children, path: routePath, index, componentName, file, id, layout, exports } = route;

    const componentPath = id.startsWith('__') ? file : `@/pages/${file}`.replace(new RegExp(`${path.extname(file)}$`), '');

    let loadStatement = '';
    if (lazy) {
      loadStatement = `import(/* webpackChunkName: "p_${componentName}" */ '${formatPath(componentPath)}')`;
    } else {
      // Consider the case of the component name is `page-$id`.
      const camelComponentName = componentName.replace(/-(\w|\$)/g, (_, letter) => letter.toUpperCase());
      routeImports.push(`import * as ${camelComponentName} from '${formatPath(componentPath)}';`);
      loadStatement = camelComponentName;
    }
    const routeProperties: string[] = [
      `path: '${formatPath(routePath || '')}',`,
      `load: () => ${loadStatement},`,
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
      const res = getRoutesDefination(children, lazy, depth + 1);
      routeImports.push(...res.routeImports);
      routeProperties.push(`children: [${res.routeDefination}]`);
    }
    prev += formatRoutesStr(depth, routeProperties);
    return prev;
  }, '');

  return {
    routeImports,
    routeDefination,
  };
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
      const routePath = route.path || (route.index ? 'index' : '/');
      let str = '';
      if (exports.includes(exportKey)) {
        const fileExtname = path.extname(file);
        const componentFile = file.replace(new RegExp(`${fileExtname}$`), '');
        const componentPath = path.isAbsolute(componentFile) ? componentFile : `@/pages/${componentFile}`;

        const loaderName = `${exportKey}_${id}`.replace(/[-/]/g, '_');
        const fullPath = path.join(parentPath, routePath);
        imports.push([id, loaderName, fullPath]);
        str = `import { ${exportKey} as ${loaderName} } from '${componentPath}';\n`;
      }

      if (children) {
        str += importConfig(children, routePath);
      }

      prev += str;

      return prev;
    }, '');
  }
  return template(importConfig(routes, ''), imports);
}
