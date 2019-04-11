const path = require('path');

const paths = require('./paths');
const pkgData = require('./packageJson');
const log = require('../utils/log');

module.exports = function getResolveAlias(buildConfig) {
  let alias = {};

  // uniteBaseComponent: true => @icedesign/base
  // uniteBaseComponent: "@alife/next" => @alife/next
  const uniteBaseComponent = buildConfig.uniteBaseComponent && (
    typeof buildConfig.uniteBaseComponent === 'string' ? buildConfig.uniteBaseComponent : '@icedesign/base'
  );

  if (uniteBaseComponent) {
    // 统一基础组件包：@ali/ice, @alife/next, @icedesign/base -> @icedesign/base
    log.info('uniteBaseComponent 开启，基础包统一到：', uniteBaseComponent);

    alias = {
      // @ali/ice -> uniteBaseComponent
      '@ali/ice/global.scss': `${uniteBaseComponent}/reset.scss`,
      '@ali/ice/lib/row$': `${uniteBaseComponent}/lib/_components/@alife/next-grid/lib/row.js`,
      '@ali/ice/lib/col$': `${uniteBaseComponent}/lib/_components/@alife/next-grid/lib/col.js`,
      // sass 里 @import '~xxx'
      '@ali/ice/base.scss': `${uniteBaseComponent}/lib/core/index.scss`,
      '@ali/ice': uniteBaseComponent,

      // @alife/next -> uniteBaseComponent
      '@alife/next/lib/_components/@alife/next-core/lib/index.scss': `${uniteBaseComponent}/reset.scss`,
      '@alife/next/reset.scss': `${uniteBaseComponent}/reset.scss`,
      // sass 里 @import '~xxx'
      '@alife/next/variables.scss': `${uniteBaseComponent}/variables.scss`,
      '@alife/next/lib/core/index.scss': `${uniteBaseComponent}/lib/core/index.scss`,
      '@alife/next': `${uniteBaseComponent}`,

      // @icedesign/base -> uniteBaseComponent
      '@icedesign/base/reset.scss': `${uniteBaseComponent}/reset.scss`,
      // sass 里 @import '~xxx'
      '@icedesign/base/variables.scss': `${uniteBaseComponent}/variables.scss`,
      '@icedesign/base/lib/core/index.scss': `${uniteBaseComponent}/lib/core/index.scss`,
      '@icedesign/base': `${uniteBaseComponent}`,
    };
  }

  if (pkgData.type === 'component') {
    // 组件开发：demo 里 import npm 包名
    alias[pkgData.name] = path.resolve(paths.appDirectory, 'src/index');
  }

  return alias;
};
