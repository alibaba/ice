import * as React from 'react';

const Context = React.createContext({});

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