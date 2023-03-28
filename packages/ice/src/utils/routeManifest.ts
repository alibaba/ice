import type { NestedRouteManifest } from '@ice/route-manifest';
import getRoutePath from './getRoutePaths.js';

export default class RouteManifest {
  private routeManifest: NestedRouteManifest[];

  constructor() {
    this.routeManifest = null;
  }

  getNestedRoute() {
    if (this.routeManifest === null) {
      throw new Error('routeManifest is not initialized, call API in hooks.');
    }
    return this.routeManifest;
  }

  setRoutes(routes: NestedRouteManifest[]) {
    this.routeManifest = routes;
  }

  getFlattenRoute() {
    return getRoutePath(this.getNestedRoute());
  }
}