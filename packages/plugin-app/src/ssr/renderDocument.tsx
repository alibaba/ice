import path from 'path';
import { createRequire } from 'module';
import React from 'react';
import type { ComponentType } from 'react';
import ReactDOMServer from 'react-dom/server.js';

const require = createRequire(import.meta.url);

interface Options {
  rootDir: string;
  documentPath: string;
}

const renderDocument = (options: Options): string => {
  const { rootDir, documentPath } = options;
  const document = path.resolve(rootDir, documentPath);
  const Document = require(document).default as ComponentType;

  return ReactDOMServer.renderToString(<Document />);
};

export default renderDocument;