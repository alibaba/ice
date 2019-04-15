const locale = require('../locale');
const lang = 'cn';


exports.createInterpreter = function(type, data = {}, interpreter) {
  const localeObj = locale[type] || locale.unknown;
  const message = localeObj[lang];

  return new Promise((resolve) => {
    interpreter({ type, message, data }, (answer) => {
      resolve(answer);
    });
  });
};

const path = require('path');

exports.getPrettierConfig = function(file, prettierConfig = {}) {
  const fileType = path.extname(file);
  const isTypescripts = fileType == '.ts' || fileType == '.tsx';
  prettierConfig.parser = isTypescripts ? 'typescript' : 'babylon';
  return prettierConfig;
};

exports.unicodeUnescape = (str) => {
  return str.replace(/\\u[\dA-Fa-f]{4}/g, (match) => {
    return String.fromCharCode(parseInt(match.replace(/\\u/g, ''), 16));
  });
};

/**
 * node模板目录结构统一，都放在${distDir}/client/src下，相当于比普通前端模板多了一层client。具体目录参见文档。
 */
const nodeFrameworks = ['koa2', 'midway'];
exports.getClientFolderName = (nodeFramework) => {
  if (nodeFrameworks.includes(nodeFramework)) {
    return 'client/src';
  } else if (nodeFramework === 'koa') { // 兼容老模板
    return 'client';
  else {
    return 'src';
  }
};
