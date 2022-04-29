import { matchRoutes as originMatchRoutes } from 'react-router';

const matchRoutes: typeof originMatchRoutes = function (routes, location) {
  let matches = originMatchRoutes(routes, location);
  if (!matches) return [];

  return matches.map(({ params, pathname, pathnameBase, route }) => ({
    params,
    pathname,
    route,
    pathnameBase,
  }));
};

export default matchRoutes;