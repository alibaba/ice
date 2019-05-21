module.exports = (api, value) => {
  const { command } = api.service;
  // minify always be false in dev mode
  const minify = command === 'dev' ? false : value;
  api.chainWebpack((config) => {
    config.optimization.minimize(minify);
  });
};
