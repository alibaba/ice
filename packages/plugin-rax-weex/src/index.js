const path = require('path');
const setEntry = require('./setEntry');
const { GET_WEBPACK_BASE_CONFIG } = require('./constants');
const WeexFrameworkBannerPlugin = require('./WeexFrameworkBannerPlugin');

module.exports = (api) => {
  const { getValue, context, registerTask, onGetWebpackConfig } = api;

  const getWebpackBase = getValue(GET_WEBPACK_BASE_CONFIG);
  const chainConfig = getWebpackBase(api, {
    target: 'weex',
    babelConfigOptions: { styleSheet: true },
  });

  setEntry(chainConfig, context);

  chainConfig.plugin('WeexFrameworkBannerPlugin')
    .use(WeexFrameworkBannerPlugin);

  registerTask('weex', chainConfig);

  onGetWebpackConfig('weex', config => {
    const { userConfig, rootDir, command } = context;

    config.output.filename('weex/[name].js');
    if (command === 'start') {
      config.output.filename('weex/[name].js');
    } else if (command === 'build') {
      // Set output dir
      const outputPath = userConfig.outputDir ? path.resolve(rootDir, userConfig.outputDir)
      : path.resolve(rootDir, 'build', 'weex');

      config.output.path(outputPath);
    }
  });
};
