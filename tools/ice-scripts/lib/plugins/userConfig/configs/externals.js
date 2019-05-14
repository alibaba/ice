module.exports = (api, value) => {
  api.chainWebpack((config) => {
    config.merge({ externals: value });
  });
};
