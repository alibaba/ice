module.exports = (config, disableReload) => {
  if (disableReload) {
    config.plugins.delete('HotModuleReplacementPlugin');
    config.devServer.hot(false);
  }
};
