import path from 'path';

export function setupRenderServer(options: any) {
  const {
    rootDir,
    routeManifest,
  } = options;

  return async (req, res) => {
    if (!routeManifest[req.path]) {
      return;
    }

    const entryPath = path.resolve(rootDir, 'build/server/entry.mjs');
    const serverEntry = await import(entryPath);

    // TODO: disable cache
    const html = await serverEntry.render({
      req,
      res,
    });

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.send(html);
  };
}