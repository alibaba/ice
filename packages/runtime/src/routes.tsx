import React from 'react';
import type { Location } from 'history';
import type { RouteObject } from 'react-router-dom';
import { matchRoutes as originMatchRoutes } from 'react-router-dom';
import PageWrapper from './PageWrapper.js';
import type { RouteItem, RouteModules, PageWrapper as IPageWrapper, RouteMatch } from './types';
import { useAppContext } from './AppContext.js';

export async function loadRouteModule(route: RouteItem, routeModulesCache: RouteModules) {
  const { id, load } = route;
  if (id in routeModulesCache) {
    return routeModulesCache[id];
  }

  try {
    const routeModule = await load();
    routeModulesCache[id] = routeModule;
    return routeModule;
  } catch (error) {
    console.error(error);
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  }
}

export async function loadRouteModules(routes: RouteItem[]) {
  const routeModules: RouteModules = {};

  async function recurRouteModules(routes: RouteItem[], routeModules: RouteModules) {
    for (const route of routes) {
      await loadRouteModule(route, routeModules);
      if (route.children) {
        await recurRouteModules(route.children, routeModules);
      }
    }
  }
  await recurRouteModules(routes, routeModules);
  return routeModules;
}

/**
* get data for the matched page
* @param requestContext
* @param matches
* @returns
*/
export async function loadPageData(matches, routeModules, requestContext) {
  // use the last matched route as the page entry
  const last = matches.length - 1;
  const { route } = matches[last];
  const { id } = route;

  const routeModule = routeModules[id];

  const { getInitialData, getPageConfig } = routeModule;
  let initialData;
  let pageConfig = {};

  if (getInitialData) {
    initialData = await getInitialData(requestContext);
  }

  if (getPageConfig) {
    pageConfig = getPageConfig({
      initialData,
    });
  }

  return {
    initialData,
    pageConfig,
  };
}

/**
 * Create routes which will be consumed by react-router-dom
 */
export function createRoutes(routes: RouteItem[], routeModules: RouteModules, PageWrappers?: IPageWrapper<any>[]) {
  return routes.map((routeItem: RouteItem) => {
    let { path, children, index, id, element, ...rest } = routeItem;
    const idParts = id.split('/');
    const isLayout = idParts[idParts.length - 1] === 'layout';
    // Layout components don't need to wrap the Provider(for example: AuthProvider)
    element = isLayout ? (
      <RouteComponent id={id} />
    ) : (
      <PageWrapper
        PageComponent={(...props) => <RouteComponent id={id} {...props} />}
        PageWrappers={PageWrappers}
      />
    );
    const route: RouteItem = {
      path,
      element,
      index,
      id,
      ...rest,
    };
    if (children) {
      route.children = createRoutes(children, routeModules, PageWrappers);
    }

    return route;
  });
}

function RouteComponent({ id, ...props }: { id: string }) {
  const { routeModules } = useAppContext();
  // get current route component from latest routeModules
  const { default: Component } = routeModules[id];
  if (process.env.NODE_ENV === 'development') {
    if (!Component) {
      throw new Error(
        `Route "${id}" has no component! Please go add a \`default\` export in the route module file.\n` +
          'If you were trying to navigate or submit to a resource route, use `<a>` instead of `<Link>` or `<Form reloadDocument>`.',
      );
    }
  }
  return <Component {...props} />;
}

export function matchRoutes(
  routes: RouteItem[],
  location: Partial<Location> | string,
  basename?: string,
): RouteMatch[] {
  let matches = originMatchRoutes(routes as unknown as RouteObject[], location, basename);
  if (!matches) return [];

  return matches.map(({ params, pathname, pathnameBase, route }) => ({
    params,
    pathname,
    route: route as unknown as RouteItem,
    pathnameBase,
  }));
}