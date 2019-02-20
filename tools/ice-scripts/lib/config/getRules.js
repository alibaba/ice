const getBabelConfig = require('./getBabelConfig');
const colors = require('chalk');
const deepAssign = require('deep-assign');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

const postcssConfig = require('./postcssConfig');
const paths = require('./paths');

const AWESOME_TYPESCRIPT_LOADER = require.resolve('awesome-typescript-loader');
const BABEL_LOADER = require.resolve('babel-loader');
const CSS_LOADER = require.resolve('css-loader');
const LESS_LOADER = require.resolve('less-loader');
const POSTCSS_LOADER = require.resolve('postcss-loader');
const SASS_LOADER = require.resolve('sass-loader');
const CSS_HOT_LOADER = require.resolve('css-hot-loader');
const URL_LOADER = require.resolve('url-loader');
const URL_LOADER_LIMIT = 8192;

function withCssHotLoader(loaders) {
  if (process.env.NODE_ENV !== 'production' && !process.env.DISABLED_RELOAD) {
    return [CSS_HOT_LOADER].concat(loaders);
  }
  return loaders;
}
const CSS_LOADER_CONF = {
  loader: CSS_LOADER,
  options: {
    sourceMap: true,
  },
};

const CSS_MODULE_CONF = {
  loader: CSS_LOADER,
  options: {
    sourceMap: true,
    modules: true,
    localIdentName: '[folder]--[local]--[hash:base64:7]',
  },
};
module.exports = (buildConfig = {}, themeConfig) => {
  const babelConfig = getBabelConfig(buildConfig);
  const sassLoadersConf = [
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
    // eslint-disable-next-line no-console
    console.log(colors.green('Info:'), '使用主题包', theme);
  }

  const iceThemeLoaderConf = {
    loader: require.resolve('ice-skin-loader'),
    options: {
      themeFile:
        theme && path.join(paths.appNodeModules, `${theme}/variables.scss`),
      themeConfig,
    },
  };

  const sassLoaderConf = [
    CSS_LOADER_CONF,
    ...sassLoadersConf,
    iceThemeLoaderConf,
  ];
  const sassModuleConf = [
    CSS_MODULE_CONF,
    ...sassLoadersConf,
    iceThemeLoaderConf,
  ];
  // refs: https://github.com/webpack-contrib/mini-css-extract-plugin
  const miniCssExtractPluginLoader = { loader: MiniCssExtractPlugin.loader };

  if (paths.publicUrl === './') {
    miniCssExtractPluginLoader.options = { publicPath: '../' };
  }
  return [
    {
      test: /\.scss$/,
      exclude: /\.module\.scss$/,
      use: withCssHotLoader([miniCssExtractPluginLoader, ...sassLoaderConf]),
    },
    {
      test: /\.module\.scss$/,
      use: withCssHotLoader([miniCssExtractPluginLoader, ...sassModuleConf]),
    },
    {
      test: /\.css$/,
      exclude: /\.module\.css$/,
      use: withCssHotLoader([
        miniCssExtractPluginLoader,
        CSS_LOADER_CONF,
        {
          loader: POSTCSS_LOADER,
          options: Object.assign({ sourceMap: true }, postcssConfig),
        },
      ]),
    },
    {
      test: /\.module\.css$/,
      use: withCssHotLoader([
        miniCssExtractPluginLoader,
        CSS_MODULE_CONF,
        {
          loader: POSTCSS_LOADER,
          options: Object.assign({ sourceMap: true }, postcssConfig),
        },
      ]),
    },
    {
      test: /\.less$/,
      exclude: /\.module\.less$/,
      use: withCssHotLoader([
        miniCssExtractPluginLoader,
        CSS_LOADER_CONF,
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
      ]),
    },
    {
      test: /\.module\.less$/,
      use: withCssHotLoader([
        miniCssExtractPluginLoader,
        CSS_MODULE_CONF,
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
      ]),
    },
    {
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: BABEL_LOADER,
      options: deepAssign({}, babelConfig, { cacheDirectory: true }),
    },
    // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'
    {
      test: /\.tsx?$/,
      exclude: /node_modules/,
      use: [
        {
          loader: BABEL_LOADER,
          options: deepAssign({}, babelConfig, { cacheDirectory: true }),
        },
        {
          loader: AWESOME_TYPESCRIPT_LOADER,
          options: {
            useCache: false,
          },
        },
      ],
    },
    // extra url loader usage
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
        limit: URL_LOADER_LIMIT,
        name: 'assets/[hash].[ext]',
      },
    },
  ];
};
