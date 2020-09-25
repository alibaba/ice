const path = require('path');
const setEntry = require('./setEntry');
const { GET_WEBPACK_BASE_CONFIG } = require('./constants');

module.exports = (api) => {
  const { getValue, context, registerTask, onGetWebpackConfig } = api;

  const getWebpackBase = getValue(GET_WEBPACK_BASE_CONFIG);
  const chainConfig = getWebpackBase(api, {
    target: 'kraken',
    babelConfigOptions: { styleSheet: true },
    progressOptions: {
      name: 'Kraken'
    }
  });

  setEntry(chainConfig, context);

  registerTask('kraken', chainConfig);

  onGetWebpackConfig('kraken', config => {
    const { userConfig, rootDir, command } = context;
    if (command === 'start') {
      config.devServer.writeToDisk(false);
      config.output.filename('kraken/[name].js');
      // Force disable HMR, kraken not support yet.
      config.devServer.inline(false);
      config.devServer.hot(false);
    } else if (command === 'build') {
      // Set output dir
      const outputPath = userConfig.outputDir ? path.resolve(rootDir, userConfig.outputDir)
      : path.resolve(rootDir, 'build', 'kraken');

      config.output.path(outputPath);
    }
  });
};
