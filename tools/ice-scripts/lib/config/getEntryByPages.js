const fs = require('fs');
const path = require('path');
const colors = require('chalk');

const walk = function walk(dir) {
  let results = [];

  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    file = `${dir}/${file}`;
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      results.push(file);
    }
  });
  return results;
};

module.exports = () => {
  const entryObj = {};
  const entryDir = './src';

  try {
    // 获取当前目录下所有文件
    const files = walk(entryDir);
    files.forEach((filePath) => {
      const fileExt = path.extname(filePath);
      const fileBasename = path.basename(filePath, fileExt);
      const pageFile = path.relative(entryDir, filePath);
      const pageDirTree = pageFile.split(path.sep);

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

        const pageName = pageDirTree.join('/');
        entryObj[pageName] = filePath;
      }
    });
    console.log(colors.green('Info:'), 'entry 未指定，使用 pages 作为默认。');
    return entryObj;
  } catch (err) {
    throw err;
  }
};
