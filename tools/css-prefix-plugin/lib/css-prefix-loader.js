const loaderUtils = require('loader-utils');

function convert(source, options) {
  const prefix = `$css-prefix: '${options.prefix}'`;

  return `${prefix};\n${source}`;
}

module.exports = function cssPrefixLoader(source) {
  if (this.cacheable) {
    this.cacheable();
  }

  const options = loaderUtils.getOptions(this);
  const callback = this.async();

  if (options && options.prefix) {
    callback(null, convert(source, options));
  } else {
    callback(null, source);
  }
};
