
// 修改 js 文件
// 为 next 组件添加 style.js

const loaderUtils = require('loader-utils');

function convert(source, stylePath) {
  const isStrictMode = /^[\'|\"]use strict['|"]/.test(source.trimLeft());

  source = `require('${stylePath}');\n${source}`;

  if (isStrictMode) {
    source = `"use strict";\n${source}`;
  }

  return source;
}

module.exports = function NEXT_ADD_STYLE_LOADER(source) {
  const callback = this.async();

  if (this.cacheable) {
    this.cacheable();
  }

  const query = loaderUtils.parseQuery(this.query);
  if (query && query.stylePath) {
    // 兼容 windows
    callback(null, convert(source, query.stylePath.replace(/\\/g, '/')));
  } else {
    callback(null, source);
  }
};
