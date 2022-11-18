import * as React from 'react';

const Context = React.createContext<any>(undefined);

Context.displayName = 'AppContext';

function useDataContext() {
  const value = React.useContext(Context);
  return value;
}

const DataContextProvider = Context.Provider;

export {
  useDataContext,
  DataContextProvider,
};
