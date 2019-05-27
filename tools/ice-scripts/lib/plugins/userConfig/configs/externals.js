module.exports = ({ chainWebpack }, value) => {
  chainWebpack((config) => {
    config.merge({ externals: value });
  });
};
