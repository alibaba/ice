const processEntry = require('../../../config/processEntry');

const DEFAULT_ENTRY = 'src/index.js';
module.exports = (api, injectBabel) => {
  const { command, commandArgs, userConfig } = api.service;

  api.chainWebpack((config) => {
    if (!userConfig.entry) {
      config.delete('entry').merge({
        entry: processEntry(DEFAULT_ENTRY, {
          polyfill: injectBabel !== 'runtime',
          hotDev: command === 'dev' && !commandArgs.disabledReload,
        }),
      });
    }
    if (injectBabel === 'runtime') {
      config.module
        .rule('compile')
        .use('babel')
        .tap((options) => {
          // get @babel/plugin-transform-runtime
          const babelPlugins = options.plugins || [];
          const targetPlugin = require.resolve('@babel/plugin-transform-runtime');
          const plugins = babelPlugins.map((plugin) => {
            if ((typeof plugin === 'string' && plugin === targetPlugin)
              || (Array.isArray(plugin) && plugin[0] === targetPlugin)) {
              return [targetPlugin, {
                corejs: false,
                helpers: true,
                regenerator: true,
                useESModules: false,
              }];
            }
            return plugin;
          });
          return Object.assign(options, { plugins });
        });
    }
  });
};
