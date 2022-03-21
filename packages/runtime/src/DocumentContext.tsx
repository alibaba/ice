import * as React from 'react';

interface DocumentContext {
  html?: string;
  pageAssets?: any;
  pageConfig?: any;
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