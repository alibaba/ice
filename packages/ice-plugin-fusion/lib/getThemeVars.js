const fs = require('fs');

module.exports = (themeFile, themeConfig) => {
  const themeVars = {};
  try {
    const themeStr = fs.readFileSync(themeFile, 'utf8');
    const themeArr = themeStr.match(/\$[\w\-]+?:.+?;/g);

    themeArr.forEach((item) => {
      const [key, value] = item.split(':');
      themeVars[key] = value.replace(';', '').trim();
    });
  } catch (e) {
    throw (e);
  }
  // make a copy
  const originTheme = {};

  // 过滤颜色相关内容
  Object.keys(themeVars).forEach((themeKey) => {
    originTheme[themeKey.slice(1)] = themeVars[themeKey];

    const themeValue = themeVars[themeKey];
    if (themeValue && themeValue.indexOf('#') !== 0) {
      delete themeVars[themeKey];
    }
  });

  const scssVars = {};
  const cssVars = {};
  // $color-brand1-1: #000 -> scssVar: {color-brand1-1: var(--color-brand1-1)}  cssVar: {--color-brand1-1: #000}
  Object.keys(themeVars).forEach((themeKey) => {
    scssVars[themeKey.slice(1)] = `var(--${themeKey.slice(1)})`;
    cssVars[themeKey.replace('$', '--')] = themeVars[themeKey];
  });
  // custom-theme-config: #000 -> scssVar: {custom-theme-config: var(--color-brand1-1)} cssVar: {--custom-theme-config: #000}
  Object.keys(themeConfig).forEach((themeKey) => {
    scssVars[themeKey] = `var(--${themeKey})`;
    cssVars[`--${themeKey}`] = themeConfig[themeKey];
  });

  return {
    originTheme,
    scssVars,
    cssVars,
  };
};
