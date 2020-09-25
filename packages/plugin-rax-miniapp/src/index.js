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
      const { userConfig, rootDir, command } = context;

      if (command === 'build') {
        // Set output dir
        const outputPath = userConfig.outputDir ? path.resolve(rootDir, userConfig.outputDir)
        : path.resolve(rootDir, 'build', target);

        config.output.path(outputPath);
      }

      setConfig(config, {
        onGetWebpackConfig,
        context,
        target,
        babelRuleName: 'babel-loader',
        modernMode: true
      });
    });
  });
};
