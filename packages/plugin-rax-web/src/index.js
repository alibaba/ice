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

  // Set process bar
  chainConfig
  .plugin('ProgressPlugin')
    .tap(() => {
      return {
        name: '[ Web ]'
      };
    })
    .end();

  onGetWebpackConfig('web', (config) => {
    const { userConfig, rootDir, command } = context;
    const webConfig = userConfig.web || {};
    config.name('[ Web ]');

    if (command === 'start') {
      setDev(config, taskIndex);
    } else if (command === 'build') {
      // Set output dir
      const outputPath = userConfig.outputDir ? path.resolve(rootDir, userConfig.outputDir)
      : path.resolve(rootDir, 'build', 'web');

      config.output.path(outputPath);
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
