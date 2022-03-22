import * as React from 'react';
import type { PageConfig, PageAssets } from './types';
interface DocumentContext {
  html?: string;
  pageAssets?: PageAssets;
  pageConfig?: PageConfig;
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