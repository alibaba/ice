module.exports = (api, injectBabel) => {
  api.chainWebpack((config) => {
    if (injectBabel === 'runtime') {
      ['jsx', 'tsx'].forEach((rule) => {
        config.module
          .rule(rule)
          .use('babel-loader')
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
      });
    }
  });
};
