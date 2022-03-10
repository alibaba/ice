interface Options {
  // TODO: type
  routeManifest: any;
  entry: string;
}

export function setupRenderServer(options: Options) {
  const {
    routeManifest,
    entry,
  } = options;

  return async (req, res) => {
    if (!routeManifest[req.path]) {
      return;
    }

    const serverEntry = await import(entry);

    // TODO: disable cache
    const html = renderDocument(path.join(outDir, 'document.js'));

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.send(html);
  };
}