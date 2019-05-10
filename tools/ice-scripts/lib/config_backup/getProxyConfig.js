/**
 * 获取用户在项目中定义的 .webpackrc.js
 */
const path = require('path');
const fs = require('fs');

const log = require('../utils/log');

module.exports = (opts = {}) => {
  const { cwd = process.cwd() } = opts;

  const packageFilePath = path.resolve(cwd, 'package.json');

  if (fs.existsSync(packageFilePath)) {
    try {
      const pkgContext = fs.readFileSync(packageFilePath);
      const pkgData = JSON.parse(pkgContext.toString());

      if (pkgData.proxyConfig) {
        log.info('package.json 存在 proxyConfig 代理配置');

        if (
          Object.prototype.toString.apply(pkgData.proxyConfig) ===
          '[object Object]'
        ) {
          return pkgData.proxyConfig;
        }
      }
    } catch (err) {
      log.verbose('读取 proxyConfig 出错', err);
    }
  }

  return null;
};
