import { readFileSync } from 'fs-extra';

interface ThemesDataType {
  [themeKey: string]: ThemeVarsType
}

interface ThemeVarsType {
  [cssVariable: string]: string
}

/**
 * 生成注入到 entry 第一个元素的代码，注册 css 变量数据与主题变化控制函数
 */
export const injectThemeCode = (themesData: ThemesDataType, defaultTheme: string) => {
  const themesDataStr = Object.keys(themesData).map((themeKey) => {
    const cssVars = themesData[themeKey];
    return `'${themeKey}': ':root {${Object.entries(cssVars).map(([k, v]) => `${k}: ${v}`).join(';')}}'`;
  }).join(',');

  return `
    const themesData = {${themesDataStr}};
    // Append Style fn
    let style;
    function appendStyle(styles) {
      if (style) style.remove();
      style = document.createElement('style');
      style.type = 'text/css';

      if (style.styleSheet) {
        // This is required for IE8 and below.
        style.styleSheet.cssText = styles;
      } else {
        style.appendChild(document.createTextNode(styles));
      }
      // Append style to the head element
      document.getElementsByTagName('head')[0].appendChild(style);
    }
    // Change theme fn
    function handleTheme(currentTheme) {
      // Get current theme
      const theme = themesData[currentTheme];
      if (theme) {
        appendStyle(theme);
      } else {
        console.warn('can not find theme:' + currentTheme);
      }
    }
    ${defaultTheme ? `handleTheme('${defaultTheme}');` : ''}
    window.__handleTheme__ = handleTheme;
  `;
};

/**
 * 获取 css 变量内容
 * 
 * @param {string} filePath 主题文件路径
 */
export const getThemeVars = (filePath: string): ThemeVarsType => {
  const themeVars: ThemeVarsType = {};
  const css = readFileSync(filePath, 'utf8');
  const themeArr = css.match(/\$[\w-]+?:.+?;/g);

  themeArr.forEach((item) => {
    const [key, value] = item.split(':');
    themeVars[key] = value.replace(';', '').trim();
  });

  return themeVars;
};