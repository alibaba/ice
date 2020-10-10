import * as miniappConfig from 'miniapp-runtime-config';
import * as builderShared from 'miniapp-builder-shared';
import * as path from 'path';

module.exports = (api) => {
  const { onGetWebpackConfig, context, registerUserConfig, getValue } = api;
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

        const projectType = getValue('PROJECT_TYPE');
        // Reset entry
        config.entryPoints.clear();
        config.entry('index').add(builderShared.pathHelper.getDepPath(rootDir, `app.${projectType}`));

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
