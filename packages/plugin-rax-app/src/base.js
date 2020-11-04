const { getEnhanceWebpackConfig } = require('build-webpack-config');
const getWebpackConfig = require('rax-webpack-config');
const getBabelConfig = require('rax-babel-config');
const ProgressPlugin = require('webpackbar');
const path = require('path');

module.exports = (api, { target, babelConfigOptions, progressOptions }) => {
  const { context, onGetWebpackConfig } = api;
  const { rootDir, command, userConfig } = context;

  const mode = command === 'start' ? 'development' : 'production';
  const babelConfig = getBabelConfig(babelConfigOptions);
  const webpackConfig = getWebpackConfig({
    rootDir,
    mode,
    babelConfig,
    target,
  });
  const enhanceWebpackConfig = getEnhanceWebpackConfig(api, {
    target,
    webpackConfig,
    babelConfig,
  });

  enhanceWebpackConfig
    .plugin('ProgressPlugin')
    .use(ProgressPlugin, [
      Object.assign({ color: '#F4AF3D' }, progressOptions),
    ]);

  ['jsx', 'tsx'].forEach((ruleName) => {
    enhanceWebpackConfig.module
      .rule(ruleName)
      .use('platform-loader')
      .loader(require.resolve('rax-compile-config/src/platformLoader'));
  });

  onGetWebpackConfig(target, (config) => {
    // Set public url after developer has set public path
    // Get public path
    let publicUrl = config.output.get('publicPath');

    // Developer will use process.env.PUBLIC_URL + '/logo.png', so it need remove last /
    if (publicUrl && publicUrl.endsWith('/')) {
      publicUrl = publicUrl.substring(0, publicUrl.length - 1);
    }

    config.plugin('DefinePlugin').tap((args) => [
      Object.assign(...args, {
        'process.env.PUBLIC_URL': JSON.stringify(publicUrl),
      }),
    ]);

    const { outputDir = 'build' } = userConfig;
    // Copy public dir
    if (config.plugins.has('CopyWebpackPlugin')) {
      config.plugin('CopyWebpackPlugin').tap(([copyList]) => {
        return [
          copyList.concat([
            {
              from: path.resolve(rootDir, 'public'),
              to: path.resolve(rootDir, outputDir, target),
            },
          ]),
        ];
      });
    }
  });

  return enhanceWebpackConfig;
};
