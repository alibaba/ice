import * as miniappConfig from 'miniapp-runtime-config';
import * as builderShared from 'miniapp-builder-shared';
import * as path from 'path';

module.exports = (api) => {
  const { onGetWebpackConfig, context, getValue } = api;
  const { rootDir, userConfig } = context;
  const { targets = [] } = userConfig;

  targets.forEach((target) => {
    if (target === 'miniapp' || target === 'wechat-miniprogram') {
      onGetWebpackConfig(target, (config) => {
        const projectType = getValue('PROJECT_TYPE');
        // Clear entry
        config.entryPoints.clear();
        // App entry
        config.entry('index').add(builderShared.pathHelper.getDepPath(rootDir, `app.${projectType}`));

        config.output.path(path.join(rootDir, 'build'));

        miniappConfig.setConfig(config, userConfig[target] || {}, { context, target, babelRuleName: 'babel-loader', onGetWebpackConfig });

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
