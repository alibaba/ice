const path = require('path');
const fs = require('fs');
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

  setEntry(chainConfig, context);

  registerTask(target, chainConfig);
  registerUserConfig({
    name: target,
    validation: 'object'
  });


  onGetWebpackConfig(target, config => {
    const { userConfig, rootDir, command } = context;
    const { outputDir = 'build' } = userConfig;
    let outputPath;
    if (command === 'start') {
      // Set output dir
      outputPath = path.resolve(rootDir, outputDir);
      config.output.filename(`${target}/[name].js`);
      // Force disable HMR, kraken not support yet.
      config.devServer.inline(false);
      config.devServer.hot(false);
    } else if (command === 'build') {
      // Set output dir
      outputPath = path.resolve(rootDir, outputDir, target);
    }
    config.output.path(outputPath);

    let publicUrl = JSON.stringify('');
    if (command === 'build') {
      publicUrl = JSON.stringify('.');
    }

    config
      .plugin('DefinePlugin')
      .tap((args) => [Object.assign(...args, { 'process.env.PUBLIC_URL': publicUrl })]);

    const needCopyDirs = [];

    // Copy public dir
    if (config.plugins.has('CopyWebpackPlugin')) {
      needCopyDirs.push({
        from: path.resolve(rootDir, 'public'),
        to: path.resolve(rootDir, outputDir, target)
      });
      config.plugin('CopyWebpackPlugin').tap(([copyList]) => {
        return [copyList.concat(needCopyDirs)];
      });
    }
  });
};
