import React from 'react';
import RouteWrapper from './RouteWrapper.js';
import type { RouteItem, RouteModules, PageWrapper } from './types';
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
 * Create routes which will be consumed by react-router-dom
 */
export function createRoutes(routes: RouteItem[], routeModules: RouteModules, PageWrappers?: PageWrapper<any>[]) {
  return routes.map((routeItem: RouteItem) => {
    let { path, children, index, id, element, ...rest } = routeItem;
    const idParts = id.split('/');
    const isLayout = idParts[idParts.length - 1] === 'layout';
    // Layout components don't need to wrap the Provider(for example: AuthProvider)
    element = isLayout ? (
      <RouteComponent id={id} />
    ) : (
      <RouteWrapper
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
