module.exports = (config, disableReload) => {
  if (disableReload) {
    config.plugins.delete('HotModuleReplacementPlugin');

    // remove css hot loader of scss/module-scss/css/module-css/less/module-less
    ['scss', 'scss-module', 'css', 'css-module', 'less', 'less-module'].forEach((rule) => {
      if (config.module.rules.get(rule)) {
        config.module.rule(rule).uses.delete('css-hot-loader');
      }
    });
    config.devServer.hot(false).inline(false);
  }
};
