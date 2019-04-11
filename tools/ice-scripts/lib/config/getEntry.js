// 读取需要编译的文件
const path = require('path');
const glob = require('glob');
const paths = require('./paths');
const log = require('../utils/log');

/**
 * 获取项目中符合 src/pages/xxxx/index.jsx 的文件
 *
 * @return {Object} entry 的 kv 对象
 */

module.exports = function getEntry(buildConfig, webpackRcConfig) {
  let entry;
  if (webpackRcConfig && webpackRcConfig.entry) {
    entry = webpackRcConfig.entry;
    log.info('使用 webpackrc 自定义 entry：', entry);
  } else if (buildConfig && buildConfig.entry) {
    entry = buildConfig.entry;
    log.info('使用 buildConfig 自定义 entry：', entry);
  } else {
    // 用户没配置 entry，走传统多页面模式
    try {
      entry = getEntryByPages();
      log.info('用户没定义 entry，使用传统多页面模式', entry);
    } catch (err) {
      err.message = `getEntryByPages error, ${err.message}`;
      throw err;
    }
  }

  return entry;
};


/**
 * 根据 src/pages 推导 entry
 */
function getEntryByPages() {
  const entry = {};
  const indexFiles = glob.sync('src/pages/*/index.*', {
    cwd: paths.appDirectory,
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
