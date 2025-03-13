// based on https://github.com/remix-run/remix/blob/main/packages/remix-dev/config/routesConvention.ts
import fs from 'fs';
import path from 'path';
import minimatch from 'minimatch';
import {
  createComponentName,
  removeLastLayoutStrFromId,
  createRouteId,
  defineRoutes,
  normalizeSlashes,
  createFileId,
} from './routes.js';
import type {
  RouteManifest,
  DefineRouteFunction,
  NestedRouteManifest,
  ConfigRoute,
  DefineRoutesOptions,
  DefineExtraRoutes,
} from './routes.js';

export type {
  RouteManifest,
  NestedRouteManifest,
  DefineRouteFunction,
  ConfigRoute,
  DefineExtraRoutes,
  DefineRoutesOptions,
};

export {
  createRouteId,
};

export interface RouteItem {
  path: string;
  component: string;
  children?: RouteItem[];
}

const validRouteChar = ['-', '\\w', '/', ':', '*', '\\[', '\\]', '\\.'];

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
  defineExtraRoutesQueue?: DefineExtraRoutes[],
  routeConfig?: RouteItem[],
) {
  const srcDir = path.join(rootDir, 'src');
  const routeManifest: RouteManifest = {};
  // 2. find routes in `src/pages` directory
  if (fs.existsSync(path.resolve(srcDir, 'pages'))) {
    const conventionalRoutes = defineConventionalRoutes(
      rootDir,
      {
        routeManifest,
        nestedRouteManifest: formatNestedRouteManifest(routeManifest),
      },
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
  if (Array.isArray(defineExtraRoutesQueue)) {
    defineExtraRoutesQueue.forEach((defineExtraRoutes) => {
      if (defineExtraRoutes) {
        const extraRoutes = defineRoutes(
          rootDir,
          defineExtraRoutes,
          {
            routeManifest,
            nestedRouteManifest: formatNestedRouteManifest(routeManifest),
          },
        );
        for (const key of Object.keys(extraRoutes)) {
          const route = extraRoutes[key];
          routeManifest[route.id] = {
            ...route,
            parentId: route.parentId || undefined,
          };
        }
      }
    });
  }

  // Add routes by routes config.
  if (routeConfig) {
    routeConfig.forEach((routeItem) => {
      const routes = parseRoute(routeItem);
      routes.forEach((route) => {
        routeManifest[route.id] = route;
      });
    });
  }

  return routeManifest;
}

export function parseRoute(routeItem: RouteItem, parentId?: string, parentPath?: string) {
  const routes = [];
  const { path: routePath, component, children } = routeItem;
  const id = createRouteId(component, routePath, parentPath);
  let index;
  const currentPath = path.join(parentPath || '/', routePath).split(path.sep).join('/');
  const isRootPath = currentPath === '/';
  if (!children && isRootPath) {
    index = true;
  }
  const route: ConfigRoute = {
    // An absolute child route path must start with the combined path of all its parent routes
    // Replace the first slash with an empty string to compatible with the route definintion, e.g. /foo
    path: parentId && routePath !== '/' ? routePath.replace(/^\//, '') : routePath,
    index,
    id,
    parentId,
    file: component,
    componentName: createComponentName(component),
    layout: !!children,
  };
  routes.push(route);
  if (children) {
    children.forEach((childRoute) => {
      routes.push(...parseRoute(childRoute, id, currentPath));
    });
  }
  return routes;
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
  options: DefineRoutesOptions,
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
        let fileId = createFileId(file);
        files[fileId] = file;
        return;
      }
    },
  );

  const fileIds = Object.keys(files).sort(byLongestFirst);

  const uniqueRoutes = new Map<string, string>();

  // 2. recurse through all routes using the public defineRoutes() API
  function defineNestedRoutes(
    defineRoute: DefineRouteFunction,
    options: DefineRoutesOptions,
    parentId?: string,
  ): void {
    const childFileIds = fileIds.filter((id) => {
      const parentFileId = findParentFileId(fileIds, id);
      return parentFileId === parentId;
    });

    for (let fileId of childFileIds) {
      const parentRoutePath = removeLastLayoutStrFromId(parentId) || '';
      const routePath: string | undefined = createRoutePath(
        // parentRoutePath = 'home', routeId = 'home/me', the new routeId is 'me'
        // in order to escape the child route path is absolute path
        fileId.slice(parentRoutePath.length + (parentRoutePath ? 1 : 0)),
      );
      const routeFilePath = normalizeSlashes(path.join('src', 'pages', files[fileId]));
      if (RegExp(`[^${validRouteChar.join('')}]+`).test(routePath)) {
        throw new Error(`invalid character in '${routeFilePath}'. Only support char: ${validRouteChar.join(', ')}`);
      }
      const isIndexRoute = isIndexFileId(fileId);
      const fullPath = createRoutePath(fileId);
      const uniqueRouteId = (fullPath || '') + (isIndexRoute ? '?index' : '');

      if (uniqueRouteId) {
        if (uniqueRoutes.has(uniqueRouteId)) {
          throw new Error(
            `Path ${JSON.stringify(fullPath)} defined by route ${JSON.stringify(routeFilePath)}
            conflicts with route ${JSON.stringify(uniqueRoutes.get(uniqueRouteId))}`,
          );
        } else {
          uniqueRoutes.set(uniqueRouteId, fileId);
        }
      }

      if (isIndexRoute) {
        let invalidChildRoutes = fileIds.filter(
          (id) => findParentFileId(fileIds, id) === fileId,
        );

        if (invalidChildRoutes.length > 0) {
          throw new Error(
            `Child routes are not allowed in index routes. Please remove child routes of ${fileId}`,
          );
        }

        defineRoute(routePath, files[fileId], {
          index: true,
        });
      } else {
        defineRoute(routePath, files[fileId], () => {
          defineNestedRoutes(defineRoute, options, fileId);
        });
      }
    }
  }

  return defineRoutes(rootDir, defineNestedRoutes, options);
}

const escapeStart = '[';
const escapeEnd = ']';

export function createRoutePath(routeId: string): string | undefined {
  let result = '';
  let rawSegmentBuffer = '';

  let inEscapeSequence = 0;
  let skipSegment = false;

  const partialRouteId = removeLastLayoutStrFromId(routeId);

  for (let i = 0; i < partialRouteId.length; i++) {
    const char = partialRouteId.charAt(i);
    const lastChar = i > 0 ? partialRouteId.charAt(i - 1) : undefined;
    const nextChar = i < partialRouteId.length - 1 ? partialRouteId.charAt(i + 1) : undefined;

    const isNewEscapeSequence = !inEscapeSequence && char === escapeStart && lastChar !== escapeStart;
    const isCloseEscapeSequence = inEscapeSequence && char === escapeEnd && nextChar !== escapeEnd;

    if (skipSegment) {
      if (char === '/' || char === '.' || char === path.win32.sep) {
        skipSegment = false;
      }
      continue;
    }
    // We try to get the string in the escape sequence. For example, try to get the `index` string in `[index]`.
    if (isNewEscapeSequence) {
      inEscapeSequence++;
      continue;
    }

    if (isCloseEscapeSequence) {
      inEscapeSequence--;
      continue;
    }

    if (inEscapeSequence) {
      result += char;
      continue;
    }

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

/**
 * @param file file path without `src/pages` prefix
 */
export function createRouteIdByFile(file: string) {
  const fileId = createFileId(file);
  const isIndex = isIndexFileId(fileId);
  const routePath = createRoutePath(fileId);

  return createRouteId(file, routePath, undefined, isIndex);
}

function findParentFileId(
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

function isIndexFileId(fileId: string) {
  return fileId === 'index' || fileId.endsWith('/index');
}
