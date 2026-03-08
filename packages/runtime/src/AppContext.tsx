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

// TODO: React 19 支持直接使用 <Context> 替代 <Context.Provider>，当不再需要兼容 React 18 时可简化
const AppContextProvider = Context.Provider;

export {
  useAppContext,
  useAppData,
  AppContextProvider,
};
