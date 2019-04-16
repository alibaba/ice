const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');

// 获取 meta 信息
function splitInput(str) {
  if (str.slice(0, 3) !== '---') return;
  var matcher = /\n(\.{3}|-{3})/g;
  var metaEnd = matcher.exec(str);
  return metaEnd && [str.slice(0, metaEnd.index), str.slice(matcher.lastIndex)];
}

const readmePath = path.join(process.cwd(), 'README.md');

module.exports = function(filepath = readmePath) {
  if (!fs.existsSync(filepath)) {
    console.log('未找到 README.md');
    return null;
  }
  const content = fs.readFileSync(filepath, 'utf8');
  const metaInput = splitInput(content);

  let metaData = null;

  if (metaInput) {
    metaData = yaml.safeLoad(metaInput[0]);
  }
  return metaData;
};
