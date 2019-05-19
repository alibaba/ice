/* eslint-disable indent */
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const deepAssign = require('deep-assign');
const postcssConfig = require('./postcssConfig');
const getBabelConfig = require('./getBabelConfig');

const TYPESCRIPT_LOADER = require.resolve('ts-loader');
const BABEL_LOADER = require.resolve('babel-loader');
const CSS_LOADER = require.resolve('css-loader');
const LESS_LOADER = require.resolve('less-loader');
const POSTCSS_LOADER = require.resolve('postcss-loader');
const SASS_LOADER = require.resolve('sass-loader');
const CSS_HOT_LOADER = require.resolve('css-hot-loader');
const URL_LOADER = require.resolve('url-loader');
const HANDLEBARS_LOADER = require.resolve('handlebars-loader');

const EXCLUDE_REGX = /node_modules/;
const URL_LOADER_LIMIT = 8192;

const defaultAssetsLoaderOpts = {
  name: 'assets/[hash].[ext]',
  limit: URL_LOADER_LIMIT,
};

const cssLoaderOpts = {
  sourceMap: true,
};

const cssModuleLoaderOpts = {
  ...cssLoaderOpts,
  modules: true,
  localIdentName: '[folder]--[local]--[hash:base64:7]',
};

module.exports = (chainConfig, mode = 'development') => {
  const babelConfig = getBabelConfig();

  function setExtralCSSLoader(lang, loaders) {
    const moduleTestReg = new RegExp(`\\.module\\.${lang}$`);
    const cssTestReg = new RegExp(`\\.${lang}$`);

    for (let i = 0; i < 2; i++) {
      const isModule = !!i;
      const ruleKey = `${lang}${isModule ? '-module' : ''}`;

      let rule = chainConfig.module.rule(ruleKey);

      if (isModule === true) {
        rule = rule.test(moduleTestReg);
      } else {
        rule = rule.test(cssTestReg);
      }

      if (mode !== 'production') {
        rule.use('css-hot-loader')
          .loader(CSS_HOT_LOADER);
      }

      rule.use('MiniCssExtractPlugin.loader')
        .loader(MiniCssExtractPlugin.loader);

      rule.use('css-loader')
        .loader(CSS_LOADER)
        .options(isModule ? cssModuleLoaderOpts : cssLoaderOpts);

      rule.use('postcss-loader')
        .loader(POSTCSS_LOADER)
        .options(Object.assign({ sourceMap: true }, postcssConfig));

      if (loaders && loaders.length > 0) {
        loaders.forEach((loader) => {
          const [loaderName, loaderPath, loaderOptions] = loader;

          rule.use(loaderName)
            .loader(loaderPath)
            .options(Object.assign({ sourceMap: true }, loaderOptions));
        });
      }
    }
  }

  function setAssetsLoader(type, test, loaderOpts) {
    const rule = chainConfig.module.rule(type).test(test);

    rule.use(type)
      .loader(URL_LOADER)
      .options(Object.assign(defaultAssetsLoaderOpts, loaderOpts));
  }

  // css loader
  setExtralCSSLoader('css');
  setExtralCSSLoader('scss', [['sass-loader', SASS_LOADER, {}]]);
  setExtralCSSLoader('less', [['less-loader', LESS_LOADER, { sourceMap: true, javascriptEnabled: true }]]);

  // assets loader
  setAssetsLoader('woff2', /\.woff2?$/, { minetype: 'application/font-woff' });
  setAssetsLoader('ttf', /\.ttf$/, { minetype: 'application/octet-stream' });
  setAssetsLoader('eot', /\.eot$/, { minetype: 'application/vnd.ms-fontobject' });
  setAssetsLoader('svg', /\.svg$/, { minetype: 'image/svg+xml' });
  setAssetsLoader('img', /\.(png|jpg|jpeg|gif)$/i);

  // jsx loader
  chainConfig.module.rule('jsx')
    .test(/\.jsx?$/)
    .exclude
      .add(EXCLUDE_REGX)
      .end()
    .use('babel-loader')
      .loader(BABEL_LOADER)
      .options(deepAssign({}, babelConfig, { cacheDirectory: true }));

  // tsx loader
  chainConfig.module.rule('tsx')
    .test(/\.tsx?$/)
    .exclude
      .add(EXCLUDE_REGX)
      .end()
    .use('babel-loader')
      .loader(BABEL_LOADER)
      .options(deepAssign({}, babelConfig, { cacheDirectory: true }))
      .end()
    .use('ts-loader')
      .loader(TYPESCRIPT_LOADER)
      .options({ transpileOnly: true });

  // handlebars loader
  chainConfig.module.rule('handlebars')
    .test(/\.hbs$/i)
    .use('handlebars-loader')
      .loader(HANDLEBARS_LOADER)
      .options({});
};
