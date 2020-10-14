module.exports = (config, terserOptions, context) => {
  const { command } = context;
  if (command === 'build' && terserOptions && config.optimization.minimizers.get('TerserPlugin')) {
    config.optimization.minimizer('TerserPlugin').tap(([options]) => [
      {
        ...options,
        ...terserOptions,
      },
    ]);
  }
};