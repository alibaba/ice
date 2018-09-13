const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const entry = {};
const targetPath = path.join(__dirname, './src/pages');
fs.readdirSync(targetPath).forEach(page => {
  if (
    fs.statSync(path.join(targetPath, page)).isDirectory() &&
    fs.existsSync(path.join(targetPath, page, 'index.jsx'))
  ) {
    entry[page] = path.join(targetPath, page, 'index.jsx');
  }
});
module.exports = {
  entry,
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].js',
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },
  module: {
    loaders: [
      {
        test: /\.js|jsx$/,
        exclude: [/node_modules/, /build\/lib/, /\.min\.js$/],
        use: 'babel-loader',
      },
      {
        test: /\.(s)?css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader'],
        }),
      },
      {
        test: /\.json?$/,
        exclude: /node_modules/,
        use: 'json-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new ExtractTextPlugin('[name].css'),
  ],
};
