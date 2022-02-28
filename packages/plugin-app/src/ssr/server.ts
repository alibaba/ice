import renderDocument from './renderDocument';

export function setupRenderServer(options: any) {
  const {
    rootDir,
    routeManifest,
  } = options;

  return (req, res) => {
    if (!routeManifest[req.path]) {
      return;
    }

    // TODO: disable cache
    const html = renderDocument({ rootDir, documentPath: 'build/document.js' });

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.send(html);
  };
}