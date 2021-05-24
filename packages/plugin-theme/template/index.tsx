import React, { createContext, useState, useEffect, useContext } from 'react';
import type { ContextType, Props, Themes } from './types';

const initialTheme = 'default';
const Context = createContext<ContextType>(null);

const ThemeProvider: React.FC<Props> = ({ children, defaultThemes = initialTheme }) => {
  const share = useState<Themes>(defaultThemes);
  const theme = share[0];

  useEffect(() => {
    // TODO: listen theme changed and handle css var
  }, [theme]);

  return (
    <Context.Provider value={share}>{children}</Context.Provider>
  );
};

const useTheme = () => {
  const value = useContext(Context);
  if (value === null) throw new Error('Please add ThemeProvider');

  return value;
};

export {
  useTheme,
  ThemeProvider,
  Themes
};