import { useContext } from 'react';
import { ThemeContext } from '@components/ThemeProvider';
import { THEMES } from '@src/appConfig';

export default function useLoadingTheme() {
  const { theme } = useContext(ThemeContext);
  const themeValue = theme.indexOf('dark') > -1 ? 'dark' : 'light';

  return {
    themeValue,
    loadingTheme: THEMES[themeValue].loadingTheme,
  };
}
