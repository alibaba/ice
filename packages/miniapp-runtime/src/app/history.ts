import type { History } from 'history';
import { createMiniAppHistory } from 'miniapp-history';


interface IRoute {
  path: string;
  source: string;
}

let routerHistory: History;
let miniappRoutes: Array<IRoute> = [];

function generateRoutes(routes: Array<string>): Array<IRoute> {
  return routes.map(route => {
    const removedSlashRoute = route.replace(/^\//, ''); // Remove / at the beginning of the route
    return {
      path: removedSlashRoute === 'index' ? '/' : `/${removedSlashRoute}`.replace(/\/index$/, ''),
      source: `pages/${removedSlashRoute}`,
    };
  });
}

function setHistory(routes: Array<string>) {
  miniappRoutes = generateRoutes(routes);
  routerHistory = createMiniAppHistory(miniappRoutes);
}

function getMiniappRoutes() {
  return miniappRoutes;
}

export {
  routerHistory,
  setHistory,
  getMiniappRoutes,
};
