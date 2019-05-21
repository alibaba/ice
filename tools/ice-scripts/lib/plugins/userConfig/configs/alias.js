module.exports = (api, alias) => {
  api.chainWebpack((config) => {
    config.merge({
      resolve: {
        alias,
      },
    });
  });
};
