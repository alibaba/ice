const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = (api) => {
  const { commandArgs } = api.service;
  api.chainWebpack((config) => {
    if (commandArgs.disabledReload) {
      config.plugins.delete('hot-module-replacement');

      // remove css hot loader of scss/module-scss/css/module-css/less/module-less
      ['scss', 'module-scss', 'css', 'module-css', 'less', 'module-less'].forEach((rule) => {
        if (config.module.rules.get(rule)) {
          config.module.rule(rule).uses.delete('css-hot');
        }
      });
    }

    if (commandArgs.analyzer) {
      config.plugin('webpack-bundle-analyzer')
        .use(BundleAnalyzerPlugin, [{ analyzerPort: commandArgs.analyzerPort || '9000' }]);
    }
  });
};
