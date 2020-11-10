const { injectTransformRuntime } = require('@builder/app-helpers');
const addBablePlugins = require('../utils/addBabelPlugins');

module.exports = (config, injectBabel, context) => {
  const { userConfig } = context;
  const { targets = [] } = userConfig;
  if (targets.includes('miniapp') || targets.includes('wechat-miniprogram')
  || Object.prototype.hasOwnProperty.call(userConfig, 'polyfill')) {
    return;
  }
  if (injectBabel === 'runtime') {
    injectTransformRuntime(config);
  } else if (injectBabel === 'polyfill') {
    const entries = config.toConfig().entry;
    const rule = config.module.rule('polyfill').test(/\.jsx?|\.tsx?$/);
    const fileList = [];
    if (!entries) return;
    Object.keys(entries).forEach((key) => {
      let addPolyfill = false;
      // only include entry path
      for (let i = 0; i < entries[key].length; i += 1) {
        // filter node_modules file add by plugin
        if (!/node_modules/.test(entries[key][i])) {
          rule.include.add(entries[key][i]);
          fileList.push(entries[key][i]);
          addPolyfill = true;
          break;
        }
      }
      if (!addPolyfill) {
        rule.include.add(entries[key][0]);
        fileList.push(entries[key][0]);
      }
    });
    rule.use('polyfill-loader').loader(require.resolve('../utils/polyfillLoader')).options({});
    addBablePlugins(config, [[require.resolve('../utils/babelPluginCorejsLock.js'), { fileList }]]);
  }
};
