module.exports = (config, webpackPlugins, context) => {
  if (webpackPlugins) {
    const pluginNames = Object.keys(webpackPlugins);
    pluginNames.forEach((pluginName) => {
      const { options, after, before } = webpackPlugins[pluginName];
      let pluginRule = null;
      // check if plugin has been already registed
      if (config.plugins.has(pluginName)) {
        // modify plugin options
        pluginRule = config.plugin(pluginName).tap(([args]) => [{...args, ...options}]);
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
        pluginRule = config.plugin(pluginName).use(plugin, [options]);
      }
      if (before) pluginRule.before(before);
      if (after) pluginRule.after(after);
    });
  }
};
