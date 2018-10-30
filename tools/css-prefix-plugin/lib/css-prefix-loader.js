const loaderUtils = require('loader-utils');

function convert(source, options) {
  const variableStyleRegexp = /@import '.\/scss\/variable'/;

  if (variableStyleRegexp.test(source)) {
    const prefix = `$css-prefix: '${options.prefix}'`;
    const variableStyle = "@import './scss/variable.scss'";
    const newVariableStyle = `${prefix};\n${variableStyle}`;

    source = source.replace(variableStyleRegexp, newVariableStyle);
  }

  return source;
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
