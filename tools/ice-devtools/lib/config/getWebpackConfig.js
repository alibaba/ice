const merge = require('webpack-merge');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const getBabelConfig = require('./getBabelConfig');
const blockTemplate = require.resolve('../template/block.hbs');
const BABEL_LOADER = require.resolve('babel-loader');
const STYLE_LOADER = require.resolve('style-loader');
const CSS_LOADER = require.resolve('css-loader');
const SASS_LOADER = require.resolve('sass-loader');
const VUE_STYLE_LOADER = require.resolve('vue-style-loader');
const VUE_LOADER = require.resolve('vue-loader');
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
    vue: 'Vue',
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
    ]),
  ],
};

module.exports = function getWebpackConfig(entry) {
  const config = { entry };

  return merge(baseConfig, config);
};
