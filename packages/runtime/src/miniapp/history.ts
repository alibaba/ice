import type { History } from 'history';
import { createMiniAppHistory } from 'miniapp-history';

let routerHistory: History | null = null;

interface IRoute {
  path: string;
  source: string;
}

function generateRoutes(routes: Array<string>): Array<IRoute> {
  return routes.map(route => {
    return {
      path: route === 'index' ? '/' : `/${route}`.replace(/index$/, ''),
      source: `pages/${route}`,
    };
  });
}

function setHistory(routes: Array<string>) {
  routerHistory = createMiniAppHistory(generateRoutes(routes));
}

export {
  routerHistory,
  setHistory,
};
