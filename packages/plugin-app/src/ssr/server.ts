import path from 'path';

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

    const entryPath = path.resolve(outDir, 'entry.mjs');
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