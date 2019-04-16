import React from 'react';
import deepmerge from 'deepmerge';
import createThemeProvider from './createThemeProvider';
import createWithTheme from './createWithTheme';

export default (defaultTheme) => {
  const ThemeContext = React.createContext(defaultTheme);

  const ThemeProvider = createThemeProvider(defaultTheme, ThemeContext);

  const withTheme = createWithTheme(ThemeContext);

  const useTheme = (overrides) => {
    const theme = React.useContext(ThemeContext);
    const newTheme =
      theme && overrides ? deepmerge(theme, overrides) : theme || overrides;
    const result = React.useMemo(() => newTheme, [theme, overrides]);

    return result;
  };

  return {
    ThemeProvider,
    withTheme,
    useTheme,
  };
};
