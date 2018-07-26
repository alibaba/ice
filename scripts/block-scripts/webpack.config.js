const deepAssign = require('deep-assign');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const BABEL_LOADER = require.resolve('babel-loader');
const CSS_LOADER = require.resolve('css-loader');
const LESS_LOADER = require.resolve('less-loader');
const POSTCSS_LOADER = require.resolve('postcss-loader');
const SASS_LOADER = require.resolve('sass-loader');
const CSS_HOT_LOADER = require.resolve('css-hot-loader');
const URL_LOADER = require.resolve('url-loader');
const URL_LOADER_LIMIT = 8192;

const postcssConfig = require('./postcssConfig');
const babelConfig = require('./babelConfig');

module.exports = (context, filename, outputPath) => {
  return {
    mode: 'production',
    context,
    entry: './src/index.js',
    resolve: {
      extensions: ['.js', '.jsx', '.json'],
    },
    output: {
      filename,
      path: outputPath,
    },
    externals: {
      react: 'react',
      'react-dom': 'react-dom',
    },
    module: {
      rules: [
        // SCSS 配置
        {
          test: /\.scss$/,
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
              loader: SASS_LOADER,
              options: {
                sourceMap: true,
              },
            },
          ],
        },

        // CSS 配置
        {
          test: /\.css$/,
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
        },

        // LESS 配置
        {
          test: /\.less$/,
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
        },

        // JSX 配置
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: BABEL_LOADER,
          options: deepAssign({}, babelConfig(), { cacheDirectory: true }),
        },

        // EXTRA URL 配置
        {
          test: /\.woff2?$/,
          loader: URL_LOADER,
          options: {
            limit: URL_LOADER_LIMIT,
            minetype: 'application/font-woff',
            name: 'assets/[hash].[ext]',
          },
        },
        {
          test: /\.ttf$/,
          loader: URL_LOADER,
          options: {
            limit: URL_LOADER_LIMIT,
            minetype: 'application/octet-stream',
            name: 'assets/[hash].[ext]',
          },
        },
        {
          test: /\.eot$/,
          loader: URL_LOADER,
          options: {
            limit: URL_LOADER_LIMIT,
            minetype: 'application/vnd.ms-fontobject',
            name: 'assets/[hash].[ext]',
          },
        },
        {
          test: /\.svg$/,
          loader: URL_LOADER,
          options: {
            limit: URL_LOADER_LIMIT,
            minetype: 'image/svg+xml',
            name: 'assets/[hash].[ext]',
          },
        },
        {
          test: /\.(png|jpg|jpeg|gif)$/i,
          loader: URL_LOADER,
          options: {
            limit: Infinity,
            name: 'assets/[hash].[ext]',
          },
        },
      ],
    },
  };
};
