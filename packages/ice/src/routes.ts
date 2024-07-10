import * as path from 'path';
import { formatNestedRouteManifest, generateRouteManifest } from '@ice/route-manifest';
import type { NestedRouteManifest, DefineExtraRoutes } from '@ice/route-manifest';
import type { UserConfig } from './types/userConfig.js';
import { getFileExports } from './service/analyze.js';
import formatPath from './utils/formatPath.js';

export async function generateRoutesInfo(
  rootDir: string,
  routesConfig: UserConfig['routes'] = {},
  routesDefinitions: DefineExtraRoutes[] = [],
) {
  const routeManifest = generateRouteManifest(
    rootDir,
    routesConfig.ignoreFiles,
    [routesConfig.defineRoutes, ...routesDefinitions],
    routesConfig.config,
  );

  const analyzeTasks = Object.keys(routeManifest).map(async (key) => {
    const routeItem = routeManifest[key];
    // add exports filed for route manifest
    routeItem.exports = await getFileExports({
      rootDir,
      file: formatPath(path.isAbsolute(routeItem.file) ? routeItem.file : path.join('./src/pages', routeItem.file)),
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

  const routesExports = [];
  const configExport = generateRouteConfig(routes, 'pageConfig', (str, imports) => {
    routesExports.push(...imports);
    return `${str}
export default {
  ${imports.map(([routeId, importKey]) => `'${routeId}': ${importKey},`).join('\n  ')}
};`;
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
    routesConfig: configExport,
    routesExports,
  };
}

function getFilePath(file: string) {
  return formatPath(path.isAbsolute(file) ? file : `@/pages/${file}`.replace(new RegExp(`${path.extname(file)}$`), ''));
}

interface GetDefinationOptions {
  manifest: NestedRouteManifest[];
  lazy?: boolean;
  depth?: number;
  matchRoute?: (route: NestedRouteManifest) => boolean;
}

export function getRoutesDefinition(options: GetDefinationOptions) {
  const { manifest, lazy = false, depth = 0, matchRoute = () => true } = options;
  const routeImports: string[] = [];
  const routeDefinition = manifest.reduce((prev, route) => {
    if (!matchRoute(route)) {
      return prev;
    }
    const { children, path: routePath, index, componentName, file, id, layout, exports } = route;
    const componentPath = id.startsWith('__') ? file : getFilePath(file);

    let loadStatement = '';
    if (lazy) {
      loadStatement = `import(/* webpackChunkName: "p_${componentName}" */ '${formatPath(componentPath)}')`;
    } else {
      const routeSpecifier = formatRouteSpecifier(id);
      routeImports.push(`import * as ${routeSpecifier} from '${formatPath(componentPath)}';`);
      loadStatement = routeSpecifier;
    }
    // Keep the string in a single line for the code style.
    const lazyStatment = `lazyLoadComponent(${lazy ? 'componentModule' : loadStatement}, { routeId: '${id}', layout: ${layout}, renderMode, requestContext })`;
    const routeProperties: string[] = [`...getRouteProps({ path: '${formatPath(routePath || '')}', componentName: '${componentName}', index: ${index}, id: '${id}', layout: ${layout}, exports: ${JSON.stringify(exports)} }),`];
    routeProperties.push(`async lazy() {${lazy ? `const componentModule = await ${loadStatement}` : ''}; return ${lazyStatment};},`);
    if (children) {
      const res = getRoutesDefinition({
        manifest: children,
        lazy,
        depth: depth + 1,
        matchRoute,
      });
      routeImports.push(...res.routeImports);
      routeProperties.push(`children: [${res.routeDefinition}]`);
    }
    prev += formatRoutesStr(depth, routeProperties);
    return prev;
  }, '');

  return {
    routeImports,
    routeDefinition,
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

        const loaderName = formatRouteSpecifier(`${exportKey}_${id}`);
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

function formatRouteSpecifier(routeId: string) {
  return routeId.replace(/[./-]/g, '_').replace(/[:*]/g, '$');
}
