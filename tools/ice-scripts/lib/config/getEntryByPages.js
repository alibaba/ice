const fs = require('fs');
const path = require('path');
const colors = require('chalk');

const walk = function walk(dir) {
  let results = [];
  let list = fs.readdirSync(dir);
  list.forEach((file) => {
    file = dir + '/' + file;
    let stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      results.push(file);
    }
  });
  return results;
};

module.exports = () => {
  let entryObj = {};
  let entryDir = './src';

  try {
    // 获取当前目录下所有文件
    let files = walk(entryDir);
    files.forEach((filePath) => {
      let fileExt = path.extname(filePath);
      let fileBasename = path.basename(filePath, fileExt);
      let pageFile = path.relative(entryDir, filePath);

      let pageDirTree = pageFile.split(path.sep);

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
        let pageName = pageDirTree.join('/');

        entryObj[pageName] = filePath;
      }
    });
    console.log(colors.green('Info:'), 'entry 未指定，使用 pages 作为默认。');
    return entryObj;
  } catch (err) {
    throw err;
  }
};
