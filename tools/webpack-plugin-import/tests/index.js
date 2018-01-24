const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WebpackPluginImport = require('..');

const config = {
  entry: './entry.js',
  module: {
    rules: [
      { test: /\.jsx?/i, use: 'babel-loader' },
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
    filename: 'dist.js',
  },
  plugins: [
    new ExtractTextPlugin('style.css'),
    new WebpackPluginImport({

    }),
  ],
};

webpack(config, (err, stats) => {
  console.log(stats.toString({
    colors: true,
  }));
});
