const path = require('path');
const setDev = require('./setDev');
const setEntry = require('./setEntry');
const DocumentPlugin = require('./DocumentPlugin');
const { GET_WEBPACK_BASE_CONFIG } = require('./constants');

module.exports = (api) => {
  const { onGetWebpackConfig, getValue, context, registerTask } = api;

  const getWebpackBase = getValue(GET_WEBPACK_BASE_CONFIG);
  const chainConfig = getWebpackBase(api, {
    target: 'web',
    babelConfigOptions: { styleSheet: true },
  });

  // Set Entry
  setEntry(chainConfig, context);

  onGetWebpackConfig('web', (config) => {
    const { userConfig, rootDir, command } = context;
    const webConfig = userConfig.web || {};

    if (command === 'start') {
      setDev(config);
    } else if (command === 'build') {
      // Set output dir
      const outputPath = userConfig.outputDir ? path.resolve(rootDir, userConfig.outputDir)
      : path.resolve(rootDir, 'build', 'web');

      config.output.path(outputPath);
    }

    const webpackConfig = config.toConfig();

    webpackConfig.target = 'node';

    webpackConfig.output.libraryTarget = 'commonjs2';
    // do not generate vendor.js when compile document
    webpackConfig.optimization.splitChunks.cacheGroups = {};

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
  });

  registerTask('web', chainConfig);
};
