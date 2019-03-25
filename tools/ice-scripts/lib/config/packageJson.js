const fs = require('fs');
const path = require('path');

const pkg = {};

try {
  Object.assign(
    pkg,
    JSON.parse(fs.readFileSync(path.resolve(process.cwd(), 'package.json'), 'utf-8'))
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
  console.log('获取项目 package.json 失败, 检查是否有语法错误. ');
  throw err;
}

module.exports = pkg;
