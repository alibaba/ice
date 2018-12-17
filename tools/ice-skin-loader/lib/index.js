const chalk = require('chalk');
const fs = require('fs');
const loaderUtils = require('loader-utils');
const md5 = require('md5');
const pathExists = require('path-exists');
const createSkinExtraContent = require('./createSkinExtraContent');

const skinContentCache = {};

// delete empty lines
function deleteEmptyLine(str) {
  const filterLines = str.split('\n').filter(function(line) {
    return line !== '';
  });

  filterLines.push('');
  return filterLines.join('\n');
}

// 根据 package.json 配置生成自定义变量
const extraContent = createSkinExtraContent();

module.exports = function(source) {
  const options = loaderUtils.getOptions(this);
  const themeFile = options.themeFile;
  if (!themeFile) {
    return source;
  }

  // 计算 md5 值，避免中文路径的问题
  const filePathHash = md5(themeFile);
  let themeFileContent;

  if (skinContentCache.hasOwnProperty(filePathHash)) {
    // 读取缓存
    themeFileContent = skinContentCache[filePathHash];
  } else if (pathExists.sync(themeFile)) {
    // 读取文件
    themeFileContent = fs.readFileSync(themeFile).toString();
    skinContentCache[filePathHash] = deleteEmptyLine(themeFileContent);
  } else {
    // 文件不存在
    console.log(chalk.red('\n[Error] 不存在皮肤文件:'), themeFile);
    themeFileContent = '';
    skinContentCache[filePathHash] = '';
  }

  return themeFileContent + '\n' + extraContent + '\n' + source;
};
