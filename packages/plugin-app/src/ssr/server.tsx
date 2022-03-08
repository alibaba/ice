import path from 'path';
import renderDocument from './renderDocument.js';

interface Options {
  outDir: string;
  // TODO: type
  routeManifest: any;
}

export function setupRenderServer(options: Options) {
  const {
    outDir,
    routeManifest,
  } = options;

  return async (req, res) => {
    if (!routeManifest[req.path]) {
      return;
    }

    const entryPath = path.resolve(rootDir, 'build/server/entry.mjs');
    const serverEntry = await import(entryPath);

    // TODO: disable cache
    const html = renderDocument(path.join(outDir, 'document.js'));

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.send(html);
  };
}