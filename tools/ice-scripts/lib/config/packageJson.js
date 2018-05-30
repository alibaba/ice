const fs = require('fs');

const getPaths = require('./paths');

const paths = getPaths(process.cwd());
const pkg = {};

try {
  Object.assign(
    pkg,
    JSON.parse(fs.readFileSync(paths.appPackageJson, 'utf-8'))
  );
} catch (err) {
  console.log(err);
  console.log('获取项目 package.json 失败, 检查是否有语法错误. ');
}

module.exports = pkg;
