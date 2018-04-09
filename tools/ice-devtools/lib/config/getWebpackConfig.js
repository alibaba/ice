const merge = require('webpack-merge');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const getBabelConfig = require('./getBabelConfig');
const blockTemplate = require.resolve('../template/block.hbs');
const STYLE_LOADER = require.resolve('style-loader');
const CSS_LOADER = require.resolve('css-loader');
const SASS_LOADER = require.resolve('sass-loader');
const WebpackPluginImport = require('webpack-plugin-import');

const baseConfig = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  output: {
    library: '[name]',
    libraryTarget: 'window',
    publicPath: '/',
  },
  entry: {
    // DEMOLAYOUT: require.resolve('@icedesign/demo-layout'),
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: require.resolve('babel-loader'),
        options: getBabelConfig(),
      },
      {
        test: /\.css$/,
        use: [STYLE_LOADER, CSS_LOADER],
      },
      {
        test: /\.scss$/,
        use: [STYLE_LOADER, CSS_LOADER, SASS_LOADER],
      },
    ],
  },

  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      'webpack-hot-client/client': require.resolve('webpack-hot-client/client'),
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: blockTemplate,
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

module.exports = function getWebpackConfig(entry) {
  const config = { entry };

  return merge(baseConfig, config);
};
