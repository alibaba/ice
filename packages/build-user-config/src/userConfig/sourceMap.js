module.exports = (config, sourceMap, context) => {
  const { command } = context;
  if (sourceMap && command === 'build') {
    config.devtool(typeof sourceMap === 'string' ? sourceMap : 'source-map');
    config.optimization
      .minimizer('TerserPlugin')
      .tap(([options]) => [
        { ...options, sourceMap: true },
      ]);
  } else if (sourceMap === false) {
    // When sourceMap set false, sourceMap should be closed in dev and build mode
    config.devtool(false);
  }
};
