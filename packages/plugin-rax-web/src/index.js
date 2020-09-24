const path = require('path');
const setDev = require('./setDev');
const setEntry = require('./setEntry');
const DocumentPlugin = require('./DocumentPlugin');
const { GET_WEBPACK_BASE_CONFIG } = require('./constants');

module.exports = (api, { taskIndex }) => {
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
    if (userConfig.outputDir) {
      config.output.path(path.resolve(rootDir, userConfig.outputDir));
    } else {
      config.output.path(path.resolve(rootDir, 'build', 'web'));
    }

    if (command === 'start') {
      setDev(config, taskIndex);
    }

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

  registerTask('web', chainConfig);
};
