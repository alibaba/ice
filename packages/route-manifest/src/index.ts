// based on https://github.com/remix-run/remix/blob/main/packages/remix-dev/config/routesConvention.ts
import fs from 'fs';
import path from 'path';
import minimatch from 'minimatch';
import { createRouteId, defineRoutes, normalizeSlashes } from './routes.js';
import type { RouteManifest, DefineRouteFunction, NestedRouteManifest, ConfigRoute } from './routes.js';

export type {
  RouteManifest,
  NestedRouteManifest,
  DefineRouteFunction,
  ConfigRoute,
};

const validRouteChar = ['-', '\\w', '/', ':', '*'];

const routeModuleExts = [
  '.js',
  '.jsx',
  '.ts',
  '.tsx',
  // TODO: 暂不支持 .md/.mdx 文件，需要工程配合
  // '.md',
  // '.mdx',
];

export function isRouteModuleFile(filename: string): boolean {
  return routeModuleExts.includes(path.extname(filename));
}

export function generateRouteManifest(
  rootDir: string,
  ignoreFiles: string[] = [],
  defineExtraRoutes?: (defineRoute: DefineRouteFunction) => void,
) {
  const srcDir = path.join(rootDir, 'src');
  const routeManifest: RouteManifest = {};
  // 2. find routes in `src/pages` directory
  if (fs.existsSync(path.resolve(srcDir, 'pages'))) {
    const conventionalRoutes = defineConventionalRoutes(
      rootDir,
      ignoreFiles,
    );

    for (const key of Object.keys(conventionalRoutes)) {
      const route = conventionalRoutes[key];
      routeManifest[route.id] = {
        ...route,
        parentId: route.parentId || undefined,
      };
    }
  }
  // 3. add extra routes from user config
  if (defineExtraRoutes) {
    const extraRoutes = defineRoutes(defineExtraRoutes);
    for (const key of Object.keys(extraRoutes)) {
      const route = extraRoutes[key];
      routeManifest[route.id] = {
        ...route,
        parentId: route.parentId || undefined,
      };
    }
  }
  return routeManifest;
}

export function formatNestedRouteManifest(routeManifest: RouteManifest, parentId?: string): NestedRouteManifest[] {
  return Object.keys(routeManifest)
    .filter(key => routeManifest[key].parentId === parentId)
    .map(key => {
      const route = {
        ...routeManifest[key],
      } as NestedRouteManifest;
      const children = formatNestedRouteManifest(routeManifest, route.id);
      if (children.length > 0) route.children = children;
      return route;
    });
}

function defineConventionalRoutes(
  rootDir: string,
  ignoredFilePatterns?: string[],
): RouteManifest {
  const files: { [routeId: string]: string } = {};
  // 1. find all route components in src/pages
  visitFiles(
    path.join(rootDir, 'src', 'pages'),
    file => {
      if (
        ignoredFilePatterns &&
        ignoredFilePatterns.some(pattern => minimatch(file, pattern))
      ) {
        return;
      }

      if (isRouteModuleFile(file)) {
        let routeId = createRouteId(file);
        files[routeId] = file;
        return;
      }
    },
  );

  const routeIds = Object.keys(files).sort(byLongestFirst);

  const uniqueRoutes = new Map<string, string>();

  // 2. recurse through all routes using the public defineRoutes() API
  function defineNestedRoutes(
    defineRoute: DefineRouteFunction,
    parentId?: string,
  ): void {
    const childRouteIds = routeIds.filter((id) => {
      const parentRouteId = findParentRouteId(routeIds, id);
      return parentRouteId === parentId;
    });

    for (let routeId of childRouteIds) {
      const parentRoutePath = removeLastLayoutStrFromId(parentId) || '';
      const routePath: string | undefined = createRoutePath(
        // parentRoutePath = 'home', routeId = 'home/me', the new routeId is 'me'
        // in order to escape the child route path is absolute path
        routeId.slice(parentRoutePath.length + (parentRoutePath ? 1 : 0)),
      );
      const routeFilePath = normalizeSlashes(path.join('src', 'pages', files[routeId]));
      if (RegExp(`[^${validRouteChar.join(',')}]`).test(routePath)) {
        throw new Error(`invalid character in '${routeFilePath}'. Only support char: ${validRouteChar.join(', ')}`);
      }
      const isIndexRoute = routeId === 'index' || routeId.endsWith('/index');
      const fullPath = createRoutePath(routeId);
      const uniqueRouteId = (fullPath || '') + (isIndexRoute ? '?index' : '');

      if (uniqueRouteId) {
        if (uniqueRoutes.has(uniqueRouteId)) {
          throw new Error(
            `Path ${JSON.stringify(fullPath)} defined by route ${JSON.stringify(routeFilePath)} 
            conflicts with route ${JSON.stringify(uniqueRoutes.get(uniqueRouteId))}`,
          );
        } else {
          uniqueRoutes.set(uniqueRouteId, routeId);
        }
      }

      if (isIndexRoute) {
        let invalidChildRoutes = routeIds.filter(
          (id) => findParentRouteId(routeIds, id) === routeId,
        );

        if (invalidChildRoutes.length > 0) {
          throw new Error(
            `Child routes are not allowed in index routes. Please remove child routes of ${routeId}`,
          );
        }

        defineRoute(routePath, files[routeId], {
          index: true,
        });
      } else {
        defineRoute(routePath, files[routeId], () => {
          defineNestedRoutes(defineRoute, routeId);
        });
      }
    }
  }

  return defineRoutes(defineNestedRoutes);
}

export function createRoutePath(routeId: string): string | undefined {
  let result = '';
  let rawSegmentBuffer = '';

  const partialRouteId = removeLastLayoutStrFromId(routeId);

  for (let i = 0; i < partialRouteId.length; i++) {
    const char = partialRouteId.charAt(i);

    const nextChar = i < partialRouteId.length - 1 ? partialRouteId.charAt(i + 1) : undefined;

    if (char === '/' || char === path.win32.sep || char === '.') {
      if (rawSegmentBuffer === 'index' && result.endsWith('index')) {
        result = result.replace(/\/?index$/, '');
      } else {
        result += '/';
      }
      rawSegmentBuffer = '';
      continue;
    }

    rawSegmentBuffer += char;

    if (char === '$') {
      result += typeof nextChar === 'undefined' ? '*' : ':';
      continue;
    }

    result += char;
  }

  if (rawSegmentBuffer === 'index' && result.endsWith('index')) {
    result = result.replace(/\/?index$/, '');
  }

  return result || undefined;
}

function findParentRouteId(
  routeIds: string[],
  childRouteId: string,
): string | undefined {
  return routeIds.find((id) => {
    // childRouteId is `pages/about` and id is `pages/layout` will match
    // childRouteId is `pages/about/index` and id is `pages/about/layout` will match
    return childRouteId !== id && id.endsWith('layout') && childRouteId.startsWith(`${id.slice(0, id.length - 'layout'.length)}`);
  });
}

function byLongestFirst(a: string, b: string): number {
  return b.length - a.length;
}

function visitFiles(
  dir: string,
  visitor: (file: string) => void,
  baseDir = dir,
): void {
  for (let filename of fs.readdirSync(dir)) {
    let file = path.resolve(dir, filename);
    let stat = fs.lstatSync(file);

    if (stat.isDirectory()) {
      visitFiles(file, visitor, baseDir);
    } else if (stat.isFile()) {
      visitor(normalizeSlashes(path.relative(baseDir, file)));
    }
  }
}

/**
 * remove `/layout` str if the routeId has it
 *
 * 'layout' -> ''
 * 'About/layout' -> 'About'
 * 'About/layout/index' -> 'About/layout/index'
 */
function removeLastLayoutStrFromId(id?: string) {
  const layoutStrs = ['/layout', 'layout'];
  const currentLayoutStr = layoutStrs.find(layoutStr => id?.endsWith(layoutStr));
  return currentLayoutStr ? id.slice(0, id.length - currentLayoutStr.length) : id;
}
