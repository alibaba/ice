// append a require
// param: mod
const loaderUtils = require('loader-utils');

function convert(source, mod) {
  const isStrictMode = /^['|"]use strict['|"]/.test(source.trimLeft());

  source = `require('${mod}');\n${source}`;

  // if strict mode, re declear and enable it
  if (isStrictMode) {
    source = `"use strict";\n${source}`;
  }

  return source;
}

module.exports = function webpackLoaderRequire(source) {
  const callback = this.async();

  if (this.cacheable) {
    this.cacheable();
  }

  const query = loaderUtils.parseQuery(this.query);
  if (query && query.mod) {
    // 兼容 windows
    callback(null, convert(source, query.mod.replace(/\\/g, '/')));
  } else {
    callback(null, source);
  }
};
