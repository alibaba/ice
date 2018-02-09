const getBabelConfig = require('./getBabelConfig');
const colors = require('chalk');
const deepAssign = require('deep-assign');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

const postcssConfig = require('./postcssConfig');

const BABEL_LOADER = require.resolve('babel-loader');
const CSS_LOADER = require.resolve('css-loader');
const LESS_LOADER = require.resolve('less-loader');
const POSTCSS_LOADER = require.resolve('postcss-loader');
const SASS_LOADER = require.resolve('sass-loader');
const STYLE_LOADER = require.resolve('style-loader');
const CSS_HOT_LOADER = require.resolve('css-hot-loader');

function withCssHotLoader(loaders) {
  if (process.env.NODE_ENV !== 'production') {
    return [CSS_HOT_LOADER].concat(loaders);
  }
  return loaders;
}

module.exports = (paths, buildConfig = {}) => {
  const babelConfig = getBabelConfig(buildConfig);
  const sassLoaders = [
    {
      loader: CSS_LOADER,
      options: {
        sourceMap: true,
      },
    },
    {
      loader: POSTCSS_LOADER,
      options: Object.assign({ sourceMap: true }, postcssConfig),
    },
    {
      loader: SASS_LOADER,
      options: {
        sourceMap: true,
      },
    },
  ];

  const theme = buildConfig.theme || buildConfig.themePackage;
  if (theme) {
    console.log(colors.cyan('Tip:'), '使用皮肤包', theme);
    sassLoaders.push({
      loader: require.resolve('ice-skin-loader'),
      options: {
        themeFile: path.join(paths.appNodeModules, `${theme}/variables.scss`),
      },
    });
  }
  return [
    {
      test: /\.scss$/,
      use: withCssHotLoader(
        ExtractTextPlugin.extract({
          fallback: STYLE_LOADER,
          use: sassLoaders,
        })
      ),
    },
    {
      test: /\.css$/,
      use: withCssHotLoader(
        ExtractTextPlugin.extract({
          fallback: STYLE_LOADER,
          use: [
            {
              loader: CSS_LOADER,
              options: {
                sourceMap: true,
              },
            },
            {
              loader: POSTCSS_LOADER,
              options: Object.assign({ sourceMap: true }, postcssConfig),
            },
          ],
        })
      ),
    },
    {
      test: /\.less$/,
      use: withCssHotLoader(
        ExtractTextPlugin.extract({
          fallback: STYLE_LOADER,
          use: [
            {
              loader: CSS_LOADER,
              options: {
                sourceMap: true,
              },
            },
            {
              loader: POSTCSS_LOADER,
              options: Object.assign({ sourceMap: true }, postcssConfig),
            },
            {
              loader: LESS_LOADER,
              options: {
                sourceMap: true,
              },
            },
          ],
        })
      ),
    },
    {
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: BABEL_LOADER,
      options: deepAssign({}, babelConfig, { cacheDirectory: true }),
    },
  ];
};
