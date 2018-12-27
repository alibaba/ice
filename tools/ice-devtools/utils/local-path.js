const path = require('path');
const fs = require('fs');
const logger = require('./logger');

/**
 * 判断是否是本地路径
 * @param {string} templatePath
 */
function isLocalPath(templatePath) {
  return /^[./]|(^[a-zA-Z]:)/.test(templatePath);
}

/**
 * 获取模板路径
 * @param {string} templatePath
 */
function getTemplatePath(templatePath) {
  return path.isAbsolute(templatePath)
    ? templatePath
    : path.normalize(path.join(process.cwd(), templatePath));
}

/**
 * 获取模板是否存在
 * @param {string} options
 */
function getLocalTemplate(templatePath) {
  if (!templatePath) {
    return null;
  }

  if (!isLocalPath(templatePath)) {
    logger.fatal('Local path "%s" is invalid.', templatePath);
  }

  if (!fs.existsSync(getTemplatePath(templatePath))) {
    logger.fatal('Local template "%s" not found.', templatePath);
  }

  return templatePath;
}

module.exports = {
  isLocalPath,
  getTemplatePath,
  getLocalTemplate,
};
