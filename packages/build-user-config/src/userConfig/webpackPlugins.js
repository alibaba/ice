module.exports = (config, webpackPlugins, context) => {
  if (webpackPlugins) {
    const pluginNames = Object.keys(webpackPlugins);
    pluginNames.forEach((pluginName) => {
      // check if plugin has been already registed
      if (config.plugins.has(pluginName)) {
        // modify plugin options
        config.plugin(pluginName).tap(([args]) => [{...args, ...webpackPlugins[pluginName]}]);
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
        config.plugin(pluginName).use(plugin, [webpackPlugins[pluginName]]);
      }
    });
  }
};