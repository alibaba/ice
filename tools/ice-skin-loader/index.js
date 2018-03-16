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

// 移除手动引入的变量文件, 防止被原始皮肤覆盖
function deleteVariablesImport(source = '') {
  return source
    .split('\n')
    .filter(function(line) {
      return !/\/variables\.scss/.test(line);
    })
    .join('\n');
}

// init user defined variables
const extraContent = createSkinExtraContent();

let hasEmittedHelp = false;
module.exports = function(source) {
  const options = loaderUtils.getOptions(this);
  const themeFile = options.themeFile;
  if (!themeFile) {
    return source;
  }

  // 计算 md5 值，避免中文路径的问题
  const filePathHash = md5(themeFile);

  source = deleteVariablesImport(source);

  if (skinContentCache[filePathHash]) {
    return skinContentCache[filePathHash] + '\n' + extraContent + '\n' + source;
  }
  // 缓存 skinLoader
  if (pathExists.sync(themeFile)) {
    const themeFileContent = fs.readFileSync(themeFile).toString();
    skinContentCache[filePathHash] = deleteEmptyLine(themeFileContent);
    return skinContentCache[filePathHash] + '\n' + extraContent + '\n' + source;
  } else {
    // only tip once
    if (!hasEmittedHelp) {
      console.log(chalk.red('\n[Error] 不存在皮肤文件:'), themeFile);
      console.log(
        chalk.green('[Info] 可参考皮肤配置文档:'),
        'http://ice.alibaba-inc.com/docs/addons/skin'
      );
      hasEmittedHelp = true;
    }

    return source;
  }
};
