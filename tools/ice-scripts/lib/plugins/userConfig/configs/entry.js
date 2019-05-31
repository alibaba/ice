const HtmlWebpackPlugin = require('html-webpack-plugin');

// entry: string | array
// entry : { [name]: string | array }
module.exports = ({ chainWebpack }, value) => {
  chainWebpack((config) => {
    let entry;
    if (Array.isArray(value) || typeof value === 'string') {
      entry = {
        index: value,
      };
    } else if (Object.prototype.toString.call(value) === '[object Object]') {
      entry = value;
    }

    const entryNames = Object.keys(entry);
    const isMultiEntry = entryNames.length > 1;
    let pluginConfig = {};
    if (isMultiEntry) {
      pluginConfig = { ...config.plugin('HtmlWebpackPlugin').get('args')[0] };
      // remove default HtmlWebpackPlugin
      config.plugins.delete('HtmlWebpackPlugin');
    }
    // generate multiple html file
    // webpack-chain entry must be [name]: [...values]
    entryNames.forEach((entryName) => {
      const entryValue = entry[entryName];
      entry[entryName] = typeof entryValue === 'string' ? [entryValue] : entryValue;
      if (isMultiEntry) {
        const pluginKey = `HtmlWebpackPlugin_${entryName}`;
        config.plugin(pluginKey)
          .use(HtmlWebpackPlugin, [{
            ...pluginConfig,
            excludeChunks: entryNames.filter((n) => n !== entryName),
            filename: `${entryName}.html`,
            inject: true,
          }]);
      }
    });
    // remove default entry then add new enrty to webpack config
    config.entryPoints.clear();
    config.merge({ entry });
  });
};
