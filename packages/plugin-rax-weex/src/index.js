const path = require('path');
const setMPAConfig = require('@builder/mpa-config');
const { getMpaEntries } = require('@builder/app-helpers');
const setEntry = require('./setEntry');
const { GET_RAX_APP_WEBPACK_CONFIG } = require('./constants');
const WeexFrameworkBannerPlugin = require('./WeexFrameworkBannerPlugin');

module.exports = (api) => {
  const { getValue, context, registerTask, onGetWebpackConfig, registerUserConfig } = api;
  const { userConfig, rootDir, command } = context;

  const getWebpackBase = getValue(GET_RAX_APP_WEBPACK_CONFIG);
  const target = 'weex';
  const chainConfig = getWebpackBase(api, {
    target: 'weex',
    babelConfigOptions: { styleSheet: true },
    progressOptions: {
      name: 'Weex'
    }
  });
  chainConfig.taskName = target;

  setEntry(chainConfig, context);

  chainConfig.plugin('WeexFrameworkBannerPlugin')
    .use(WeexFrameworkBannerPlugin);
  chainConfig.name(target);
  registerTask(target, chainConfig);
  registerUserConfig({
    name: target,
    validation: 'object'
  });

  onGetWebpackConfig(target, config => {
    const { outputDir = 'build', weex = {} } = userConfig;
    // set mpa config
    if (weex.mpa) {
      setMPAConfig.default(config, { context, type: 'weex', entries: getMpaEntries(api, {
        target,
        appJsonPath: path.join(rootDir, 'src/app.json')
      }) });
    }

    let outputPath;
    if (command === 'start') {
      // Set output dir
      outputPath = path.resolve(rootDir, outputDir);
      config.devServer.contentBase(outputPath);
      config.output.filename(`${target}/[name].js`);
    } else if (command === 'build') {
      // Set output dir
      outputPath = path.resolve(rootDir, outputDir, target);
    }

    config.output.path(outputPath);
  });
};
