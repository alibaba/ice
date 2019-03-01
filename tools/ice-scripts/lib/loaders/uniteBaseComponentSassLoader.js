'use strict';
// 修改 scss 文件, 映射 scss 中对 @ali/ice/** 的引用
// 对于js文件可以使用webpack的resolve.alias配置
// 对于scss来说sass-loader没有支持或提供这样的功能, 所以前置本 loader 来进行转换

// @ali/ice 包中的文件与 @alife/next 包中文件的映射关系

function convert(source) {
  // 仅替换~@ali/ice -> @alife/next

  // @ali/ice -> @icedesign/base
  const ICE_SCSS_MAPPING = {
    '/base.scss': '/lib/core/index.scss',
    '/global.scss': '/reset.scss',
  };
  source.replace(/\~@ali\/ice([^'|^"]*)/g, function(str, $1) {
    return '~icedesign/base' + (ICE_SCSS_MAPPING[$1] || $1);
  });

  // @alife/next -> @icedesign/base
  const NEXT_SCSS_MAPPING = {
    '/variables.scss': '/lib/core/index.scss'
  };
  source.replace(/\~@alife\/next([^'|^"]*)/g, function(str, $1) {
    return '~icedesign/base' + (NEXT_SCSS_MAPPING[$1] || $1);
  });

  return source;
}

module.exports = function(source) {
  const callback = this.async();

  if (this.cacheable) {
    this.cacheable();
  }

  const convertedSource = convert(source);

  callback(null, convertedSource);
};
