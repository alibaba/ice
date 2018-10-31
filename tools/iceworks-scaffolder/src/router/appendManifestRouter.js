/**
 * 对 manifest 文件进行操作，增加 pages 的注册
 */

/**
 * 创建路由文件
 */

const fs = require('fs');
const path = require('path');
const pathExists = require('path-exists');

module.exports = async function addManifestRouter({ path: routePath, manifestFilePath, pagePath, isNodeProject = false }) {
  if (!pathExists.sync(manifestFilePath)) {
    return false;
  }

  if (!routePath) {
    return false;
  }

  let manifestContent = fs.readFileSync(manifestFilePath);
  manifestContent = manifestContent.toString();
  const manifestData = JSON.parse(manifestContent);

  const pages = manifestData.pages || {};
  const feFolder = isNodeProject ? 'client' : 'src';
  let pagePathWithRoot = path.join(feFolder, pagePath, 'index');

  pagePathWithRoot = pagePathWithRoot.replace(/\\/g, '/');

  pages[routePath] = pagePathWithRoot;

  return JSON.stringify(manifestData, null, 2);
};
