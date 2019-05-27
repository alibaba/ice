module.exports = ({ chainWebpack }, alias) => {
  chainWebpack((config) => {
    config.merge({
      resolve: {
        alias,
      },
    });
  });
};
