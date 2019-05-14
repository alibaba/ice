module.exports = (api, value) => {
  if (api.service.command === 'build') {
    api.chainWebpack((config) => {
      config.output.publicPath(value);
      const shouldUseRelativeAssetPaths = value === './';
      if (shouldUseRelativeAssetPaths) {
        ['scss', 'scss-module', 'css', 'css-module', 'less', 'less-module'].forEach((rule) => {
          if (config.module.rules.get(rule)) {
            config.module.rule(rule).use('MiniCssExtractPlugin.loader').tap(() => [{ publicPath: '../' }]);
          }
        });
      }
    });
  }
};
