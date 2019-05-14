module.exports = (api) => {
  api.chainWebpack((config) => {
    config.output.path('custom');
  });
};
