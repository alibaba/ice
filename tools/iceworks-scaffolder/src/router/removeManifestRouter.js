/**
 * 对 manifest 文件进行操作，增加 pages 的注册
 */

/**
 * 删除路由文件
 */

const fs = require('fs');
const pathExists = require('path-exists');

module.exports = async function addManifestRouter({ path: routePath = 'IceworksPreviewPage', manifestFilePath }) {
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

  delete pages[routePath];

  return JSON.stringify(manifestData, null, 2);
};
