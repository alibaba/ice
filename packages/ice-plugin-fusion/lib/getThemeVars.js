module.exports = (themeFile, themeConfig) => {
  let themeVars = {};
  try {
    // eslint-disable-next-line import/no-dynamic-require
    themeVars = require(themeFile);
  } catch (e) {
    throw (e);
  }
  // make a copy
  const originTheme = {};
  // 过滤颜色相关内容
  Object.keys(themeVars).forEach((themeKey) => {
    let themeValue = themeVars[themeKey];
    // in case of "$icon-xxs": "$s-2"
    if (/^\$(\w|-)+$/.test(themeValue)) {
      themeValue = themeVars[themeValue] || '';
    }
    if (themeValue) {
      originTheme[themeKey.slice(1)] = themeValue;
    }
    // color-white color-black 会用于计算透明度
    if (!/\$color-/.test(themeKey) || ['$color-white', '$color-black'].indexOf(themeKey) > -1) {
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
