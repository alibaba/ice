const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = (config, tsChecker) => {
  if (tsChecker) {
    config.plugin('fork-ts-checker-webpack-plugin')
      .use(ForkTsCheckerWebpackPlugin);
  }
};
