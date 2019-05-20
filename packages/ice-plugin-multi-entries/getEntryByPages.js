const glob = require('glob');
const path = require('path');

const getPageName = (folder) => folder.toLocaleLowerCase();

/**
 * 根据 src/pages 推导 entry
 *
 * @param {string} context 匹配路径
 * @param {function?} getEntryName 自定义 entry name
 */
module.exports = function getEntryByPages(context, getEntryName) {
  const entry = {};
  const indexFiles = glob.sync('src/pages/*/index.*', {
    cwd: context,
  });

  indexFiles.filter((indexFile) => {
    return ['.jsx', '.js', '.tsx', '.ts'].indexOf(path.extname(indexFile)) !== -1;
  }).forEach((indexFile) => {
    // src/pages/home/index.js => home
    const folder = indexFile.split('/')[2];
    const pageName = typeof getEntryName === 'function'
      ? getEntryName(folder)
      : getPageName(folder);

    entry[pageName] = indexFile;
  });

  return entry;
};
