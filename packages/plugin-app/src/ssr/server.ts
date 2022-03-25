import * as fs from 'fs';
import { matchRoutes } from 'react-router-dom';

export function setupRenderServer(options) {
  const { entry, routeManifest } = options;

  return async (req, res) => {
    // Read the latest routes info.
    const routes = JSON.parse(fs.readFileSync(routeManifest, 'utf8'));

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