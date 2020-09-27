const path = require('path');
const getWebpackBase = require('rax-webpack-config');
const getBabelConfig = require('rax-babel-config');
const getEntryName = require('./getEntryName');
const EntryPlugin = require('./entryPlugin');

const EntryLoader = require.resolve('./entryLoader');

// Can‘t clone webpack chain object, so generate a new chain and reset config
module.exports = (context) => {
  const { userConfig, rootDir, webpack } = context;

  const babelConfig = getBabelConfig({
    styleSheet: true,
    jsxToHtml: true,
    // Note: rax-babel-config 1.0.0-1 不支持
    // isNode: true
  });

  const config = getWebpackBase({
    ...context,
    processBar: {
      name: 'SSR'
    },
    babelConfig,
  });

  config.target('node');

  const { inlineStyle = true } = userConfig;
  // build-plugin-rax-multi-pages is deprecated, but still need to be compatible.
  // eslint-disable-next-line
  // const isMultiPages = getValue('appType') === 'mpa' || !!~plugins.indexOf('build-plugin-rax-multi-pages');

  // eslint-disable-next-line
  const appJSON = require(path.resolve(rootDir, 'src/app.json'));
  const entries = appJSON.routes.map((route) => {
    return {
      name: getEntryName(route.path),
      sourcePath: path.join(rootDir, 'src', route.source),
      pagePath: route.path,
    };
  });

  config
    .plugin('DefinePlugin')
    .use(webpack.DefinePlugin, [{
      'process.env.__IS_SERVER__': true
    }])
    .end();

  config.plugin('entryPlugin')
    .use(EntryPlugin, [{
      entries,
      loader: EntryLoader,
      isMultiPages: false,
      isInlineStyle: inlineStyle,
      absoluteDocumentPath: path.join(rootDir, 'src/document/index.jsx'),
      absoluteShellPath: path.join(rootDir, 'src/shell/index.jsx'),
      absoluteAppPath: path.join(rootDir, 'src/app.ts'),
      absoluteAppConfigPath: path.join(rootDir, '.rax', 'appConfig.ts')
    }]);

  if (!inlineStyle) {
    // there is no need to generate css file in node
    config.module.rule('ignorecss')
      .test(/\.(css|less|saas|scss)?$/)
      .use('ignorecss')
      .loader(require.resolve('null-loader'))
      .end();
  }

  return config;
};
