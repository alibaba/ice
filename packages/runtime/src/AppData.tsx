import * as React from 'react';
import type { AppData } from './types';

const Context = React.createContext<AppData | undefined>(undefined);

Context.displayName = 'AppDataContext';

function useAppData <T = AppData>(): T {
  const value = React.useContext(Context);
  return value;
}

const AppDataProvider = Context.Provider;

export {
  useAppData,
  AppDataProvider,
};