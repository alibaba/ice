import createTheme from './createTheme';

const themes = { blue: '@alifd/theme-2', purple: '@alifd/theme-3' };
const defaultTheme = themes.blue;

export const { ThemeProvider, withTheme } = createTheme({
  defaultTheme,
  themes,
});
