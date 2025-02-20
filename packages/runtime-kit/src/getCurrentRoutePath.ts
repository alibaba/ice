import type { RouteMatch } from './types.js';

/**
 * Get the current route path exclude the basename.
 */
export function getCurrentRoutePath(matches: RouteMatch[]): string | undefined {
  return matches.length && matches[matches.length - 1].pathname;
}
