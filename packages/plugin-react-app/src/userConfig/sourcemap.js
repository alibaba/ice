module.exports = (config, sourcemap, context) => {
  const { command } = context;
  if (command === 'build' && sourcemap) {
    config.devtool('source-map');
    config.optimization
      .minimizer('TerserPlugin')
      .tap(([options]) => [
        { ...options, sourceMap: true },
      ]);
  }
};
