const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WebpackPluginImport = require('..');

const config = {
  entry: require.resolve('./entry.js'),
  module: {
    rules: [
      {
        test: /\.jsx?/i,
        use: 'babel-loader',
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader'],
        }),
      },
    ],
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
    new ExtractTextPlugin('style.css'),
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
  console.log(stats.toString({
    colors: true,
    modules: false,
  }));
});
