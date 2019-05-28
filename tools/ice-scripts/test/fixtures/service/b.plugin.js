module.exports = (api, opt) => {
  api.chainWebpack((config) => {
    config.resolve.alias.set('react', opt.alias);
  });
};
