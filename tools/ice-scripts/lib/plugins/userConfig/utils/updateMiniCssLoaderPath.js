module.exports = (config, value, userConfig) => {
  const shouldUseRelativeAssetPaths = value === './';
  const outputCssPath = userConfig.outputAssetsPath && userConfig.outputAssetsPath.css;
  if (shouldUseRelativeAssetPaths && outputCssPath) {
    const pathArray = outputCssPath.split('/').length;
    const publicPath = `${[...Array(pathArray)].map(() => '..').join('/')}/`;
    ['scss', 'scss-module', 'css', 'css-module', 'less', 'less-module'].forEach((rule) => {
      if (config.module.rules.get(rule)) {
        config.module.rule(rule).use('MiniCssExtractPlugin.loader').tap(() => ({ publicPath }));
      }
    });
  }
};

