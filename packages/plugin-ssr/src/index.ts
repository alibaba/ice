const path = require('path');
const chalk = require('chalk');
const getSSRBase = require('./ssr/getBase');
const setSSRBuild = require('./ssr/setBuild');
const setSSRDev = require('./ssr/setDev');
const setWebDev = require('./web/setDev');

// can‘t clone webpack chain object
module.exports = (api) => {
  const { onGetWebpackConfig, registerTask, context, onHook } = api;
  const { command, rootDir, userConfig = {} } = context;
  const { outputDir } = userConfig;

  const ssrConfig = getSSRBase(api);

  registerTask('ssr', ssrConfig);

  onGetWebpackConfig('ssr', (config) => {
    // do not generate vendor.js when compile document
    config.optimization.splitChunks({ cacheGroups: {} });

    config.output
      .filename('node/[name].js')
      .libraryTarget('commonjs2');
  });

  if (command === 'start') {
    onGetWebpackConfig('ssr', (config) => {
      setSSRDev(config, context);
    });

    onGetWebpackConfig('web', (config) => {
      config.optimization.splitChunks({ cacheGroups: {} });
      setWebDev(config, context);
    });
  }

  if (command === 'build') {
    onGetWebpackConfig('ssr', (config) => {
      setSSRBuild(config, context);
    });
  }

  onHook('after.build.compile', () => {
    console.log(chalk.green('[SSR] Bundle at:'));
    console.log('   ', chalk.underline.white(path.resolve(rootDir, outputDir, 'node')));
    console.log();
  });
};
