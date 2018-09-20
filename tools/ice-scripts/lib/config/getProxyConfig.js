/**
 * 获取用户在项目中定义的 .webpackrc.js
 */
const path = require('path');
const fs = require('fs');
const colors = require('chalk');

// TODO 抽离为单独的组件
module.exports = (opts = {}) => {
  const { cwd = process.cwd() } = opts;

  const packageFilePath = path.resolve(cwd, 'package.json');

  if (fs.existsSync(packageFilePath)) {
    try {
      const pkgContext = fs.readFileSync(packageFilePath);
      const pkgData = JSON.parse(pkgContext.toString());

      if (pkgData.proxyConfig) {
        console.log(
          colors.green('Info:'),
          'package.json 存在 proxyConfig 代理配置'
        );

        if (
          Object.prototype.toString.apply(pkgData.proxyConfig) ==
          '[object Object]'
        ) {
          return pkgData.proxyConfig;
        }
      }
    } catch (e) {}
  }

  return null;
};
