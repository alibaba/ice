'use strict';

var chalk = require('chalk');
var fs = require('fs');
var loaderUtils = require('loader-utils');
var md5 = require('md5');
var pathExists = require('path-exists');

var skinContentCache = {};

// 删除空行
function deleteEmptyLine(str) {
  var filterLines = str.split('\n').filter(function(line) {
    return line !== '';
  });

  filterLines.push('');
  return filterLines.join('\n');
}

module.exports = function(source) {
  var options = loaderUtils.getOptions(this);
  var themeFile = options.themeFile;
  if (!themeFile) {
    return source;
  }

  // 计算 md5 值，避免中文路径的问题
  var filePathHash = md5(themeFile);

  if (skinContentCache[filePathHash]) {
    return skinContentCache[filePathHash] + source;
  }
  // 缓存 skinLoader
  if (pathExists.sync(themeFile)) {
    var themeFileContent = fs.readFileSync(themeFile).toString();
    skinContentCache[filePathHash] = deleteEmptyLine(themeFileContent);
    return skinContentCache[filePathHash] + source;
  } else {
    console.log(chalk.red('\n[Error] 不存在皮肤文件:'), themeFile);
    console.log(
      chalk.green('[Info] 可参考皮肤配置文档:'),
      'http://ice.alibaba-inc.com/docs/addons/skin'
    );
    return source;
  }
};
