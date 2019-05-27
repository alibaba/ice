module.exports = ({ context, chainWebpack }, value) => {
  const { command } = context;
  if (command === 'build') {
    chainWebpack((config) => {
      config.output.publicPath(value);
      const shouldUseRelativeAssetPaths = value === './';
      if (shouldUseRelativeAssetPaths) {
        ['scss', 'scss-module', 'css', 'css-module', 'less', 'less-module'].forEach((rule) => {
          if (config.module.rules.get(rule)) {
            config.module.rule(rule).use('MiniCssExtractPlugin.loader').tap(() => ({ publicPath: '../' }));
          }
        });
      }
    });
  }
};
