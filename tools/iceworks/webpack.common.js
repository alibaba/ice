const autoprefixer = require('autoprefixer');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const webpack = require('webpack');
const WebpackPluginImport = require('webpack-plugin-import');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const outputDir = 'out/renderer';

// npm scripts target
const isDev = process.env.NODE_ENV == 'development';
let cssLoaderBasic = [];

if (isDev) {
  cssLoaderBasic = [require.resolve('css-hot-loader')];
}

const commonConfig = {
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, outputDir),
    libraryTarget: 'commonjs2',
  },
  node: {
    __dirname: false,
    __filename: false,
  },
  externals: {
    react: 'var window.React',
    'react-dom': 'var window.ReactDOM',
    mobx: 'var window.mobx',
    xterm: 'var window.xterm',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: path.resolve(__dirname, 'renderer/src'),
        use: [
          {
            loader: 'babel-loader',
            options: require('./babel.config'),
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: cssLoaderBasic.concat([
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: Object.assign(
              { sourceMap: true },
              {
                plugins: [
                  autoprefixer({
                    browsers: [
                      'last 2 versions',
                      'Firefox ESR',
                      '> 1%',
                      'ie >= 9',
                      'iOS >= 8',
                      'Android >= 4',
                    ],
                  }),
                ],
              }
            ),
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: require.resolve('ice-skin-loader'),
            options: {
              themeFile: path.join(
                __dirname,
                'renderer/node_modules/',
                '@icedesign/skin/variables.scss'
              ),
            },
          },
        ]),
      },
      {
        test: /\.css$/,
        use: cssLoaderBasic.concat([
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: Object.assign(
              { sourceMap: true },
              {
                plugins: [
                  autoprefixer({
                    browsers: [
                      'last 2 versions',
                      'Firefox ESR',
                      '> 1%',
                      'ie >= 9',
                      'iOS >= 8',
                      'Android >= 4',
                    ],
                  }),
                ],
              }
            ),
          },
        ]),
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg)(\?\S+)?$/,
        use: 'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
      },
      {
        test: /\.(jpe?g|png|gif)(\?\S+)?$/i,
        use: 'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
      },
    ],
  },
  plugins: [
    new CaseSensitivePathsPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    // This saves us a bunch of bytes by pruning locales (which we don't use)
    // from moment.
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, 'renderer/public'),
        to: path.resolve(__dirname, outputDir),
        ignore: ['*.html'],
      },
    ]),
    new WebpackPluginImport([
      {
        libraryName: /^@icedesign\/base\/lib\/([^/]+)/,
        stylePath: 'style.js',
      },
      {
        libraryName: /@icedesign\/.*/,
        stylePath: 'style.js',
      },
      {
        libraryName: /@ali\/ice-.*/,
        stylePath: 'style.js',
      },
    ]),
  ],
};

const etnry = {
  index: isDev
    ? [
        require.resolve('react-dev-utils/webpackHotDevClient'),
        path.join(__dirname, 'renderer/src/index.jsx'),
      ]
    : [path.join(__dirname, 'renderer/src/index.jsx')],
  updater: [path.join(__dirname, 'renderer/src/pages/Updater/index.jsx')],
  about: [path.join(__dirname, 'renderer/src/pages/About/index.jsx')],
  preview: [
    path.join(__dirname, 'renderer/src/pages/PreviewLoading/index.jsx'),
  ],
};
const homeConfig = merge({}, commonConfig, {
  target: 'electron-renderer',
  entry: etnry,
  resolveLoader: {
    modules: [path.resolve(__dirname, 'node_modules/')],
  },
  resolve: {
    alias: {
      '@alife/next': '@icedesign/base',
    },
    extensions: ['.js', '.jsx', '.json'],
    modules: [
      path.resolve(__dirname, 'node_modules'),
      path.resolve(__dirname, 'renderer', 'node_modules'),
      path.resolve(__dirname, 'app', 'node_modules'),
      'node_modules',
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      DEF_CLIENT: JSON.stringify(process.env.DEF_CLIENT),
      DEF_CLIENT_VERSION: JSON.stringify(process.env.DEF_CLIENT_VERSION),
    }),
    new HtmlWebpackPlugin({
      title: '',
      excludeChunks: Object.keys(etnry).filter((n) => n != 'index'),
      NODE_ENV: process.env.NODE_ENV,
      filename: 'index.html',
      template: 'renderer/public/index.html',
    }),
    new HtmlWebpackPlugin({
      title: '',
      excludeChunks: Object.keys(etnry).filter((n) => n != 'status'),
      NODE_ENV: process.env.NODE_ENV,
      filename: 'status.html',
      template: 'renderer/public/view.html',
    }),
    new HtmlWebpackPlugin({
      title: '',
      excludeChunks: Object.keys(etnry).filter((n) => n != 'updater'),
      NODE_ENV: process.env.NODE_ENV,
      filename: 'updater.html',
      template: 'renderer/public/view.html',
    }),
    new HtmlWebpackPlugin({
      title: '',
      excludeChunks: Object.keys(etnry).filter((n) => n != 'about'),
      NODE_ENV: process.env.NODE_ENV,
      filename: 'about.html',
      template: 'renderer/public/view.html',
    }),
    new HtmlWebpackPlugin({
      title: '',
      excludeChunks: Object.keys(etnry).filter((n) => n != 'preview'),
      NODE_ENV: process.env.NODE_ENV,
      filename: 'preview.html',
      template: 'renderer/public/view.html',
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      minChunks: 2,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        base: {
          chunks: 'initial',
          test: /@icedesign\/base/,
          name: 'icedesign-base',
          enforce: true,
        },
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'commons',
          chunks: 'initial',
          minChunks: 2,
        },
      },
    },
  },
});

module.exports = {
  home: homeConfig,
};
