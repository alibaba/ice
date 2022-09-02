import type { RouteMatch } from '@ice/types';

/**
 * Get the current route path exclude the basename.
 */
export default function getCurrentRoutePath(matches: RouteMatch[]): string | undefined {
  return matches.length && matches[matches.length - 1].pathname;
}
