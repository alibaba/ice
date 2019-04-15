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

const ROUTER_CONFIG = 'routerConfig'; // AST 解析 routeConfig.js 的变量名
const PREVIEW_PATH = '/IceworksPreviewPage';
const PREVIEW_PAGE_PATH = './pages/IceworksPreviewPage';

module.exports = async function(
  { routerConfigFilePath, path: routerPath = PREVIEW_PATH, pagePath = PREVIEW_PAGE_PATH },
  prettierConfig = PRETTIER_CONFIG,
) {
  if (!pathExists.sync(routerConfigFilePath)) {
    return false;
  }
  const routerConfigAST = getFileAst(routerConfigFilePath);

  traverse(routerConfigAST, {
    VariableDeclarator(path) {
      if (t.isIdentifier(path.node.id, { name: ROUTER_CONFIG }) && t.isArrayExpression(path.node.init)) {
        // 移除路由配置
        path.node.init.elements = path.node.init.elements.filter((a) => {
          const p = a.properties;
          const matchPath = p.some((op) => {
            return op.key.name === 'path' && op.value.value === routerPath;
          });
          return !matchPath;
        });
      }
    },
    ImportDeclaration(path) {
      if (
        t.isStringLiteral(path.node.source, {
          value: pagePath,
        })
      ) {
        path.remove();
      }
    },
  });
  prettierConfig = getPrettierConfig(routerConfigFilePath, prettierConfig);
  return prettier.format(astToCode(routerConfigAST), prettierConfig);
};
