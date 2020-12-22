const plugins = require('./defaultPostcssPlugins');

module.exports = () => ({
  plugins: plugins.map(([pluginName, pluginOptions]) => {
    // eslint-disable-next-line
    return require(pluginName)(pluginOptions);
  }),
});

exports.pluginsConfig = plugins;