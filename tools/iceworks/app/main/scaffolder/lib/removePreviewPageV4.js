const fs = require('fs');
const path = require('path');
const babylon = require('babylon');
const generator = require('babel-generator').default;
const traverse = require('babel-traverse').default;
const t = require('babel-types');
const rimraf = require('rimraf');

const prettier = require('prettier');
const config = require('../../config');
const { getClientPath } = require('../../paths');

function getFileAst(file) {
  const c = fs.readFileSync(file).toString();
  return babylon.parse(c, {
    sourceType: 'module',
    plugins: ['*'],
  });
}

const ROUTER_CONFIG = 'routerConfig'; // AST 解析 routeConfig.js 的变量名
const MENU_CONFIG = 'asideMenuConfig'; // AST 解析 menuConfig.js 的变量名
const PREVIEW_PATH = '/IceworksPreviewPage';
const PREVIEW_PAGE_PATH = './pages/IceworksPreviewPage';

module.exports = async function({ destDir, nodeFramework }) {
  // 删除 路由 和 blocks 文件
  const clientPath = getClientPath(destDir, nodeFramework);
  const previewPagePath = path.join(clientPath, 'pages/IceworksPreviewPage');
  rimraf.sync(previewPagePath);

  const routerConfigFilePath = path.join(clientPath, 'routerConfig.js');
  const routerConfigAST = getFileAst(routerConfigFilePath);

  traverse(routerConfigAST, {
    VariableDeclarator(path) {
      if (
        t.isIdentifier(path.node.id, { name: ROUTER_CONFIG }) &&
        t.isArrayExpression(path.node.init)
      ) {
        // 移除路由配置
        path.node.init.elements = path.node.init.elements.filter((a) => {
          const p = a.properties;
          const matchPath = p.some((op) => {
            return op.key.name === 'path' && op.value.value === PREVIEW_PATH;
          });
          return !matchPath;
        });
      }
    },
    ImportDeclaration(path) {
      if (
        t.isStringLiteral(path.node.source, {
          value: PREVIEW_PAGE_PATH,
        })
      ) {
        path.remove();
      }
    },
  });

  fs.writeFileSync(
    routerConfigFilePath,
    prettier.format(generator(routerConfigAST).code, config.prettier)
  );

  const menuConfigFilePath = path.join(clientPath, 'menuConfig.js');
  const menuConfigAST = getFileAst(menuConfigFilePath);

  traverse(menuConfigAST, {
    VariableDeclarator(path) {
      if (
        t.isIdentifier(path.node.id, { name: MENU_CONFIG }) &&
        t.isArrayExpression(path.node.init)
      ) {
        // 移除路由配置
        path.node.init.elements = path.node.init.elements.filter((a) => {
          const p = a.properties;
          const matchPath = p.some((op) => {
            return op.key.name === 'path' && op.value.value === PREVIEW_PATH;
          });
          return !matchPath;
        });
      }
    },
  });

  fs.writeFileSync(
    menuConfigFilePath,
    prettier.format(generator(menuConfigAST).code, config.prettier)
  );
};
