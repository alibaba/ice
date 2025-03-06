import * as React from 'react';
import type { AppContext } from './types.js';

const Context = React.createContext<AppContext | undefined>(undefined);

Context.displayName = 'AppContext';

function useAppContext() {
  const value = React.useContext(Context);
  return value;
}

function useAppData<T = any>(): T {
  const value = React.useContext(Context);
  return value.appData;
}

const AppContextProvider = Context.Provider;

export {
  useAppContext,
  useAppData,
  AppContextProvider,
};
