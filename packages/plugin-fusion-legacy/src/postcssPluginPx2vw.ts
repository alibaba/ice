import * as postcss from 'postcss';

const pxRegex = /"[^"]+"|'[^']+'|url\([^)]+\)|(\d*\.?\d+)px/g;

interface PluginOptions {
  viewportWidth: number;
  viewportUnit: string;
  fontViewportUnit: string;
  unitPrecision: number;
}

const defaults: PluginOptions = {
  viewportWidth: 750,
  viewportUnit: 'vw',
  fontViewportUnit: 'vw',
  unitPrecision: 5,
};

function toFixed(number: number, precision: number): number {
  // eslint-disable-next-line no-restricted-properties
  const multiplier = Math.pow(10, precision + 1);
  const wholeNumber = Math.floor(number * multiplier);

  return (Math.round(wholeNumber / 10) * 10) / multiplier;
}

function createPxReplace(opts: PluginOptions, viewportUnit: string, viewportSize: number) {
  return function(m: string, $1: string) {
    if (!$1) return m;
    const pixels = parseFloat($1);
    const parsedVal = toFixed(
      (pixels / viewportSize) * 100,
      opts.unitPrecision,
    );
    return parsedVal + viewportUnit;
  };
}

function getUnit(prop: string, opts: PluginOptions) {
  return prop.indexOf('font') === -1
    ? opts.viewportUnit
    : opts.fontViewportUnit;
}

export default postcss.plugin('postcss-px2vw', function(options) {
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
