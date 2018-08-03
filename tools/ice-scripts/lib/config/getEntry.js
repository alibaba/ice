// 读取需要编译的文件
'use strict';
const fs = require('fs');
const colors = require('chalk');
const path = require('path');

/**
 * 获取项目中符合 src/pages/xxxx/index.jsx 的文件
 *
 * @return {Object}           entry 的 kv 对象
 */

module.exports = function getEntry(cwd) {
  const appDirectory = fs.realpathSync(cwd);
  const packageFilePath = path.resolve(appDirectory, 'package.json');
  const packageData = require(packageFilePath);

  // 需要区分项目类型，新版的项目直接返回 src/index.js
  if (packageData) {
    let entry;

    // 兼容 iceworks 旧项目 package.json 里的 ice 字段。
    if (packageData.ice && packageData.ice.entry) {
      entry = packageData.ice.entry;
    }

    if (packageData.buildConfig && packageData.buildConfig.entry) {
      entry = packageData.buildConfig.entry;
    }

    if (entry) {
      console.log(colors.yellow('Info:'), 'package.json 存在 entry 配置');
      return entry;
    }
  }
};
