// based on https://github.com/remix-run/remix/blob/main/packages/remix-dev/config/routes.ts

import { win32 } from 'path';

export interface ConfigRoute {
  /**
   * The unique id for this route, named like its `file` but without the
   * extension. So `src/pages/gists/$username.jsx` will have an `id` of
   * `routes/gists/$username`.
   */
  id: string;
  /**
   * The path to the entry point for this route, relative to src/pages
   */
  file: string;
  /**
   * current route's component. `src/pages/gist.jsx` will have an `componentName` of `PageGist`
   */
  componentName: string;
  /**
   * The unique `id` for this route's parent route, if there is one.
   */
  parentId?: string;
  /**
   * The path this route uses to match on the URL pathname.
   */
  path?: string;
  /**
   * Should be `true` if it is an index route. This disallows child routes.
   */
  index?: boolean;
  /**
   * Should be `true` if route is layout component.
   */
  layout?: boolean;
  /**
   * module exports key of route
   */
  exports?: string[];
}

export interface DefineRouteOptions {
  /**
   * Should be `true` if this is an index route that does not allow child routes.
   */
  index?: boolean;
}

interface DefineRouteChildren {
  (): void;
}

export interface DefineRouteFunction {
  (
    /**
     * The path this route uses to match the URL pathname.
     */
    path: string | undefined,

    /**
     * The path to the file that exports the React component rendered by this
     * route as its default export, relative to the `app` directory.
     */
    file: string,

    /**
     * Options for defining routes, or a function for defining child routes.
     */
    optionsOrChildren?: DefineRouteOptions | DefineRouteChildren,

    /**
     * A function for defining child routes.
     */
    children?: DefineRouteChildren,
  ): void;
}
export interface RouteManifest {
  [routeId: string]: ConfigRoute;
}

export interface NestedRouteManifest extends ConfigRoute {
  children?: ConfigRoute[];
}

export function defineRoutes(
  callback: (defineRoute: DefineRouteFunction) => void,
) {
  const routes: RouteManifest = Object.create(null);
  const parentRoutes: ConfigRoute[] = [];
  let alreadyReturned = false;

  const defineRoute: DefineRouteFunction = (path, file, optionsOrChildren, children) => {
    if (alreadyReturned) {
      throw new Error(
        'You tried to define routes asynchronously but started defining ' +
          'routes before the async work was done. Please await all async ' +
          'data before calling `defineRoutes()`',
      );
    }

    let options: DefineRouteOptions;
    if (typeof optionsOrChildren === 'function') {
      // route(path, file, children)
      options = {};
      children = optionsOrChildren;
    } else {
      // route(path, file, options, children)
      // route(path, file, options)
      options = optionsOrChildren || {};
    }

    const id = createRouteId(file);
    const route: ConfigRoute = {
      path,
      index: options.index ? true : undefined,
      id,
      parentId:
        parentRoutes.length > 0
          ? parentRoutes[parentRoutes.length - 1].id
          : undefined,
      file,
      componentName: createComponentName(id),
      layout: id.endsWith('layout'),
    };

    routes[route.id] = route;

    if (children) {
      parentRoutes.push(route);
      children();
      parentRoutes.pop();
    }
  };

  callback(defineRoute);

  alreadyReturned = true;

  return routes;
}

export function createRouteId(file: string) {
  return normalizeSlashes(stripFileExtension(file));
}

export function normalizeSlashes(file: string) {
  return file.split(win32.sep).join('/');
}

function stripFileExtension(file: string) {
  return file.replace(/\.[a-z0-9]+$/i, '');
}

function createComponentName(id: string) {
  return id.replace('.', '/') // 'pages/home.news' -> pages/home/news
    .split('/')
    .map((item: string) => item.toLowerCase())
    .join('-');
}