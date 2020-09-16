const postcss = require('postcss');

const pxRegex = /"[^"]+"|'[^']+'|url\([^)]+\)|(\d*\.?\d+)px/g;

const defaults = {
  viewportWidth: 750,
  viewportUnit: 'vw',
  fontViewportUnit: 'vw',
  unitPrecision: 5,
};

module.exports = postcss.plugin('postcss-px2vw', function(options) {
  const opts = Object.assign({}, defaults, options);
  return function(root) {
    root.walkDecls(function(decl) {
      if (decl.value.indexOf('px') === -1) return;
      const unit = getUnit(decl.prop, opts);
      decl.value = decl.value.replace(
        pxRegex,
        createPxReplace(opts, unit, opts.viewportWidth),
      );
    });
  };
});

function toFixed(number, precision) {
  // eslint-disable-next-line no-restricted-properties
  const multiplier = Math.pow(10, precision + 1);
  const wholeNumber = Math.floor(number * multiplier);

  return (Math.round(wholeNumber / 10) * 10) / multiplier;
}

function createPxReplace(opts, viewportUnit, viewportSize) {
  return function(m, $1) {
    if (!$1) return m;
    const pixels = parseFloat($1);
    const parsedVal = toFixed(
      (pixels / viewportSize) * 100,
      opts.unitPrecision,
    );
    return parsedVal + viewportUnit;
  };
}

function getUnit(prop, opts) {
  return prop.indexOf('font') === -1
    ? opts.viewportUnit
    : opts.fontViewportUnit;
}
