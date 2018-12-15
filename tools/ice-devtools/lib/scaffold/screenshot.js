const path = require('path');

/**
 * 返回截图设置
 * @param{String} cwd
 * @param{Object} opt
 * @returns{Object} config
 *  @param{String} config.selector
 *  @param{String} config.servePath
 *  @param{String} config.urlpath
 */
module.exports = function screenshot(cwd) {
  const selector = 'body';
  const servePath = path.join(cwd, 'build');
  const urlpath = '/index.html';

  return { selector, servePath, urlpath };
};
