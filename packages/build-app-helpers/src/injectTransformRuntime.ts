import formatPath from './formatPath';

export default function(config) {
  ['jsx', 'tsx'].forEach((rule) => {
    config.module
      .rule(rule)
      .use('babel-loader')
      .tap((options) => {
        // get @babel/plugin-transform-runtime
        const babelPlugins = options.plugins || [];
        const targetPlugin = formatPath('@babel/plugin-transform-runtime');
        const pluginOptions = {
          corejs: false,
          helpers: false,
          regenerator: true,
          useESModules: false,
        };
        let addedTransformPlugin: boolean;
        const plugins = babelPlugins.map((plugin) => {
          if (typeof plugin === 'string' && formatPath(plugin).indexOf(targetPlugin) > -1
            || Array.isArray(plugin) && formatPath(plugin[0]).indexOf(targetPlugin) > -1 ) {
            addedTransformPlugin = true;
            return [Array.isArray(plugin) ? plugin[0] : plugin, pluginOptions];
          }
          return plugin;
        });
        if (!addedTransformPlugin) {
          plugins.push([require.resolve('@babel/plugin-transform-runtime'), pluginOptions]);
        }
        return Object.assign(options, { plugins });
      });
  });
}
