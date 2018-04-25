const tinycolor = require('tinycolor2');
/**
 * 根据差值计算颜色
 * @param {Color} color
 * @param {object including h,s,l} delta
 */
exports.transfromColor = (color, delta) => {
  const { h, s, l } = delta;
  let resultColor = tinycolor(color);

  if (h !== 0) {
    resultColor = resultColor.spin(h);
  }

  if (s > 0) {
    resultColor = resultColor.saturate(s * 100);
  } else if (s < 0) {
    resultColor = resultColor.desaturate(-s * 100);
  }

  if (l > 0) {
    resultColor = resultColor.lighten(l * 100);
  } else if (l < 0) {
    resultColor = resultColor.darken(-l * 100);
  }

  return resultColor.toHexString();
};
