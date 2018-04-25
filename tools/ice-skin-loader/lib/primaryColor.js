const baseSkin = require('@icedesign/skin/variables.js');
const { primaryColorDeltas, primaryColorMap } = require('./designTokens');
const { transfromColor } = require('./utils');

/**
 * 主品牌色变量计算
 * @param {color} primaryColor
 */
function calcPrimaryColors(primaryBaseColor = baseSkin['$color-brand1-6']) {
  // 1-6 为标准色
  const primaryColors = new Array(10); // pre define 10 colors
  for (let i = 0; i < primaryColorDeltas.length; i++) {
    primaryColors[i] = transfromColor(primaryBaseColor, primaryColorDeltas[i]);
  }

  // some functional color patch
  const primaryColorPatch = Object.keys(primaryColorMap).map(
    (key) => `${key}: ${primaryColorMap[key]};`
  );

  return primaryColors
    .map((color, idx) => {
      // $color-brand-1-1: #abcdef;
      return `$color-brand1-${idx + 1}: ${color};`;
    })
    .concat(primaryColorPatch)
    .join('\n');
}

module.exports = calcPrimaryColors;
