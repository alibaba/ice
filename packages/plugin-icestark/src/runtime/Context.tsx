import { createContext, useContext } from 'react';

export const FrameworkContext = createContext({});

export const useFrameworkContext = <T extends object>(): T => {
  return useContext(FrameworkContext) as T;
};
