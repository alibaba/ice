
const icePluginWrapCode = require('ice-plugin-wrap-code');
const getLoadScriptsCode = require('ice-plugin-wrap-externals/getLoadScriptsCode');
const getSmartLoaderCode = require('./getSmartLoaderCode');

module.exports = ({ chainWebpack, log, context }) => {
  const { userConfig } = context;
  // inject code of getLoadScriptsCode
  icePluginWrapCode({ chainWebpack, log }, {
    addCodeBefore: `var initLoadUrls = (window.externalUrls || []).concat(window.customUrls || []);
      ${getLoadScriptsCode()}
      __loadUrls__(initLoadUrls, function(){`,
    addCodeAfter: '})',
    id: 'loadUrl',
  });
  chainWebpack((config) => {
    // get outputAssetPath and outputDir
    const { outputAssetsPath, outputDir, hash } = userConfig;
    if (typeof hash === 'string') {
      const match = hash.match(/\[(\w+):?\]/);
      const hashType = match && match[1];
      if (hashType !== 'hash') {
        log.warn(`文件 hash 类型为：${hashType}，将不能通过 smart-loader 功能自动加载主入口 css 文件`);
      }
    }
    const entries = config.toConfig().entry;
    const rule = config.module.rule('runtime-publicPath').test(/\.jsx?|\.tsx?$/);
    Object.keys(entries).forEach((key) => {
      // only include entry path
      rule.include.add(new RegExp(entries[key][0]));
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
