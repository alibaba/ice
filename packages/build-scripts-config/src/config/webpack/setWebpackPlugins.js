/* eslint-disable indent */
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FilterWarningsPlugin = require('@builder/pack/deps/webpack-filter-warnings-plugin');
const SimpleProgressPlugin = require('@builder/pack/deps/webpack-simple-progress-plugin');
const CaseSensitivePathsPlugin = require('@builder/pack/deps/case-sensitive-paths-webpack-plugin');

module.exports = (config) => {
  config
    .plugin('MiniCssExtractPlugin')
      .use(MiniCssExtractPlugin, [{
        filename: '[name].css',
      }])
      .end()
    .plugin('FilterWarningsPlugin')
      .use(FilterWarningsPlugin, [{
        exclude: /Conflicting order between:/,
      }])
      .end()
    .plugin('SimpleProgressPlugin')
      .use(SimpleProgressPlugin)
      .end()
    .plugin('CaseSensitivePathsPlugin')
      .use(CaseSensitivePathsPlugin);
};
