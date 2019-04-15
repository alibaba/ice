const {
  primaryColorDeltas,
  secondaryLightDelta,
  secondaryLighterDelta,
} = require('./lib/designTokens');
const transfromColor = require('./lib/transfromColor');

/**
 * 主品牌色变量计算
 * @param {color} primaryColor
 * @example
 * [
 * '#ddeaff',
 * '#f7faff',
 * '#c9ddff',
 * '#9bc3ff',
 * '#86b4fe',
 * '#3080fe',
 * '#54a0fd',
 * '#327dff',
 * '#0b59d9',
 * '#0141ee'
 * ]
 */
function calcPrimaryColors(primaryBaseColor = '#3080FE') {
  const primaryColors = new Array(10); // pre define 10 colors
  for (let i = 0; i < primaryColorDeltas.length; i++) {
    primaryColors[i] = transfromColor(primaryBaseColor, primaryColorDeltas[i]);
  }

  return primaryColors;
}

/**
 * 次品牌色变量计算
 * @param {color} secondaryBaseColor
 * @example
 * [ '#FFC107', '#ffe00e', '#ffe114' ]
 */
function calcSecondaryColor(secondaryBaseColor = '#FFC107') {
  // 主副色
  const lightColor = transfromColor(secondaryBaseColor, secondaryLightDelta);
  // 副副色 (浅)
  const lighterColor = transfromColor(
    secondaryBaseColor,
    secondaryLighterDelta
  );

  return [secondaryBaseColor, lightColor, lighterColor];
}

module.exports = { calcPrimaryColors, calcSecondaryColor };
