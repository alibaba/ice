/* eslint-disable indent */
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const deepAssign = require('deep-assign');
const postcssConfig = require('./postcssConfig');
const getBabelConfig = require('./getBabelConfig');

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

  function setExtralCSSLoader(lang, loader, options) {
    const moduleTestReg = new RegExp(`\\.module\\.${lang}$`);
    const cssTestReg = new RegExp(`\\.${lang}$`);

    for (let i = 0; i < 2; i++) {
      const isModule = !!i;
      const ruleKey = `${lang}${isModule ? '-module' : ''}`;

      let rule = chainConfig.module.rule(ruleKey);

      if (isModule === true) {
        rule = rule.test(moduleTestReg);
      } else {
        rule = rule.test(cssTestReg).exclude(moduleTestReg);
      }

      if (mode !== 'production') {
        rule.use('css-hot-loader')
          .loader('css-hot-loader');
      }

      rule.use('MiniCssExtractPlugin.loader')
        .loader(MiniCssExtractPlugin.loader)
        .option({
          // TODO: hard code
          publicPath: './',
        });

      rule.use('css-loader')
        .loader('css-loader')
        .option(isModule ? cssModuleLoaderOpts : cssLoaderOpts);

      rule.use('postcss-loader')
        .loader('postcss-loader')
        .option(Object.assign({ sourceMap: true }, postcssConfig));

      if (loader) {
        rule.use(loader)
          .loader(loader)
          .option(Object.assign({ sourceMap: true }, options));
      }
    }
  }

  function setAssetsLoader(type, test, loaderOpts) {
    const rule = chainConfig.module.rule(type).test(test);

    rule.use(type)
      .loader('url-loader')
      .option(Object.assign(defaultAssetsLoaderOpts, loaderOpts));
  }


  // jsx loader
  chainConfig.module.rule('jsx')
    .test(/\.jsx?$/)
    .exclude(EXCLUDE_REGX)
    .use('babel-loader')
    .options(deepAssign({}, babelConfig, { cacheDirectory: true }));

  // tsx loader
  chainConfig.module.rule('tsx')
    .test(/\.tsx?$/)
    .exclude(EXCLUDE_REGX)
    .use('babel-loader')
      .loader('babel-loader')
      .options(deepAssign({}, babelConfig, { cacheDirectory: true }))
      .end()
    .use('ts-loader')
      .loader('ts-loader')
      .options({ transpileOnly: true });

  // handlebars loader
  chainConfig.module.rule('handlebars')
    .test(/\.hbs$/i)
    .use('handlebars-loader')
      .loader('handlebars-loader')
      .option({});

  // css loader
  setExtralCSSLoader('css');
  setExtralCSSLoader('scss', 'sass-loader', { sourceMap: true });
  setExtralCSSLoader('less', 'less-loader', { sourceMap: true, javascriptEnabled: true });

  // assets loader
  setAssetsLoader('woff2', /\.woff2?$/, { minetype: 'application/font-woff' });
  setAssetsLoader('ttf', /\.ttf$/, { minetype: 'application/octet-stream' });
  setAssetsLoader('eot', /\.eot$/, { minetype: 'application/vnd.ms-fontobject' });
  setAssetsLoader('svg', /\.svg$/, { minetype: 'image/svg+xml' });
  setAssetsLoader('img', /\.(png|jpg|jpeg|gif)$/i);
};
