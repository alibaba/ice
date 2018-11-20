const babylon = require('babylon');
const fs = require('fs');

const prettier = require('prettier');
const t = require('@babel/types');
const traverse = require('@babel/traverse').default;
const pathExists = require('path-exists');

const { PRETTIER_CONFIG, BABEL_CONFIG } = require('../CONSTANT');
const { getPrettierConfig } = require('../utils');
const astToCode = require('../utils/astToCode');

const MENU_CONFIG = 'asideMenuConfig'; // AST 解析 menuConfig.js 的变量名

function menuNode({ path, name, icon = 'home' }) {
  return t.objectExpression([
    t.objectProperty(t.stringLiteral('name'), t.stringLiteral(name)),
    t.objectProperty(t.stringLiteral('path'), t.stringLiteral(path)),
    t.objectProperty(t.stringLiteral('icon'), t.stringLiteral(icon)),
  ]);
}

module.exports = async function({ name, path: menuPath, icon, menuConfigFilePath }, prettierConfig = PRETTIER_CONFIG) {
  if (!pathExists.sync(menuConfigFilePath)) return false;
  menuPath = `/${menuPath}`.replace(/^\/+/, '/');
  const menuContext = fs.readFileSync(menuConfigFilePath).toString();
  const menuConfigAST = babylon.parse(menuContext, BABEL_CONFIG);
  traverse(menuConfigAST, {
    VariableDeclarator({ node }) {
      if (t.isIdentifier(node.id, { name: MENU_CONFIG }) && t.isArrayExpression(node.init)) {
        const menuExist = node.init.elements.some((oe) => {
          return oe.properties.some((op) => {
            if (op.key.name == 'path' && op.value.value == menuPath) {
              return true;
            }
            return false;
          });
        });
        if (!menuExist) {
          node.init.elements.push(menuNode({ name, path: menuPath, icon }));
        }
      }
    },
  });
  prettierConfig = getPrettierConfig(menuConfigFilePath, prettierConfig);
  const code = astToCode(menuConfigAST);
  return prettier.format(code, prettierConfig);
};
