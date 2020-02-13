const path = require('path');
const formatWinPath = require('../utils/formatWinPath');

module.exports = (config, injectBabel) => {
  if (injectBabel === 'runtime') {
    ['jsx', 'tsx'].forEach((rule) => {
      config.module
        .rule(rule)
        .use('babel-loader')
        .tap((options) => {
          // get @babel/plugin-transform-runtime
          const babelPlugins = options.plugins || [];
          const targetPlugin = formatWinPath('@babel/plugin-transform-runtime');
          const plguinOption = {
            corejs: false,
            helpers: true,
            regenerator: true,
            useESModules: false,
          };
          const plugins = babelPlugins.map((plugin) => {
            if ((typeof plugin === 'string' && formatWinPath(plugin).indexOf(targetPlugin) > -1)
              || (Array.isArray(plugin) && formatWinPath(plugin[0]).indexOf(targetPlugin) > -1 )) {
              return [Array.isArray(plugin) ? plugin[0] : plugin, plguinOption];
            } else {
              return [require.resolve('@babel/plugin-transform-runtime'), plguinOption];
            }
          });
          return Object.assign(options, { plugins });
        });
    });
  } else if (injectBabel === 'polyfill') {
    const entries = config.toConfig().entry;
    const rule = config.module.rule('polyfill').test(/\.jsx?|\.tsx?$/);
    Object.keys(entries).forEach((key) => {
      let addPolyfill = false;
      // only include entry path
      for (let i = 0; i < entries[key].length; i += 1) {
        // filter node_modules file add by plugin
        if (!/node_modules/.test(entries[key][i])) {
          rule.include.add(entries[key][i]);
          addPolyfill = true;
          break;
        }
      }
      if (!addPolyfill) {
        rule.include.add(entries[key][0]);
      }
    });
    rule.use('polyfill-loader').loader(require.resolve('../utils/polyfillLoader')).options({});

    // add resolve modules for get core-js and regenerator-runtime
    const modulePath = require.resolve('core-js');
    const pathArr = modulePath.split('node_modules');
    pathArr.pop(); // pop file path
    config.resolve.modules.prepend(path.join(pathArr.join('node_modules'), 'node_modules'));
  }
};
