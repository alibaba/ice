import * as React from 'react';
import type { RouteItem, RouteMatch, RouteData } from './types';

interface DocumentContext {
  html?: string;
  matches?: RouteMatch<RouteItem>[];
  routeData?: RouteData;
  assets?: any;
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