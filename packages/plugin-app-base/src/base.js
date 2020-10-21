const getWebpackConfig = require('rax-webpack-config');
const getBabelConfig = require('rax-babel-config');
const ProgressPlugin = require('webpackbar');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
const fs = require('fs-extra');

module.exports = (api, { target, babelConfigOptions, progressOptions }) => {
  const { context, onGetWebpackConfig } = api;
  const { rootDir, command, webpack, commandArgs, userConfig } = context;
  const appMode = commandArgs.mode || command;
  const babelConfig = getBabelConfig(babelConfigOptions);

  const mode = command === 'start' ? 'development' : 'production';
  const chainConfig = getWebpackConfig({
    rootDir,
    mode,
    babelConfig,
    target,
  });
  // 1M = 1024 KB = 1048576 B
  chainConfig.performance.maxAssetSize(1048576).maxEntrypointSize(1048576);

  // setup DefinePlugin and CopyWebpackPlugin out of onGetWebpackConfig
  // in case of registerUserConfig will be excute before onGetWebpackConfig

  // DefinePlugin
  const defineVariables = {
    'process.env.NODE_ENV': JSON.stringify(mode || 'development'),
    'process.env.APP_MODE': JSON.stringify(appMode),
    'process.env.SERVER_PORT': JSON.stringify(commandArgs.port),
  };

  chainConfig
    .plugin('ProgressPlugin')
    .use(ProgressPlugin, [Object.assign({ color: '#F4AF3D' }, progressOptions)])
    .end()
    .plugin('DefinePlugin')
    .use(webpack.DefinePlugin, [defineVariables]);

  // Copy public dir
  if (fs.existsSync(path.resolve(rootDir, 'public'))) {
    chainConfig.plugin('CopyWebpackPlugin').use(CopyWebpackPlugin, [[]]);
  }

  chainConfig
    .plugin('friendly-error')
    .use(require.resolve('friendly-errors-webpack-plugin'), [
      {
        clearConsole: false,
      },
    ])
    .end();

  chainConfig.externals([
    function(ctx, request, callback) {
      if (request.indexOf('@weex-module') !== -1) {
        return callback(null, `commonjs ${request}`);
      }
      // compatible with @system for quickapp
      if (request.indexOf('@system') !== -1) {
        return callback(null, `commonjs ${request}`);
      }
      // compatible with plugin with miniapp plugin
      if (/^plugin:\/\//.test(request)) {
        return callback(null, `commonjs ${request}`);
      }
      callback();
    },
  ]);

  // Process app.json file
  chainConfig.module
    .rule('appJSON')
    .type('javascript/auto')
    .test(/app\.json$/)
    .use('babel-loader')
    .loader(require.resolve('babel-loader'))
    .options(babelConfig)
    .end()
    .use('loader')
    .loader(require.resolve('./loaders/AppConfigLoader'));

  ['jsx', 'tsx'].forEach((ruleName) => {
    chainConfig.module
      .rule(ruleName)
      .use('platform-loader')
      .loader(require.resolve('rax-compile-config/src/platformLoader'));
  });

  if (command === 'start') {
    // disable build-scripts stats output
    process.env.DISABLE_STATS = true;
  }

  onGetWebpackConfig(target, (config) => {
    // Set public url after developer has set public path
    // Get public path
    let publicUrl = config.output.get('publicPath');

    // Developer will use process.env.PUBLIC_URL + '/logo.png', so it need remove last /
    if (publicUrl && publicUrl.endsWith('/')) {
      publicUrl = publicUrl.substring(0, publicUrl.length - 1);
    }

    config
      .plugin('DefinePlugin')
      .tap((args) => [
        Object.assign(...args, {
          'process.env.PUBLIC_URL': JSON.stringify(publicUrl),
        }),
      ]);

    const { outputDir = 'build' } = userConfig;
    // Copy public dir
    if (config.plugins.has('CopyWebpackPlugin')) {
      config.plugin('CopyWebpackPlugin').tap(([copyList]) => {
        return [copyList.concat([{
        from: path.resolve(rootDir, 'public'),
        to: path.resolve(rootDir, outputDir, target)
      }])];
      });
    }
  });

  return chainConfig;
};
