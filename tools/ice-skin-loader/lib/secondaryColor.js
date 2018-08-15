const baseSkin = require('@icedesign/skin/variables.js');
const {
  secondaryColorMap,
  secondaryLightDelta,
  secondaryLighterDelta,
} = require('./designTokens');
const { transfromColor } = require('./utils');

/**
 * 副品牌色变量计算
 * @param {Color} secondaryColor
 */
module.exports = function calcSecondaryColor(
  secondaryBaseColor = baseSkin['$color-brand2-6']
) {
  // 主副色
  const lightColor = transfromColor(secondaryBaseColor, secondaryLightDelta);
  // 副副色 (浅)
  const lighterColor = transfromColor(
    secondaryBaseColor,
    secondaryLighterDelta
  );

  const maps = Object.keys(secondaryColorMap)
    .map((key) => `${key}: ${secondaryColorMap[key]};`)
    .join('\n');

  return `
    $color-brand2-3: ${secondaryBaseColor};
    $color-brand2-6: ${lightColor};
    $color-brand7-6: ${lighterColor};
    ${maps}
  `;
};
