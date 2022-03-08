import path from 'path';
import { createRequire } from 'module';
import React from 'react';
import type { ComponentType } from 'react';
import ReactDOMServer from 'react-dom/server.js';

const require = createRequire(import.meta.url);

const renderDocument = (documentPath: string): string => {
  const Document = require(documentPath).default as ComponentType;

  return ReactDOMServer.renderToString(<Document />);
};

export default renderDocument;