/**
 * 判断是否是本地路径
 * @param {string} templatePath
 */
function isLocalPath(templatePath) {
  return /^[./]|(^[a-zA-Z]:)/.test(templatePath);
}

module.exports = {
  isLocalPath
};
