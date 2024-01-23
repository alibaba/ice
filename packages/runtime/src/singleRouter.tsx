/**
 * Fake API of react-router-dom, react-router-dom will be remove
 * if user config `optimize.router` false
 */
import * as React from 'react';
import type { History } from '@remix-run/router';
import type { RouteObject } from 'react-router-dom';
import type { LoaderData, RouteItem } from './types.js';
import { loadRouteModules } from './routes.js';

const Context = React.createContext<LoaderData>(undefined);

Context.displayName = 'DataContext';

export const DataContextProvider = Context.Provider;

export const RouteContext = React.createContext({
  outlet: null,
  matches: [],
  routeData: null,
});

RouteContext.displayName = 'RouteContext';

export function useData<T = any>(): T {
  const value = React.useContext(RouteContext);
  console.log('use value', value);
  return value.routeData?.data;
}

export function useConfig() {
  const value = React.useContext(RouteContext);
  return value.routeData?.pageConfig;
}

const OutletContext = React.createContext<unknown>(null);

export function useOutlet(context?: unknown): React.ReactElement | null {
  let { outlet } = React.useContext(RouteContext);
  if (outlet) {
    return (
      <OutletContext.Provider value={context}>{outlet}</OutletContext.Provider>
    );
  }
  return outlet;
}

export function useOutletContext<Context = unknown>(): Context {
  return React.useContext(OutletContext) as Context;
}

export interface OutletProps {
  context?: unknown;
}

export function Outlet(props: OutletProps): React.ReactElement | null {
  return useOutlet(props.context);
}

export function RenderedRoute({ routeContext, children }) {
  console.log('routeContext ==>', routeContext);
  return (
    <RouteContext.Provider value={routeContext}>
      {children}
    </RouteContext.Provider>
  );
}

export const useRoutes = (routes) => {
  return <>{routes[0].element}</>;
};

export const Router = (props) => {
  return <>{props.children}</>;
};

export const createHistory = (): History => {
  return {
    // @ts-expect-error
    listen: () => {},
    // @ts-expect-error
    action: 'POP',
    // @ts-expect-error
    location: '',
  };
};

const joinPaths = (paths: string[]): string => paths.join('/').replace(/\/\/+/g, '/');

interface RouteMeta {
  relativePath: string;
  childrenIndex: number;
  route: RouteObject;
}

interface RouteBranch {
  path: string;
  routesMeta: RouteMeta[];
}

const flattenRoutes = (
  routes: RouteObject[],
  branches: RouteBranch[] = [],
  parentsMeta: RouteMeta[] = [],
  parentPath = '',
) => {
  let flattenRoute = (route: RouteObject, index: number, relativePath?: string) => {
    let routeMeta = {
      relativePath: relativePath === undefined ? route.path || '' : relativePath,
      childrenIndex: index,
      route,
    };

    if (routeMeta.relativePath.startsWith('/')) {
      if (!routeMeta.relativePath.startsWith(parentPath)) {
        throw new Error(`Route path "${routeMeta.relativePath}" nested under path "${parentPath}" is not valid`);
      }
      routeMeta.relativePath = routeMeta.relativePath.slice(parentPath.length);
    }
    let path = joinPaths([parentPath, routeMeta.relativePath]);
    let routesMeta = parentsMeta.concat(routeMeta);

    if (route.children && route.children.length > 0) {
      if (route.index) {
        throw new Error(`Index route should not have children, path "${path}"`);
      }
      flattenRoutes(route.children, branches, routesMeta, path);
    }

    if (route.path == null && !route.index) {
      return;
    }
    branches.push({
      path,
      routesMeta,
    });
  };

  routes.forEach((route, index) => {
    if (route.path === '' || !route.path?.includes('?')) {
      flattenRoute(route, index);
    } else {
      throw new Error(`Single Route mode do not support path: "${route.path}"`);
    }
  });

  return branches;
};

function compilePath(
  path: string,
  end = true,
) {
  let regexpSource =
    `^${
    path
      .replace(/\/*\*?$/, '') // Ignore trailing / and /*, we'll handle it below
      .replace(/^\/*/, '/') // Make sure it has a leading /
      .replace(/[\\.*+^${}|()[\]]/g, '\\$&')}`; // Escape special regex chars;

  if (end) {
    // When matching to the end, ignore trailing slashes
    regexpSource += '\\/*$';
  } else if (path !== '' && path !== '/') {
    // If our path is non-empty and contains anything beyond an initial slash,
    // then we have _some_ form of path in our regex, so we should expect to
    // match only if we find the end of this path segment.  Look for an optional
    // non-captured trailing slash (to match a portion of the URL) or the end
    // of the path (if we've matched to the end).  We used to do this with a
    // word boundary but that gives false positives on routes like
    // /user-preferences since `-` counts as a word boundary.
    regexpSource += '(?:(?=\\/|$))';
  } else {
    // Nothing to match for "" or "/"
  }
  let matcher = new RegExp(regexpSource, 'i');

  return matcher;
}

export function matchPath(
  pattern: string | { path: string; end?: boolean },
  pathname: string,
) {
  if (typeof pattern === 'string') {
    pattern = { path: pattern, end: true };
  }

  let matcher = compilePath(
    pattern.path,
    pattern.end,
  );
  let match = pathname.match(matcher as RegExp);
  if (!match) return null;

  let matchedPathname = match[0];
  let pathnameBase = matchedPathname.replace(/(.)\/+$/, '$1');

  return {
    // Params is not supported yet in single route mode.
    params: {},
    pathname: matchedPathname,
    pathnameBase,
    pattern,
  };
}

const normalizePathname = (pathname: string): string => pathname.replace(/\/+$/, '').replace(/^\/*/, '/');

const matchRouteBranch = (branch: RouteBranch, pathname: string) => {
  let { routesMeta } = branch;
  let matchedPathname = '/';
  let matches = [];
  const len = routesMeta.length;
  for (let i = 0; i < len; i++) {
    let routeMeta = routesMeta[i];
    let end = i === routesMeta.length - 1;
    let remainingPathname = matchedPathname === '/' ? pathname : pathname.slice(matchedPathname.length) || '/';
    let match = matchPath(
      // TODO: casesensitive is not support yet.
      { path: routeMeta.relativePath, end },
      remainingPathname,
    );
    if (!match) return null;
    let { route } = routeMeta;

    matches.push({
      // TODO: Can this as be avoided?
      params: {},
      pathname: joinPaths([matchedPathname, match.pathname]),
      pathnameBase: normalizePathname(
        joinPaths([matchedPathname, match.pathnameBase]),
      ),
      route,
    });

    if (match.pathnameBase !== '/') {
      matchedPathname = joinPaths([matchedPathname, match.pathnameBase]);
    }
  }
  return matches;
};

const stripBasename = (
  pathname: string,
  basename: string,
) => {
  if (basename === '/') return pathname;
  if (!pathname.toLowerCase().startsWith(basename.toLowerCase())) {
    return null;
  }
  const startIndex = basename.endsWith('/')
    ? basename.length - 1
    : basename.length;
  let nextChar = pathname.charAt(startIndex);
  if (nextChar && nextChar !== '/') {
    return null;
  }
  return pathname.slice(startIndex) || '/';
};

export const matchRoutes = (
  routes: RouteObject[],
  location: Partial<Location> | string,
  basename: string,
) => {
  const pathname = typeof location === 'string' ? location : location.pathname;
  const stripedPathname = stripBasename(pathname || '/', basename);
  let branches = flattenRoutes(routes);
  if (branches.length === 1) {
    // Just one branch, no need to match.
    return [{
      route: routes[0],
      params: {},
      pathname,
      pathnameBase: '',
    }];
  }
  let matches = null;
  for (let i = 0; matches == null && i < branches.length; i++) {
    matches = matchRouteBranch(branches[i], stripedPathname);
  }
  return matches;
};

export const Link = () => null;

export const useParams = () => {
  return {};
};
export const useSearchParams = () => {
  return [{}, () => {}];
};
export const useLocation = () => {
  return {};
};
export const useNavigate = () => {
  return {};
};


export const getSingleRoute = async (routes: RouteItem[], basename: string, routeModuleCache = {}) => {
  const matchedRoutes = matchRoutes(routes, location, basename);
  const routeModules = await loadRouteModules(matchedRoutes.map(({ route }) => route), routeModuleCache);
  let loaders = [];
  let loaderIds = [];
  const components = matchedRoutes.map(({ route }) => {
    const { loader } = routeModules[route.id];
    if (loader) {
      loaders.push(loader());
      loaderIds.push(route.id);
    }
    return {
      Component: routeModules[route.id].Component || route.Component,
      isDataRoute: !!loader,
      id: route.id,
    };
  });
  let routesData = {};
  // Compose components.
  const loaderDatas = await Promise.all(loaders);
  loaderDatas.forEach((data, index) => {
    routesData[loaderIds[index]] = data;
  });
  return () => components.reduceRight((outlet, { Component, isDataRoute, id }) => {
    return (
      <RenderedRoute
        routeContext={{
          outlet,
          routeData: isDataRoute && routesData[id],
        }}
        children={<Component /> || outlet}
      />
    );
  }, null as React.ReactElement | null);
};


