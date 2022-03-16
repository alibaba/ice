import { matchRoutes } from 'react-router-dom';
import { formatNestedRouteManifest, generateRouteManifest } from '@ice/route-manifest';

export function setupRenderServer(options) {
  const { rootDir, entry } = options;

  // TODO: get route manifest from context
  const routeManifests = generateRouteManifest(rootDir);
  const routes = formatNestedRouteManifest(routeManifests);

  return async (req, res) => {
    // If not match pages routes, hand over to webpack dev server for processing
    let matches = matchRoutes(routes, req.path);
    if (!matches) return;

    const serverEntry = await import(entry);

    // TODO: disable cache
    const html = await serverEntry.render({
      req,
      res,
    });

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.send(html);
  };
}