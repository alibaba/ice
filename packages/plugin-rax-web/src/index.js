const path = require('path');
const setDev = require('./setDev');
const setEntry = require('./setEntry');
const DocumentPlugin = require('./DocumentPlugin');
const { GET_WEBPACK_BASE_CONFIG } = require('./constants');

module.exports = (api, { compileIndex }) => {
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

    // Set output dir
    config.output.path(path.resolve(rootDir, userConfig.outputDir, 'web'));
    config.output.filename('[name].js');

    if (command === 'start') {
      setDev(config, compileIndex);
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
  });

  registerTask('web', chainConfig);
};
