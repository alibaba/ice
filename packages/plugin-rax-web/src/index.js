const path = require('path');
const fs = require('fs');
const setDev = require('./setDev');
const setEntry = require('./setEntry');
const DocumentPlugin = require('./DocumentPlugin');
const { GET_WEBPACK_BASE_CONFIG } = require('./constants');

module.exports = (api) => {
  const { onGetWebpackConfig, getValue, context, registerTask } = api;

  const getWebpackBase = getValue(GET_WEBPACK_BASE_CONFIG);
  const target = 'web';
  const chainConfig = getWebpackBase(api, {
    target,
    babelConfigOptions: { styleSheet: true },
    progressOptions: {
      name: 'Web'
    }
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

    let publicUrl = '""';

    if (command === 'start') {
      setDev(config);
    } else if (command === 'build') {
      publicUrl = '"."';
    }

    config
      .plugin('DefinePlugin')
      .tap((args) => [Object.assign(...args, { 'process.env.PUBLIC_URL': publicUrl })]);

      const needCopyDirs = [];

      // Copy public dir
      if (fs.existsSync(path.resolve(rootDir, 'public'))) {
        needCopyDirs.push({
          from: path.resolve(rootDir, 'public'),
          to: outputPath
        });
      }

      config.plugin('CopyWebpackPlugin').tap(([copyList]) => {
        return [copyList.concat(needCopyDirs)];
      });


    const webpackConfig = config.toConfig();

    webpackConfig.target = 'node';

    webpackConfig.output.libraryTarget = 'commonjs2';


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
  });
};
