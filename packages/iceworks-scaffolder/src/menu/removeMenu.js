const babylon = require('babylon');
const fs = require('fs');
const prettier = require('prettier');
const t = require('@babel/types');
const traverse = require('@babel/traverse').default;
const pathExists = require('path-exists');

const { PRETTIER_CONFIG, BABEL_CONFIG } = require('../CONSTANT');
const { getPrettierConfig } = require('../utils');
const astToCode = require('../utils/astToCode');

function getFileAst(file) {
  const c = fs.readFileSync(file).toString();
  return babylon.parse(c, BABEL_CONFIG);
}

const MENU_CONFIG = 'asideMenuConfig'; // AST 解析 menuConfig.js 的变量名
const PREVIEW_PATH = '/IceworksPreviewPage';

module.exports = async function(
  { path: menuPath = PREVIEW_PATH, menuConfigFilePath },
  prettierConfig = PRETTIER_CONFIG,
) {
  if (!pathExists.sync(menuConfigFilePath)) {
    return false;
  }
  const menuConfigAST = getFileAst(menuConfigFilePath);

  traverse(menuConfigAST, {
    VariableDeclarator(path) {
      if (t.isIdentifier(path.node.id, { name: MENU_CONFIG }) && t.isArrayExpression(path.node.init)) {
        // 移除路由配置
        path.node.init.elements = path.node.init.elements.filter((a) => {
          const p = a.properties;
          const matchPath = p.some((op) => {
            return op.key.name === 'path' && op.value.value === menuPath;
          });
          return !matchPath;
        });
      }
    },
  });

  prettierConfig = getPrettierConfig(menuConfigFilePath, prettierConfig);
  return prettier.format(astToCode(menuConfigAST), prettierConfig);
};
