const path = require('path');
const { injectTransformRuntime } = require('@builder/app-helpers');
const processPresetEnv  = require('../utils/processPresetEnv');
const addBablePlugins = require('../utils/addBabelPlugins');

const getEntryRegExp = (entryPath) => {
  const entryExtname = path.extname(entryPath);
  // this will work in both windows and Unix : { test: /path[\\\/]to[\\\/]file/ }
  return entryExtname ? entryPath : new RegExp(`${entryPath.split(path.sep).join('[\\\\\\/]')}(.jsx?|.tsx?)$`);
};

module.exports = (config, polyfill) => {
  const presetEnvParam = {
    useBuiltIns: polyfill
  };
  if (typeof polyfill === 'string') {
    presetEnvParam.corejs = 3;
    if (polyfill === 'entry') {
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
            rule.include.add(getEntryRegExp(entries[key][i]));
            fileList.push(entries[key][i]);
            addPolyfill = true;
            break;
          }
        }
        if (!addPolyfill) {
          rule.include.add(getEntryRegExp(entries[key][0]));
          fileList.push(entries[key][0]);
        }
      });
      rule.use('polyfill-loader').loader(require.resolve('../utils/polyfillLoader')).options({});
      addBablePlugins(config, [[require.resolve('../utils/babelPluginCorejsLock.js'), { fileList }]]);
    } else {
      injectTransformRuntime(config);
    }
  } else if (polyfill === false) {
    // inject async/await polyfill
    injectTransformRuntime(config);
  }
  processPresetEnv(config, presetEnvParam);
};
