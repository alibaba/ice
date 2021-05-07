const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const deepClone = require('@builder/pack/deps/lodash').cloneDeep;
const getBabelConfig = require('../babel');

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
        .loader(require.resolve('@builder/pack/deps/css-loader'))
        .options(ruleKey === 'module' ? cssModuleLoaderOpts : cssLoaderOpts)
        .end()
      .use('postcss-loader')
        .loader(require.resolve('@builder/pack/deps/postcss-loader'))
        .options({ ...cssLoaderOpts, ...postcssOpts });

    loaders.forEach((loader) => {
      const [loaderName, loaderPath, loaderOpts = {}] = loader;
      rule.use(loaderName)
        .loader(loaderPath)
        .options({ ...cssLoaderOpts, ...loaderOpts });
    });
  });
};

module.exports = (config, mode = 'development') => {
  // css loader
  [
    ['css'],
    ['scss', [['sass-loader', require.resolve('@builder/pack/deps/sass-loader')]]],
    ['less', [['less-loader', require.resolve('@builder/pack/deps/less-loader'), { lessOptions: { javascriptEnabled: true } }]]],
  ].forEach(([style, loaders]) => {
    configCSSRule(config, style, mode, loaders || []);
  });

  const babelLoader = require.resolve('@builder/pack/deps/babel-loader');
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
