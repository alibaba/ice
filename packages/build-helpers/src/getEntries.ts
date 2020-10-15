import * as path from 'path';
import getRoutes from './getRoutes';

// Get entries when exist app.json
export default function(api, target) {
  const routes = getRoutes(api, target);
  return routes.map(route => {
    const dir = path.dirname(route.source);
    const pageName = path.parse(dir).name;
    return {
      path: route.path,
      entryName: pageName.toLowerCase(),
      pageName,
      entryPath: route.source.replace(/\/?pages/, '')
    };
  });
}
