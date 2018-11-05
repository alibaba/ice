const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const WebpackPluginImport = require('../');

const config = {
  mode: 'development',
  context: __dirname,
  entry: {
    index: './entry.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?/i,
        use: 'babel-loader',
      },
      {
        test: /\.scss$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.html'],
  },
  externals: {
    react: 'window.React',
    'react-dom': 'window.ReactDOM',
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'dist.js',
  },
  plugins: [
    new BundleAnalyzerPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    new WebpackPluginImport([
      {
        libraryName: /^@icedesign\/base\/lib\/([^/]+)/,
        stylePath: 'style.js',
      },
      {
        libraryName: /@icedesign\/.*/,
        stylePath: 'style.js',
      },
    ]),
  ],
};

webpack(config, (err, stats) => {
  console.log(
    stats.toString({
      colors: true,
      modules: false,
    })
  );
});
