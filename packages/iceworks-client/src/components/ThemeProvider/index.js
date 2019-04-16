import createTheme from './createTheme';

export const THEMES = { blue: '@alifd/theme-2', purple: '@alifd/theme-3' };

export const { ThemeProvider, withTheme } = createTheme(THEMES.blue);

export { createTheme };
