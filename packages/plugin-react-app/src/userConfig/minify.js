module.exports = (config, value, context) => {
  const { command } = context;
  // minify always be false in dev mode
  const minify = command === 'start' ? false : value;
  config.optimization.minimize(minify);
};
