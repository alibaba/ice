const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const deepClone = require('lodash.clonedeep');
const getBabelConfig = require('../babel');

const URL_LOADER_LIMIT = 8192;
const EXCLUDE_REGX = /node_modules/;
// config css rules
const configCSSRule = (config, style, mode, loaders = []) => {
  const cssModuleReg = new RegExp(`\\.module\\.${style}$`);
  const styleReg = new RegExp(`\\.${style}$`);
  const cssLoaderOpts = {
    sourceMap: true,
  };
  const cssModuleLoaderOpts = {
    ...cssLoaderOpts,
    modules: {
      localIdentName: '[folder]--[local]--[hash:base64:7]',
    },
  };
  const postcssOpts = {
    config: {
      path: __dirname,
    },
  };

  // add both rule of css and css module
  ['css', 'module'].forEach((ruleKey) => {
    let rule;
    if (ruleKey === 'module') {
      rule = config.module.rule(`${style}-module`)
        .test(cssModuleReg);
    } else {
      rule = config.module.rule(style)
        .test(styleReg)
          .exclude.add(cssModuleReg).end();
    }

    rule
      .use('MiniCssExtractPlugin.loader')
        .loader(MiniCssExtractPlugin.loader)
        // compatible with commonjs syntax: const styles = require('./index.module.less')
        .options({
          esModule: false,
        })
        .end()
      .use('css-loader')
        .loader(require.resolve('css-loader'))
        .options(ruleKey === 'module' ? cssModuleLoaderOpts : cssLoaderOpts)
        .end()
      .use('postcss-loader')
        .loader(require.resolve('postcss-loader'))
        .options({ ...cssLoaderOpts, ...postcssOpts });

    loaders.forEach((loader) => {
      const [loaderName, loaderPath, loaderOpts = {}] = loader;
      rule.use(loaderName)
        .loader(loaderPath)
        .options({ ...cssLoaderOpts, ...loaderOpts });
    });
  });
};

const configAssetsRule = (config, type, testReg, loaderOpts = {}) => {
  config.module.rule(type).test(testReg).use(type)
    .loader(require.resolve('url-loader'))
    .options({
      name: 'assets/[hash].[ext]',
      limit: URL_LOADER_LIMIT,
      ...loaderOpts,
    });
};

module.exports = (config, mode = 'development') => {
  // css loader
  [
    ['css'],
    ['scss', [['sass-loader', require.resolve('sass-loader')]]],
    ['less', [['less-loader', require.resolve('less-loader'), { lessOptions: { javascriptEnabled: true } }]]],
  ].forEach(([style, loaders]) => {
    configCSSRule(config, style, mode, loaders || []);
  });

  [
    ['woff2', /\.woff2?$/, { mimetype: 'application/font-woff' }],
    ['ttf', /\.ttf$/, { mimetype: 'application/octet-stream' }],
    ['eot', /\.eot$/, { mimetype: 'application/vnd.ms-fontobject' }],
    ['svg', /\.svg$/, { mimetype: 'image/svg+xml' }],
    ['img', /\.(png|jpg|webp|jpeg|gif)$/i],
  ].forEach(([type, reg, opts]) => {
    configAssetsRule(config, type, reg, opts || {});
  });

  const babelLoader = require.resolve('babel-loader');
  const babelConfig = getBabelConfig();
  // js loader
  config.module.rule('jsx')
    .test(/\.jsx?$/)
    .exclude
      .add(EXCLUDE_REGX)
      .end()
    .use('babel-loader')
      .loader(babelLoader)
      .options({ ...deepClone(babelConfig), cacheDirectory: true });

  // ts loader
  config.module.rule('tsx')
    .test(/\.tsx?$/)
    .exclude
      .add(EXCLUDE_REGX)
      .end()
    .use('babel-loader')
      .loader(babelLoader)
      .options({ ...deepClone(babelConfig), cacheDirectory: true })
      .end()
    .use('ts-loader')
      .loader(require.resolve('ts-loader'))
      .options({ transpileOnly: true });
};
