import * as React from 'react';
import type { InternalAppContext } from './types.js';

const Context = React.createContext<InternalAppContext | undefined>(undefined);

Context.displayName = 'AppContext';

function useAppContext() {
  const value = React.useContext(Context);
  return value;
}

function useAppData() {
  const value = React.useContext(Context);
  return value.appData;
}

const AppContextProvider = Context.Provider;

export {
  useAppContext,
  useAppData,
  AppContextProvider,
};
