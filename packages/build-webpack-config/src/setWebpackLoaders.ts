import * as MiniCssExtractPlugin from 'mini-css-extract-plugin';
import getBabelConfig from '@builder/babel-config';
import { cloneDeep } from '@builder/pack/deps/lodash';

const EXCLUDE_REGX = /node_modules/;

// config css rules
const configCSSRule = (config, style, loaders = []) => {
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
    postcssOptions: {
      // eslint-disable-next-line global-require
      ...(require('./postcss.config').default()),
    }
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

export default (config) => {
  // css loader
  [
    ['css'],
    ['scss', [['sass-loader', require.resolve('@builder/pack/deps/sass-loader')]]],
    ['less', [['less-loader', require.resolve('@builder/pack/deps/less-loader'), { lessOptions: { javascriptEnabled: true } }]]],
  ].forEach(([style, loaders]) => {
    configCSSRule(config, style, (loaders as any) || []);
  });

  // Add babel loader
  const babelLoader = require.resolve('@builder/pack/deps/babel-loader');
  const babelConfig = getBabelConfig();
  ['jsx', 'tsx'].forEach(ruleName => {
    const testRegx = new RegExp(`\\.${ruleName}?$`);
    config.module.rule(ruleName)
      .test(testRegx)
      .exclude
      .add(EXCLUDE_REGX)
      .end()
      .use('babel-loader')
      .loader(babelLoader)
      .options({ ...cloneDeep(babelConfig)});
  });
};
