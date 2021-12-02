const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ExtractCssAssetsPlugin = require('../../../src/index');

module.exports = {
  entry: './index',
  output: {
    publicPath: '/build/',
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif|eot)(.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: 'assets/[hash].[ext]',
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
      chunkFilename: 'css/[id].css',
    }),
    new ExtractCssAssetsPlugin.default({
      outputPath: 'cssassets/',
      relativeCssPath: '../'
    }),
  ],
};
