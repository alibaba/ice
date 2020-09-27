const path = require('path');
const setEntry = require('./setEntry');
const { GET_WEBPACK_BASE_CONFIG } = require('./constants');

module.exports = (api) => {
  const { getValue, context, registerTask, onGetWebpackConfig } = api;

  const getWebpackBase = getValue(GET_WEBPACK_BASE_CONFIG);
  const target = 'kraken';
  const chainConfig = getWebpackBase(api, {
    target,
    babelConfigOptions: { styleSheet: true },
    progressOptions: {
      name: 'Kraken'
    }
  });

  setEntry(chainConfig, context);

  registerTask(target, chainConfig);

  onGetWebpackConfig(target, config => {
    const { userConfig, rootDir, command } = context;
    const { outputDir } = userConfig;
    let outputPath;
    if (command === 'start') {
      // Set output dir
      outputPath = outputDir ? path.resolve(rootDir, outputDir)
       : path.resolve(rootDir, 'build');
      config.output.filename(`${target}/[name].js`);
      // Force disable HMR, kraken not support yet.
      config.devServer.inline(false);
      config.devServer.hot(false);
    } else if (command === 'build') {
      // Set output dir
      outputPath = outputDir ? path.resolve(rootDir, outputDir)
      : path.resolve(rootDir, 'build', target);
    }
    config.output.path(outputPath);
  });
};
