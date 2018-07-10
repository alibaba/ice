const merge = require('webpack-merge');
const webpack = require('webpack');

const BABEL_LOADER = require.resolve('babel-loader');
const STYLE_LOADER = require.resolve('style-loader');
const CSS_LOADER = require.resolve('css-loader');
const SASS_LOADER = require.resolve('sass-loader');
const VUE_STYLE_LOADER = require.resolve('vue-style-loader');
const VUE_LOADER = require.resolve('vue-loader');
const WebpackPluginImport = require('webpack-plugin-import');

const URL_LOADER = require.resolve('url-loader');
const URL_LOADER_LIMIT = 8192;

const getBabelConfig = require('./getBabelConfig');

module.exports = function getWebpackConfig() {
  return {
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
    output: {
      library: '[name]',
      libraryTarget: 'window',
      publicPath: '/',
    },
    entry: {},
    externals: {
      react: 'React',
      'react-dom': 'ReactDOM',
      vue: 'Vue',
      moment: 'moment'
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          loader: BABEL_LOADER,
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
        {
          test: /\.vue$/,
          loader: VUE_LOADER,
          options: {
            loaders: {
              js: BABEL_LOADER,
              scss: `${VUE_STYLE_LOADER}!${CSS_LOADER}!${SASS_LOADER}`, // <style lang="scss">
              sass: `${VUE_STYLE_LOADER}!${CSS_LOADER}!${SASS_LOADER}?indentedSyntax`, // <style lang="sass">
              css: `${VUE_STYLE_LOADER}!${CSS_LOADER}`,
            },
          },
        },
        {
          test: /\.svg$/,
          loader: URL_LOADER,
          options: {
            limit: URL_LOADER_LIMIT,
            minetype: 'image/svg+xml',
            name: 'images/[hash].[ext]',
          },
        },
        {
          test: /\.(png|jpg|jpeg|gif)$/i,
          loader: URL_LOADER,
          options: {
            limit: URL_LOADER_LIMIT,
            name: 'images/[hash].[ext]',
          },
        },
      ],
    },

    resolve: {
      extensions: ['.js', '.jsx', '.json', '.vue'],
      alias: {
        'webpack-hot-client/client': require.resolve('webpack-hot-client/client'),
        // for vue hmr
        'vue-loader/node_modules/vue-hot-reload-api': require.resolve(
          'vue-hot-reload-api'
        ),
      },
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
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
        {
          libraryName: /^@alife\/next\/lib\/([^/]+)/,
          stylePath: 'style.js',
        },
        {
          libraryName: /^@alifd\/next\/lib\/([^/]+)/,
          stylePath: 'style.js',
        },
        {
          libraryName: /@alifd\/.*/,
          stylePath: 'style.js',
        },
      ]),
    ],
  };
}