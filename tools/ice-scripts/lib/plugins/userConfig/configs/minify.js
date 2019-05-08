module.exports = (api, minify) => {
  api.chainWebpack((config) => {
    config.optimization.minimize(minify);
  });
};
