const config = require('../../config');

const lang = 'cn';
/**
 * 创建一个询问方法回调
 * @param {*} type 事件类型
 * @param {*} data 数据
 * @param {*} interpreter 回调解析器
 */
module.exports = function createInterpreter(type, data = {}, interpreter) {
  const localeObj = config.locale[type] || config.locale.unknown;
  const message = localeObj[lang];
  return new Promise((resolve) => {
    interpreter({ type, message, data }, (answer) => {
      resolve(answer);
    });
  });
};
