const defaultConfig = require('./defaultPostcssConfig');

module.exports = () => ({
  ...defaultConfig,
  plugins: defaultConfig.plugins.map(([pluginName, pluginOptions]) => {
    // eslint-disable-next-line
    return require(pluginName)(pluginOptions);
  }),
});
