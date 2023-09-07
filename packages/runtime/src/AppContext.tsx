import * as React from 'react';
import type { AppContext } from './types.js';

// @ts-ignore
const Context = React.createServerContext ? React.createServerContext(undefined) : React.createContext(undefined);

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
