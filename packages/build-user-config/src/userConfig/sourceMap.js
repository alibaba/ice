module.exports = (config, sourceMap, context) => {
  const { command } = context;
  if (sourceMap && command === 'build') {
    // Minifier will read from config.devtool as default config of sourcemap
    config.devtool(typeof sourceMap === 'string' ? sourceMap : 'source-map');
  } else if (sourceMap === false) {
    // When sourceMap set false, sourceMap should be closed in dev and build mode
    config.devtool(false);
  }
};
