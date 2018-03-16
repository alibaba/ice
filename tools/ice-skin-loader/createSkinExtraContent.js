const path = require('path');
const fs = require('fs');
const baseSkin = require('@icedesign/skin/variables.js');
const tinycolor = require('tinycolor2');
const _kebab = require('kebab-case');

function kebab(str) {
  return _kebab(str).replace(/^\-/, '');
}

const pDelta = [
  {
    h: -0.36246534825751553,
    s: -0.01918060638619346,
    l: 0.3411764705882353,
  },
  { h: -0.05191458199037887, s: 0, l: 0.3915032679738562 },
  { h: 0.16640986132510704, s: 0, l: 0.3006535947712418 },
  {
    h: -0.5714285714286215,
    s: 0.03777375929274671,
    l: 0.2111111111111111,
  },
  {
    h: 0.0357002916975091,
    s: -0.013050416531429182,
    l: 0.16732026143790849,
  },
  { h: 0, s: 0, l: 0 },
  {
    h: -3.6745234825255793,
    s: -0.007947717820399462,
    l: 0.06993464052287579,
  },
  {
    h: 1.4481685978691796,
    s: 0.0734880450070322,
    l: 0.005882352941176505,
  },
  {
    h: 0.560458272778682,
    s: -0.08595629619978884,
    l: -0.14509803921568626,
  },
  {
    h: 7.103396603396608,
    s: 0.0021812200529213975,
    l: -0.122875816993464,
  },
];

/**
 * Get Curren Work Directory's package.json
 */
function getPackageContent() {
  const cwd = process.cwd();
  return require(path.join(cwd, 'package.json'));
}

/**
 * 获取 sass 变量字符串映射
 * @param {String} key 用户输入的 key
 * @param {String} value 用户输入的 value
 * @return {String} scss stynax string
 */
function getVariableMappingString(key, value) {
  // 输入是小驼峰, scss 变量需要的是 kebab-case
  key = kebab(key);

  switch (key) {
    case 'primary-color':
      return calcPrimaryColors(value);
    default:
      return `$${key}: ${value};`;
  }
}

/**
 * 主品牌色计算
 * @param {color} primaryColor
 */
function calcPrimaryColors(primaryColor = baseSkin['$color-brand1-6']) {
  const primaryColors = new Array(10); // pre define 10 colors
  for (let i = 0; i < primaryColors.length; i++) {
    primaryColors[i] = tinycolor(primaryColor);
    primaryColors[i].spin(pDelta[i].h);

    if (pDelta[i].s < 0) {
      primaryColors[i].desaturate(Math.abs(pDelta[i].s * 100));
    } else if (pDelta[i].s > 0) {
      primaryColors[i].saturate(pDelta[i].s * 100);
    }

    if (pDelta[i].l < 0) {
      primaryColors[i].darken(Math.abs(pDelta[i].l * 100));
    } else if (pDelta[i].l > 0) {
      primaryColors[i].lighten(pDelta[i].l * 100);
    }

    primaryColors[i] = primaryColors[i].toHexString();
  }

  // some functional color patch
  const primaryColorPatch = [
    '$btn-primary-bg-hover: $color-brand1-9;',
    '$btn-text-normal-color: $color-brand1-6;',
    '$btn-text-normal-color-hover: $color-brand1-7;',
    '$btn-text-primary-color: $color-brand1-5;',
    '$btn-text-primary-color-hover: $color-brand1-6;',
    '$color-notice-1: $color-brand1-1;',
    '$color-notice-2: $color-brand1-6;',
    '$color-notice-3: $color-brand1-9;',
    '$color-link-1: $color-brand1-4;',
    '$color-link-2: $color-brand1-5;',
    '$color-link-3: $color-brand1-7;',
    '$color-other-1: $color-brand1-1;',
    '$color-other-1: $color-brand1-5;',
    '$color-other-1: $color-brand1-9;',
    `::selection {
      background-color: $color-brand1-4;
    }`,
  ];

  return primaryColors
    .map((color, idx) => {
      // $color-brand-1-1: #ffffff;
      return `$color-brand1-${idx + 1}: ${color};`;
    })
    .concat(primaryColorPatch)
    .join('\n');
}

/**
 * Get scss variables string for skin
 */
function createSkinExtraContent() {
  try {
    const pkg = getPackageContent();
    const themeConfig = Object.assign({}, pkg.themeConfig);
    delete themeConfig.theme; // no need of theme

    const appendVariables = Object.keys(themeConfig)
      .map((key) => {
        const value = themeConfig[key];
        return getVariableMappingString(key, value);
      })
      .join('\n');
    return appendVariables;
  } catch (err) {
    console.log(err);
    return '';
  }
}

module.exports = createSkinExtraContent;
