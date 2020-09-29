const path = require('path');
const fs = require('fs-extra');
const { platformMap } = require('miniapp-builder-shared');
const { setConfig } = require('miniapp-runtime-config');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const setEntry = require('./setEntry');
const { GET_WEBPACK_BASE_CONFIG } = require('./constants');

module.exports = (api) => {
  const { getValue, context, registerTask, onGetWebpackConfig, registerUserConfig } = api;
  const { userConfig } = context;
  const { targets } = userConfig;

  const getWebpackBase = getValue(GET_WEBPACK_BASE_CONFIG);
  targets.forEach(target => {
    if (['miniapp', 'wechat-miniprogram', 'bytedance-microapp'].includes(target)) {
      const chainConfig = getWebpackBase(api, {
        target,
        babelConfigOptions: { styleSheet: true, disableRegenerator: true },
        progressOptions: {
          name: platformMap[target].name
        }
      });
      chainConfig.name(target);
      // Set Entry
      setEntry(chainConfig, context, target);
      // Register task
      registerTask(target, chainConfig);
      registerUserConfig({
        name: target,
        validation: 'object'
      });

      onGetWebpackConfig(target, config => {
        const { userConfig, rootDir } = context;
        const { outputDir = 'build' } = userConfig;
        // Set output dir
        const outputPath = path.resolve(rootDir, outputDir, target);
        config.output.path(outputPath);

        config
          .plugin('DefinePlugin')
          .tap((args) => [Object.assign(...args, { 'process.env.PUBLIC_URL': '".."' })]);

        const needCopyDirs = [];

        // Copy src/miniapp-native dir
        if (fs.existsSync(path.resolve(rootDir, 'src', 'miniapp-native'))) {
          needCopyDirs.push({
            from: path.resolve(rootDir, 'src', 'miniapp-native'),
            to: path.resolve(rootDir, outputDir, target, 'miniapp-native')
          });
        }

        // Copy public dir
        if (config.plugins.has('CopyWebpackPlugin')) {
          needCopyDirs.push({
            from: path.resolve(rootDir, 'public'),
            to: path.resolve(rootDir, outputDir, target)
          });
          config.plugin('CopyWebpackPlugin').tap(([copyList]) => {
            return [copyList.concat(needCopyDirs)];
          });
        } else if (needCopyDirs.length > 1) {
          config
            .plugin('CopyWebpackPlugin')
            .use(CopyWebpackPlugin, [needCopyDirs]);
        }

        setConfig(config, userConfig[target] || {}, {
          context,
          target,
          babelRuleName: 'babel-loader',
          modernMode: true
        });
      });
    }
  });
};
