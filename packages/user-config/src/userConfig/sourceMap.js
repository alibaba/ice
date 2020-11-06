module.exports = (config, sourceMap, context) => {
  const { command } = context;
  if (command === 'build' && sourceMap) {
    config.devtool('source-map');
    config.optimization
      .minimizer('TerserPlugin')
      .tap(([options]) => [
        { ...options, sourceMap: true },
      ]);
  }
};
