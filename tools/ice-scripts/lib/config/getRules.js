const getBabelConfig = require('./getBabelConfig');
const deepAssign = require('deep-assign');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

const postcssConfig = require('./postcssConfig');
const paths = require('./paths');
const cliInstance = require('../utils/cliInstance');
const log = require('../utils/log');

const TYPESCRIPT_LOADER = require.resolve('ts-loader');
const BABEL_LOADER = require.resolve('babel-loader');
const CSS_LOADER = require.resolve('css-loader');
const LESS_LOADER = require.resolve('less-loader');
const POSTCSS_LOADER = require.resolve('postcss-loader');
const SASS_LOADER = require.resolve('sass-loader');
const CSS_HOT_LOADER = require.resolve('css-hot-loader');
const URL_LOADER = require.resolve('url-loader');
const ICE_SKIN_LOADER = require.resolve('ice-skin-loader');
const HANDLEBARS_LOADER = require.resolve('handlebars-loader');
const DEMO_LOADER = require.resolve('../plugins/loaders/componentDemoLoader');

const URL_LOADER_LIMIT = 8192;

function withCssHotLoader(loaders) {
  if (process.env.NODE_ENV !== 'production' && !cliInstance.get('disabledReload')) {
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

  let babelExclude = /node_modules/;
  if (buildConfig.babelExclude) {
    // 某个依赖包需要 babel 编译（不同 npm 路径可能不同）：babelExclude: "node_modules\\/(?!_@ali_lib-ucc)"
    // node_modules 都需要编译：babelExclude: "bower_components"，随便配置一个奇怪的地址覆盖默认值即可
    babelExclude = new RegExp(buildConfig.babelExclude);
    log.info('配置了 babelExclude，new RegExp() 转化后的值：', babelExclude);
  }

  const theme = buildConfig.theme || buildConfig.themePackage;
  if (theme) {
    log.info('使用主题包', theme);
  }

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
    {
      loader: ICE_SKIN_LOADER,
      options: {
        themeFile:
          theme && path.join(paths.appNodeModules, `${theme}/variables.scss`),
        themeConfig,
      },
    },
  ];

  const sassLoaderConf = [
    CSS_LOADER_CONF,
    ...sassLoadersConf,
  ];
  const sassModuleConf = [
    CSS_MODULE_CONF,
    ...sassLoadersConf,
  ];
  // refs: https://github.com/webpack-contrib/mini-css-extract-plugin
  const miniCssExtractPluginLoader = { loader: MiniCssExtractPlugin.loader };

  // 一些后端路由的情况下 publicPath会设为'./'， 需处理构建后资源引用的相对地址
  const shouldUseRelativeAssetPaths = paths.publicPath === './';
  // buildConfig.localization为true的情况publicPath将被指定为'./'
  if (shouldUseRelativeAssetPaths) {
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
            // https://github.com/ant-design/ant-motion/issues/44
            javascriptEnabled: true,
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
      exclude: babelExclude,
      loader: BABEL_LOADER,
      options: deepAssign({}, babelConfig, { cacheDirectory: true }),
    },
    // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'
    {
      test: /\.tsx?$/,
      exclude: babelExclude,
      use: [
        {
          loader: BABEL_LOADER,
          options: deepAssign({}, babelConfig, { cacheDirectory: true }),
        },
        {
          loader: TYPESCRIPT_LOADER,
          // disable type checker
          options: { transpileOnly: true },
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
    {
      test: /\.md$/i,
      loader: DEMO_LOADER,
      options: {},
    },
    {
      test: /\.hbs$/i,
      loader: HANDLEBARS_LOADER,
      options: {},
    },
  ];
};
