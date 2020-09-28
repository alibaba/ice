module.exports = (config, value, userConfig) => {
  const shouldUseRelativeAssetPaths = value === './';
  const outputCssPath = userConfig.outputAssetsPath && userConfig.outputAssetsPath.css;
  // when publicPath is ./ assets in css will be resolve as ./assets/xxx
  // the actual path where assets exist is ../assets/xxx when output css path is `css`
  if (shouldUseRelativeAssetPaths && outputCssPath) {
    const pathArray = outputCssPath.split('/').length;
    const publicPath = `${[...Array(pathArray)].map(() => '..').join('/')}/`;
    // MiniCssExtractPlugin.loader will use output.publicPath as default
    ['scss', 'scss-module', 'css', 'css-module', 'less', 'less-module'].forEach((rule) => {
      if (config.module.rules.get(rule)) {
        config.module.rule(rule).use('MiniCssExtractPlugin.loader').tap(() => ({ publicPath }));
      }
    });
  }
};

