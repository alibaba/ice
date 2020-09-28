const path = require('path');
const setMPAConfig = require('build-mpa-config');
const setEntry = require('./setEntry');
const { GET_WEBPACK_BASE_CONFIG } = require('./constants');
const WeexFrameworkBannerPlugin = require('./WeexFrameworkBannerPlugin');

module.exports = (api) => {
  const { getValue, context, registerTask, onGetWebpackConfig, registerUserConfig } = api;
  const { userConfig, rootDir, command } = context;

  registerUserConfig({
    name: 'weex',
    validation: 'object',
  });

  const getWebpackBase = getValue(GET_WEBPACK_BASE_CONFIG);
  const target = 'weex';
  const chainConfig = getWebpackBase(api, {
    target: 'weex',
    babelConfigOptions: { styleSheet: true },
    progressOptions: {
      name: 'Weex'
    }
  });

  setEntry(chainConfig, context);

  chainConfig.plugin('WeexFrameworkBannerPlugin')
    .use(WeexFrameworkBannerPlugin);

  registerTask(target, chainConfig);

  onGetWebpackConfig(target, config => {
    const { outputDir = 'build', weex = {} } = userConfig;
    // set mpa config
    if (weex.mpa) {
      setMPAConfig.default(config, { context, type: 'weex' });
    }
    config.output.filename('weex/[name].js');
    
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
