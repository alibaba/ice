import { useContext } from 'react';
import { ThemeContext } from '@components/ThemeProvider';
import { THEMES } from '@src/appConfig';

export default function useTermTheme() {
  const { theme } = useContext(ThemeContext);
  const themeValue = theme.indexOf('light') > -1 ? 'light' : 'dark';

  return {
    themeValue,
    termTheme: THEMES[themeValue].termTheme,
  };
}
