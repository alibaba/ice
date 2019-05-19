const glob = require('glob');
const path = require('path');
const getFaviconPath = require('../../utils/getFaviconPath');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const log = require('../../utils/log');

/**
 * 根据 src/pages 推导 entry
 */
function getEntryByPages(context) {
  const entry = {};
  const indexFiles = glob.sync('src/pages/*/index.*', {
    cwd: context,
  });

  indexFiles.filter((indexFile) => {
    return ['.jsx', '.js', '.tsx', '.ts'].indexOf(path.extname(indexFile)) !== -1;
  }).forEach((indexFile) => {
    // src/pages/home/index.js => home
    const pageName = indexFile.split('/')[2].toLocaleLowerCase();

    entry[pageName] = indexFile;
  });

  return entry;
}

module.exports = (api) => {
  const { processEntry, chainWebpack, service: { paths } } = api;

  let entries = {};

  try {
    entries = getEntryByPages(paths.appDirectory);
    log.info('使用多页面模式', entries);
  } catch (err) {
    err.message = `getEntryByPages error, ${err.message}`;
    throw err;
  }

  chainWebpack((config) => {
    const mode = config.get('mode');

    const entriesNames = Object.keys(entries);

    // remove default entry then add new enrty to webpack config
    config.entryPoints.clear();
    config.merge({ entry: processEntry(entries) });

    // remove default HtmlWebpackPlugin
    config.plugins.delete('HtmlWebpackPlugin');

    // generate multiple html file
    entriesNames.forEach((entryName) => {
      const pluginKey = `HtmlWebpackPlugin_${entryName}`;
      config.plugin(pluginKey)
        .use(HtmlWebpackPlugin, [{
          excludeChunks: entriesNames.filter((n) => n !== entryName),
          filename: `${entryName}.html`,
          inject: true,
          templateParameters: {
            NODE_ENV: mode,
          },
          favicon: getFaviconPath([paths.appFaviconIco, paths.appFavicon]),
          template: paths.defaultAppHtml,
          minify: false,
        }])
        .end();
    });
  });
};
