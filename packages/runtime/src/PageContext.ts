import * as React from 'react';
import type { PageData } from './types';

const Context = React.createContext<PageData>({});

Context.displayName = 'PageContext';

const usePageContext = () => {
  const value = React.useContext(Context);
  return value;
};

const PageContextProvider = Context.Provider;

export {
  usePageContext,
  PageContextProvider,
};