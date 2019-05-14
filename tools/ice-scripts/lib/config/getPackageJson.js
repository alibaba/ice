const fs = require('fs');
const path = require('path');
const log = require('../utils/log');

module.exports = function getPkgData(context = process.cwd()) {
  const pkg = {};
  try {
    Object.assign(
      pkg,
      JSON.parse(fs.readFileSync(path.resolve(context, 'package.json'), 'utf-8'))
    );

    // 项目类型
    if (pkg.componentConfig) {
      pkg.type = 'component';
    } else if (pkg.blockConfig) {
      pkg.type = 'block';
    } else {
      pkg.type = 'project';
    }
  } catch (err) {
    log.error('获取项目 package.json 失败, 检查是否有语法错误. ');
    throw err;
  }
  return pkg;
};
