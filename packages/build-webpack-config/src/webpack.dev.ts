export default (config) => {
  // custom stat output by stats.toJson() calls
  config.stats('none');
  // set source map, https://webpack.js.org/configuration/devtool/#devtool
  config.devtool('cheap-module-source-map');
};
