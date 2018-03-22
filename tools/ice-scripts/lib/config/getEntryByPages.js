const fs = require('fs');
const path = require('path');
const colors = require('chalk');

const walk = function walk(dir) {
  var results = [];
  var list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = dir + '/' + file;
    var stat = fs.statSync(file);
    if (stat && stat.isDirectory()) results = results.concat(walk(file));
    else results.push(file);
  });
  return results;
};

module.exports = () => {
  var entryObj = {};
  var entryDir = './src';

  try {
    // 获取当前目录下所有文件
    var files = walk(entryDir);
    files.forEach(function(filePath) {
      var fileExt = path.extname(filePath);
      var fileBasename = path.basename(filePath, fileExt);
      var pageFile = path.relative(entryDir, filePath);

      var pageDirTree = pageFile.split(path.sep);

      if (
        (fileExt === '.jsx' ||
          fileExt === '.js' ||
          fileExt === '.tsx' ||
          fileExt === '.ts') &&
        fileBasename === 'index' &&
        pageDirTree.length === 3 &&
        pageDirTree[0] === 'pages'
      ) {
        pageDirTree.pop();
        pageDirTree.push('index');
        var pageName = pageDirTree.join('/');

        entryObj[pageName] = filePath;
      }
    });
    console.log(colors.blue('TIPS:'), 'entry 未指定，使用 pages 作为默认。');
    return entryObj;
  } catch (err) {
    throw err;
  }
};
