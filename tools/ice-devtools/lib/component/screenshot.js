const path = require('path');
const getDemos = require('../../utils/get-demos');
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
  const selector = '#mountNode';
  const servePath = path.join(cwd, 'build');

  const demos = getDemos(cwd);
  let urlpath = '/index.html';
  if (demos && demos.length) {
    urlpath = `/${demos[0].filename}.html`;
  }

  return { selector, servePath, urlpath };
};
