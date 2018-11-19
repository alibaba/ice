const babylon = require('babylon');
const fs = require('fs');
const generator = require('babel-generator').default;
const prettier = require('prettier');
const t = require('babel-types');
const traverse = require('babel-traverse').default;

const config = require('../../config');

const MENU_CONFIG = 'asideMenuConfig'; // AST 解析 menuConfig.js 的变量名

function menuNode({ path, name, icon = 'home' }) {
  return t.objectExpression([
    t.objectProperty(t.stringLiteral('name'), t.stringLiteral(name)),
    t.objectProperty(t.stringLiteral('path'), t.stringLiteral(path)),
    t.objectProperty(t.stringLiteral('icon'), t.stringLiteral(icon)),
  ]);
}

module.exports = async function({ name, path, icon, menuConfigFilePath }) {
  path = `/${path}`.replace(/^\/+/, '/'); // 必须是 / 开头

  const menuContext = fs.readFileSync(menuConfigFilePath).toString();
  const menuConfigAST = babylon.parse(menuContext, {
    sourceType: 'module',
    plugins: ['*'],
  });
  traverse(menuConfigAST, {
    VariableDeclarator({ node }) {
      if (
        t.isIdentifier(node.id, { name: MENU_CONFIG }) &&
        t.isArrayExpression(node.init)
      ) {
        const menuExist = node.init.elements.some((oe) => {
          return oe.properties.some((op) => {
            if (op.key.name == 'path' && op.value.value == path) {
              return true;
            }
            return false;
          });
        });
        if (!menuExist) {
          node.init.elements.push(menuNode({ name, path, icon }));
        }
      }
    },
  });

  fs.writeFileSync(
    menuConfigFilePath,
    prettier.format(generator(menuConfigAST).code, config.prettier)
  );
};
