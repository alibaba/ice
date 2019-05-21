const HtmlWebpackPlugin = require('html-webpack-plugin');

const getEntryByPages = require('./getEntryByPages.js');

module.exports = (api, options = {}) => {
  const { chainWebpack, service: { context }, log } = api;
  let entries = {};

  try {
    entries = getEntryByPages(context, options.getEntryName);
    log.info('使用多页面模式', entries);
  } catch (err) {
    err.message = `get entries error, ${err.message}`;
    throw err;
  }

  chainWebpack((config) => {
    const entriesNames = Object.keys(entries);

    // remove default entry then add new enrty to webpack config
    config.entryPoints.clear();
    config.merge({ entry: entries });

    const webpackPluginCfg = { ...config.plugin('HtmlWebpackPlugin').get('args')[0] };

    // remove default HtmlWebpackPlugin
    config.plugins.delete('HtmlWebpackPlugin');

    // generate multiple html file
    entriesNames.forEach((entryName) => {
      const pluginKey = `HtmlWebpackPlugin_${entryName}`;
      config.plugin(pluginKey)
        .use(HtmlWebpackPlugin, [{
          ...webpackPluginCfg,
          excludeChunks: entriesNames.filter((n) => n !== entryName),
          filename: `${entryName}.html`,
          inject: true,
        }])
        .end();
    });
  });
};
