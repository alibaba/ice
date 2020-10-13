import * as miniappConfig from 'miniapp-runtime-config';
import * as path from 'path';

module.exports = (api) => {
  const { onGetWebpackConfig, context, registerUserConfig } = api;
  const { rootDir, userConfig } = context;
  const { targets = [] } = userConfig;

  targets.forEach((target) => {
    if (target === 'miniapp' || target === 'wechat-miniprogram') {
      onGetWebpackConfig(target, (config) => {
        const { outputDir = 'build' } = userConfig;
        registerUserConfig({
          name: target,
          validation: 'object'
        });

        const outputPath = path.resolve(rootDir, outputDir, target);
        config.output.path(path.join(rootDir, 'build', target));

        miniappConfig.setConfig(config, userConfig[target] || {}, { context, target, babelRuleName: 'babel-loader', outputPath });

        if (config.plugins.get('MiniCssExtractPlugin')) {
          config.plugin('MiniCssExtractPlugin').tap((args) => [
            {
              ...args,
              filename: `${target}/[name].css`,
            }
          ]);
        }

        // Remove default HtmlWebpackPlugin
        config.plugins.delete('HtmlWebpackPlugin');

        // Remove default CopyWebpackPlugin
        config.plugins.delete('CopyWebpackPlugin');
      });
    };
  });
};
