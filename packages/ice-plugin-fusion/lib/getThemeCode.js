module.exports = (themesCssVars, defaultTheme) => {
  const themesDataStr = Object.keys(themesCssVars).map((themeKey) => {
    const cssVars = themesCssVars[themeKey];
    const ruleStr = Object.entries(cssVars).map(([k, v]) => `${k}: ${v}`).join(';');
    return `'${themeKey}': '{${ruleStr}}'`;
  }).join(',');
  return `
const themesData = {
  ${themesDataStr}
};
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
function changeTheme(currentTheme) {
  // Get current theme
  const theme = themesData[currentTheme];

  // Declare the style element
  const styles = \`:root \${theme}\`;

  // Function call
  appendStyle(styles);
}
${defaultTheme ? `changeTheme('${defaultTheme}');` : ''}
window.__changeTheme__ = changeTheme;`;
};
