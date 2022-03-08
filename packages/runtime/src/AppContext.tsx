import * as React from 'react';
import type { AppContext } from './types';

const Context = React.createContext<AppContext>(null);

Context.displayName = 'AppContext';

const useAppContext = () => {
  const value = React.useContext(Context);
  return value;
};

const AppContextProvider = Context.Provider;

export {
  useAppContext,
  AppContextProvider,
};