import * as path from 'path';
import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import type { ComponentType } from 'react';

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