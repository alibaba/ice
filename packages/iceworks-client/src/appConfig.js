export default window.iceworksConfig || {};

const PLACEHOLDER_IMG = '//img.alicdn.com/tfs/TB1lCcKc8Kw3KVjSZFOXXarDVXa-350-200.png';
const THEMES = {
  dark: {
    themePackage: '@alifd/theme-3',
    termTheme: {
      foreground: '#fff',
      background: '#333646',
    },
  },
  light: {
    themePackage: '@alifd/theme-iceworks-light',
    termTheme: {
      foreground: '#333',
      background: '#f7f8fa',
    },
  },
};

export {
  THEMES,
  PLACEHOLDER_IMG,
};
