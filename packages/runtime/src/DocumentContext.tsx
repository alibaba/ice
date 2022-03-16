import * as React from 'react';

interface Meta {
  name: string;
  value: string;
}

interface DocumentContext {
  title?: string;
  metas?: Meta[];
  links?: any[];
  scripts?: any[];
  html?: string;
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