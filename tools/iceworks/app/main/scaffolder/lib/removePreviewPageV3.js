/**
 * 删除 preview page
 */
const path = require('path');
const pathExists = require('path-exists');
const rimraf = require('rimraf');

const routes = require('./routes');
const InteractiveFileReplacement = require('./interactiveFileReplacement');
const { getClientPath } = require('../../paths');

// 需要清理干净所有新创建的内容，包括 package.json 里面、page、blocks 等，现在没清理 package.json
module.exports = async function removePreviewPage({ destDir, nodeFramework }) {
  // 删除 page 和 blocks 文件
  const clientPath = getClientPath(destDir, nodeFramework);
  const previewPagePath = path.join(clientPath, '/pages/IceworksPreviewPage');
  rimraf.sync(previewPagePath);

  let routeFilePath = path.join(clientPath, 'routes.jsx');
  if (!pathExists.sync(routeFilePath)) {
    // hack 兼容 vue 物料 router
    routeFilePath = path.join(clientPath, 'router.js');
  }

  if (pathExists.sync(routeFilePath)) {
    const routeReplacement = new InteractiveFileReplacement({
      file: routeFilePath,
      tagPrefix: '// <!-- auto generated routes start -->',
      tagSuffix: '// <!-- auto generated routes end -->',
    });

    const ast = routes._parseRoute(routeReplacement.getFileContent());
    routes.removeImports(ast.program.body, [
      { type: 'page', ref: 'IceworksPreviewPage' },
    ]);
    routes.removeRouteByPageName(ast.program.body, 'IceworksPreviewPage');

    const { code } = routes._generateRoute({
      type: 'Program',
      body: ast.program.body,
    });
    routeReplacement.replace(code);
  }
};
