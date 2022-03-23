import * as React from 'react';
import type { PageConfig } from './types';
interface DocumentContext {
  html?: string;
  entryAssets?: string[];
  pageAssets?: string[];
  pageConfig?: PageConfig;
  publicPath?: string;
}

const Context = React.createContext<DocumentContext>(null);

Context.displayName = 'DocumentContext';

const useDocumentContext = () => {
  const value = React.useContext(Context);
  return value;
};

const DocumentContextProvider = Context.Provider;

export {
  useDocumentContext,
  DocumentContextProvider,
};