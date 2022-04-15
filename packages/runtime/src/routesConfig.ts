import type { RouteMatch, RoutesConfig } from './types';

export function getMeta(matches: RouteMatch[], routesConfig: RoutesConfig) {
  return getMergedValue('meta', matches, routesConfig) || [];
}

export function getLinks(matches: RouteMatch[], routesConfig: RoutesConfig) {
  return getMergedValue('links', matches, routesConfig) || [];
}

export function getScripts(matches: RouteMatch[], routesConfig: RoutesConfig) {
  return getMergedValue('scripts', matches, routesConfig) || [];
}

export function getTitle(matches: RouteMatch[], routesConfig: RoutesConfig): string {
  return getMergedValue('title', matches, routesConfig);
}

/**
 * merge value for each matched route
 */
function getMergedValue(key: string, matches: RouteMatch[], routesConfig: RoutesConfig) {
  let result;

  for (let match of matches) {
    const routeId = match.route.id;
    const data = routesConfig[routeId];
    const value = data?.[key];

    if (Array.isArray(value)) {
      // merge array
      result = result ? result.concat(value) : value;
    } else if (value) {
      // overwrite
      result = value;
    }
  }

  return result;
}