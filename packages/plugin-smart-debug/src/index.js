const path = require('path');
const buildPluginWrapCode = require('build-plugin-wrap-code');
const getLoadScriptsCode = require('build-plugin-load-assets/lib/getLoadScriptsCode');
const getSmartLoaderCode = require('./getSmartLoaderCode');

module.exports = ({ onGetWebpackConfig, log, context, ...restApi }) => {
  const { userConfig, rootDir } = context;
  // inject code of getLoadScriptsCode
  buildPluginWrapCode({ onGetWebpackConfig, log, context, ...restApi }, {
    addCodeBefore: `var initLoadUrls = (window.assetsUrls || []).concat(window.customUrls || []);
      ${getLoadScriptsCode()}
      __loadUrls__(initLoadUrls, function(){`,
    addCodeAfter: '})',
    id: 'loadUrl',
  });
  onGetWebpackConfig((config) => {
    // get outputAssetPath and outputDir
    const { outputAssetsPath, outputDir, hash } = userConfig;
    if (typeof hash === 'string') {
      const match = hash.match(/(\w+):?/);
      const hashType = match && match[1];
      if (hashType && hashType !== 'hash') {
        log.warn(`文件 hash 类型为：${hashType}，将不能通过 smart-loader 功能自动加载主入口 css 文件`);
      }
    }
    const entries = config.toConfig().entry;
    const rule = config.module.rule('runtime-publicPath').test(/\.jsx?|\.tsx?$/);
    Object.keys(entries).forEach((key) => {
      // only include entry path
      rule.include.add(new RegExp(path.resolve(rootDir, entries[key][0])));
    });
    rule.use('publicpath-loader').loader(require.resolve('./runtimePublicPathLoader')).options({});
    rule.before('jsx');
    config.plugin('loadUrlWrapCodePlugin').tap(([options]) => [
      { ...options,
        addCodeBefore: `${getSmartLoaderCode({ outputAssetsPath, outputDir })}
          ${options.addCodeBefore || ''}`,
      },
    ]);
  });
};
