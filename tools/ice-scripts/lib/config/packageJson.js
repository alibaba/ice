const fs = require('fs');

const paths = require('./paths');

const pkg = {};

try {
  Object.assign(
    pkg,
    JSON.parse(fs.readFileSync(paths.appPackageJson, 'utf-8'))
  );
} catch (err) {
  console.log('获取项目 package.json 失败, 检查是否有语法错误. ');
  throw err;
}

module.exports = pkg;
