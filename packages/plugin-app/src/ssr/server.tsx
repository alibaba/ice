import { matchRoutes } from 'react-router-dom';
import { formatNestedRouteManifest, generateRouteManifest } from '@ice/route-manifest';

export function setupRenderServer(options) {
  const { rootDir, entry } = options;

  const routeManifests = generateRouteManifest(rootDir);
  const routes = formatNestedRouteManifest(routeManifests);

  return async (req, res) => {
    let matches = matchRoutes(routes, req.path);
    if (!matches) return;

    const serverEntry = await import(entry);

    // TODO: disable cache
    const html = renderDocument(path.join(outDir, 'document.js'));

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.send(html);
  };
}