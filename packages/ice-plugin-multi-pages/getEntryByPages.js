const glob = require('glob');
const path = require('path');

const getDefaultEntryName = (pageName) => pageName.toLocaleLowerCase();

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
    const pageName = indexFile.split('/')[2];
    const entryName = typeof getEntryName === 'function'
      ? getEntryName(pageName)
      : getDefaultEntryName(pageName);

    entry[entryName] = indexFile;
  });

  return entry;
};
