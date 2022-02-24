
import * as path from 'path';
import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';

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
    const document = path.resolve(rootDir, 'build/document.js');
    const Document = require(document).default;

    const html = ReactDOMServer.renderToString(<Document />);

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.send(html);
  };
}