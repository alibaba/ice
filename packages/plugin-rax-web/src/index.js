const path = require('path');
const setMPAConfig = require('build-mpa-config');
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
  chainConfig.name('web');

  // Set Entry
  setEntry(chainConfig, context);
  registerTask(target, chainConfig);

  onGetWebpackConfig(target, config => {
    const { userConfig, rootDir, command } = context;
    const { outputDir } = userConfig;
    const webConfig = userConfig.web || {};

    if (webConfig.mpa) {
      setMPAConfig.default(config, { context, type: 'web' });
    }

    // Set output dir
    const outputPath = path.resolve(rootDir, outputDir, target);
    config.output.path(outputPath);

    if (command === 'start') {
      setDev(config);
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
};
