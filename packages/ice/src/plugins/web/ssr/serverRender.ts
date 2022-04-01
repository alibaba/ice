import * as fs from 'fs';
import { matchRoutes } from '@ice/runtime';
import type { Request, Response } from 'express';

interface Options {
  routeManifest: string;
  serverCompiler: () => Promise<string>;
}

export function setupRenderServer(options: Options) {
  const {
    routeManifest,
    serverCompiler,
  } = options;

  return async (req: Request, res: Response) => {
    // Read the latest routes info.
    const routes = JSON.parse(fs.readFileSync(routeManifest, 'utf8'));

    // If not match pages routes, hand over to webpack dev server for processing
    let matches = matchRoutes(routes, req.path);
    if (matches.length === 0) return;

    const entry = await serverCompiler();
    const serverEntry = await import(entry);
    const html = await serverEntry.render({
      req,
      res,
    });

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.send(html);
  };
}
