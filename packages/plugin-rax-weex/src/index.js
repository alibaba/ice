const path = require('path');
const fs = require('fs-extra');
const setEntry = require('./setEntry');
const { GET_WEBPACK_BASE_CONFIG } = require('./constants');
const WeexFrameworkBannerPlugin = require('./WeexFrameworkBannerPlugin');

module.exports = (api) => {
  const { getValue, context, registerTask, onGetWebpackConfig } = api;

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
    const { userConfig, rootDir, command } = context;
    const { outputDir = 'build' } = userConfig;
    let outputPath;
    let publicUrl = '""';

    if (command === 'start') {
      // Set output dir
      outputPath = path.resolve(rootDir, outputDir);
      config.devServer.contentBase(outputPath);
      config.output.filename(`${target}/[name].js`);
    } else if (command === 'build') {
      publicUrl = '"."';
      // Set output dir
      outputPath = path.resolve(rootDir, outputDir, target);
    }

    // Set public url
    config
      .plugin('DefinePlugin')
      .tap((args) => [Object.assign(...args, { 'process.env.PUBLIC_URL': publicUrl })]);

    const needCopyDirs = [];
    // Copy public dir
    if (fs.existsSync(path.resolve(rootDir, 'public'))) {
      needCopyDirs.push({
        from: path.resolve(rootDir, 'public'),
        to: path.resolve(rootDir, outputDir, target)
      });
    }

    config.plugin('CopyWebpackPlugin').tap(([copyList]) => {
      return [copyList.concat(needCopyDirs)];
    });

    config.output.path(outputPath);
  });
};
