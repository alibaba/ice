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
  const isDev = command === 'start';

  registerTask('ssr', ssrConfig);

  if (isDev) {
    onGetWebpackConfig('web', (config) => {
      config.optimization.splitChunks({ cacheGroups: {} });
      setWebDev(config, context);
    });
  }

  onGetWebpackConfig('ssr', (config) => {
    config.target('node');

    // do not generate vendor.js when compile document
    config.optimization.splitChunks({ cacheGroups: {} });

    config.devServer.writeToDisk(true);

    config.output
      .filename('node/[name].js')
      .libraryTarget('commonjs2');

    let publicUrl = JSON.stringify('');

    if (isDev) {
      setSSRDev(config, context);
    } else {
      publicUrl = JSON.stringify('.');
      setSSRBuild(config, context);
    }

    config
      .plugin('DefinePlugin')
      .tap((args) => [Object.assign({}, ...args, {
        'process.env.__IS_SERVER__': true,
        'process.env.PUBLIC_URL': publicUrl
      })]);
  });

  onHook('after.build.compile', () => {
    console.log(chalk.green('[SSR] Bundle at:'));
    console.log('   ', chalk.underline.white(path.resolve(rootDir, outputDir, 'node')));
    console.log();
  });
};
