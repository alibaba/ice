module.exports = (config, webpackPlugins, context) => {
  if (webpackPlugins) {
    const pluginNames = Object.keys(webpackPlugins);
    pluginNames.forEach((pluginName) => {
      const { options, after, before } = webpackPlugins[pluginName];
      let plguinRule = null;
      // check if plugin has been already registed
      if (config.plugins.has(pluginName)) {
        // modify plugin options
        plguinRule = config.plugin(pluginName).tap(([args]) => [{...args, ...options}]);
      } else {
        // add new plugin
        let plugin = null;
        if (pluginName.match(/^webpack\./)) {
          // webpack builtin plugins
          const { webpack } = context;
          plugin = webpack[pluginName];
        } else {
          // eslint-disable-next-line
          plugin = require(pluginName);
        }
        plguinRule = config.plugin(pluginName).use(plugin, [options]);
      }
      if (before) plguinRule.before(before);
      if (after) plguinRule.after(after);
    });
  }
};