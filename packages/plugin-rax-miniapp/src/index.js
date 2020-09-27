const path = require('path');
const { platformMap } = require('miniapp-builder-shared');
const { setConfig } = require('miniapp-runtime-config');
const setEntry = require('./setEntry');
const { GET_WEBPACK_BASE_CONFIG } = require('./constants');

module.exports = (api) => {
  const { getValue, context, registerTask, onGetWebpackConfig } = api;
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
      // Set Entry
      setEntry(chainConfig, context, target);
      // Register task
      registerTask(target, chainConfig);

      onGetWebpackConfig(target, config => {
        const { userConfig, rootDir } = context;
        const { outputDir = 'build' } = userConfig;
        // Set output dir
        const outputPath = path.resolve(rootDir, outputDir, target);

        config.output.path(outputPath);

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
