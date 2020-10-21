const path = require('path');
const setMPAConfig = require('build-mpa-config');
const { getMpaEntries } = require('build-app-helpers');
const setEntry = require('./setEntry');
const { GET_WEBPACK_BASE_CONFIG } = require('./constants');

module.exports = (api) => {
  const { getValue, context, registerTask, onGetWebpackConfig, registerUserConfig } = api;

  const getWebpackBase = getValue(GET_WEBPACK_BASE_CONFIG);
  const target = 'kraken';
  const chainConfig = getWebpackBase(api, {
    target,
    babelConfigOptions: { styleSheet: true },
    progressOptions: {
      name: 'Kraken'
    }
  });
  chainConfig.name(target);
  chainConfig.taskName = target;

  setEntry(chainConfig, context);

  registerTask(target, chainConfig);
  registerUserConfig({
    name: target,
    validation: 'object'
  });


  onGetWebpackConfig(target, config => {
    const { userConfig, rootDir, command } = context;
    const { outputDir = 'build' } = userConfig;
    const krakenConfig = userConfig.kraken || {};

    if (krakenConfig.mpa) {
      setMPAConfig.default(config, { context, type: 'kraken', entries: getMpaEntries(api, {
        target,
        appJsonPath: path.join(rootDir, 'src/app.json')
      }) });
    }

    let outputPath;
    if (command === 'start') {
      // Set output dir
      outputPath = path.resolve(rootDir, outputDir);
      config.output.filename(`${target}/[name].js`);
      config.devServer.contentBase(outputPath);
      // Force disable HMR, kraken not support yet.
      config.devServer.inline(false);
      config.devServer.hot(false);
    } else if (command === 'build') {
      // Set output dir
      outputPath = path.resolve(rootDir, outputDir, target);
    }
    config.output.path(outputPath);
  });
};
