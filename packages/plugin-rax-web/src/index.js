const path = require('path');
const setMPAConfig = require('build-mpa-config');
const setDev = require('./setDev');
const setEntry = require('./setEntry');
const DocumentPlugin = require('./DocumentPlugin');
const { GET_WEBPACK_BASE_CONFIG } = require('./constants');

module.exports = (api) => {
  const { onGetWebpackConfig, getValue, context, registerTask, registerUserConfig } = api;

  const getWebpackBase = getValue(GET_WEBPACK_BASE_CONFIG);
  const target = 'web';
  const { userConfig = {} } = context;
  const chainConfig = getWebpackBase(api, {
    target,
    babelConfigOptions: { styleSheet: userConfig.inlineStyle },
    progressOptions: {
      name: 'Web'
    }
  });
  chainConfig.name(target);
  chainConfig.taskName = target;
  registerUserConfig({
    name: target,
    validation: 'object'
  });

  // Set Entry
  setEntry(chainConfig, context);
  registerTask(target, chainConfig);

  onGetWebpackConfig(target, config => {
    const { userConfig, rootDir, command } = context;
    const { outputDir } = userConfig;
    const webConfig = userConfig.web || {};

   // Set output dir
    const outputPath = path.resolve(rootDir, outputDir, target);
    config.output.path(outputPath);

    let publicUrl = JSON.stringify('');

    if (command === 'start') {
      setDev(config);
    } else if (command === 'build') {
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
        to: outputPath
      });
      config.plugin('CopyWebpackPlugin').tap(([copyList]) => {
        return [copyList.concat(needCopyDirs)];
      });
    }

    const webpackConfig = config.toConfig();

    webpackConfig.target = 'node';

    webpackConfig.output.libraryTarget = 'commonjs2';
    // do not generate vendor.js when compile document
    webpackConfig.optimization.splitChunks.cacheGroups = {};

    config.plugin('document').use(DocumentPlugin, [
      {
        context,
        pages: [
          {
            entryName: 'index',
            path: '/',
          },
        ],
        doctype: webConfig.doctype,
        staticExport: webConfig.staticExport,
        webpackConfig
      },
    ]);
    if (webConfig.mpa) {
      setMPAConfig.default(config, { context, type: 'web' });
    }
  });
};
