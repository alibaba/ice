const HtmlWebpackPlugin = require('html-webpack-plugin');
const paths = require('./paths');
const getFaviconPath = require('../utils/getFaviconPath');
const pkgData = require('./packageJson');

module.exports = function getEntryHtmlPlugins(entries) {

  if (pkgData.type === 'component') {
    return [
    ];
  }

  if (typeof entries === 'string' || Array.isArray(entries)) {
    return [
      new HtmlWebpackPlugin({
        inject: true,
        templateParameters: {
          NODE_ENV: process.env.NODE_ENV,
        },
        favicon: getFaviconPath([paths.appFaviconIco, paths.appFavicon]),
        template: paths.appHtml,
        minify: false,
      }),
    ];
  }
  const entriesNames = Object.keys(entries);
  return entriesNames.map((entryName) => {
    return new HtmlWebpackPlugin({
      excludeChunks: entriesNames.filter((n) => n !== entryName),
      filename: `${entryName}.html`,
      inject: true,
      templateParameters: {
        NODE_ENV: process.env.NODE_ENV,
      },
      favicon: getFaviconPath([paths.appFaviconIco, paths.appFavicon]),
      template: paths.appHtml,
      minify: false,
    });
  });
};
