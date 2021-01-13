const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ExtractCssAssetsPlugin = require('../../../src/cjs');

module.exports = {
  entry: './index',
  output: {},
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
      filename: '[name].css',
      chunkFileName: '[id].css',
    }),
    new ExtractCssAssetsPlugin({
      outputPath: 'cssassets/',
    }),
  ],
};
