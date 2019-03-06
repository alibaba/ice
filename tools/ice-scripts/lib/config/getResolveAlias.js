const path = require('path');
const colors = require('chalk');

module.exports = function getResolveAlias(buildConfig) {
  let alias = {};

  if (buildConfig.uniteBaseComponent) {
    // 统一基础组件包：@ali/ice, @alife/next, @icedesign/base -> @icedesign/base
    console.log(colors.green('Info:'), 'uniteBaseComponent 开启，基础包统一到 @icedesign/base');
    alias = {
      '@ali/ice/global.scss': '@icedesign/base/reset.scss',
      '@ali/ice/lib/row$': '@icedeisign/base/lib/_components/@alife/next-grid/lib/row.js',
      '@ali/ice/lib/col$': '@icedeisign/base/lib/_components/@alife/next-grid/lib/col.js',

      // sass 里 @import '~xxx'
      '@ali/ice/base.scss': '@icedesign/base/lib/core/index.scss',

      '@ali/ice': '@icedesign/base',

      '@alife/next/lib/_components/@alife/next-core/lib/index.scss': '@icedesign/base/reset.scss',
      '@alife/next/reset.scss': '@icedesign/base/reset.scss',

      // sass 里 @import '~xxx'
      '@alife/next/variables.scss': '@icedesign/base/lib/core/index.scss',
      '@alife/next/lib/core/index.scss': '@icedesign/base/lib/core/index.scss',

      '@alife/next': '@icedesign/base'
    };
  }

  return alias;
};
