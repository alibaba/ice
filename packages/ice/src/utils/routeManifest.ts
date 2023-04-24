import type { NestedRouteManifest, DefineExtraRoutes } from '@ice/route-manifest';
import getRoutePath, { getRoutesFile } from './getRoutePaths.js';

export default class RouteManifest {
  private routeManifest: NestedRouteManifest[];
  private routesDefinitions: DefineExtraRoutes[];

  constructor() {
    this.routeManifest = null;
    this.routesDefinitions = [];
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

  getRoutesFile() {
    return getRoutesFile(this.getNestedRoute());
  }

  public addRoutesDefinition(defineRoutes: DefineExtraRoutes) {
    this.routesDefinitions.push(defineRoutes);
  }

  public getRoutesDefinitions() {
    return this.routesDefinitions;
  }
}
