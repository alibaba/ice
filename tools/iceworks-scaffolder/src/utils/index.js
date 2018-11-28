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

exports.getClientFolderName = (nodeFramework) => {
  if (nodeFramework) {
    if (nodeFramework === 'koa') {
      return 'client';
    } else if (nodeFramework === 'midway') {
      return 'assert';
    } else {
      return 'src';
    }
  } else {
    return 'src';
  }
};
