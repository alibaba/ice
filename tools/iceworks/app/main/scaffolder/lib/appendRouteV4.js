const babylon = require('babylon');
const fs = require('fs');
const generator = require('babel-generator').default;
const prettier = require('prettier');
const t = require('babel-types');
const traverse = require('babel-traverse').default;
const upperCamelCase = require('uppercamelcase');

const config = require('../../config');

function routeNode({ path, layout = '', component }) {
  if (layout) {
    return t.objectExpression([
      t.objectProperty(t.stringLiteral('path'), t.stringLiteral(path)),
      t.objectProperty(
        t.stringLiteral('layout'),
        t.identifier(upperCamelCase(layout))
      ),
      t.objectProperty(t.stringLiteral('component'), t.identifier(component)),
    ]);
  }
  return t.objectExpression([
    t.objectProperty(t.stringLiteral('path'), t.stringLiteral(path)),
    t.objectProperty(t.stringLiteral('component'), t.identifier(component)),
  ]);
}

function importDefaultNode({ name, source }) {
  return t.importDeclaration(
    [t.importDefaultSpecifier(t.identifier(name))],
    t.stringLiteral(source)
  );
}

function appendAfterLastImport({ program }, node) {
  let lasterImport = 0;
  program.body.forEach((node, index) => {
    if (t.isImportDeclaration(node)) {
      lasterImport = index;
    }
  });
  program.body.splice(lasterImport, 0, node);
}

let componentImported = false;
let layoutImported = false;

const ROUTER_CONFIG = 'routerConfig';

module.exports = async function({
  routePath,
  routerConfigFilePath,
  pageFolderName,
  layoutName,
}) {
  const routerContext = fs.readFileSync(routerConfigFilePath).toString();
  const routerConfigAST = babylon.parse(routerContext, {
    sourceType: 'module',
    plugins: ['*'],
  });

  routePath = '/' + routePath.replace(/^\//, '') + '';

  traverse(routerConfigAST, {
    Program() {
      componentImported = false;
      layoutImported = false;
    },
    VariableDeclarator({ node }) {
      if (
        t.isIdentifier(node.id, { name: ROUTER_CONFIG }) &&
        t.isArrayExpression(node.init)
      ) {
        // 针对 ROUTER_CONFIG 变量做处理
        let pageIndex = -1;
        const hasPage = node.init.elements.some((oe, index) => {
          const p = oe.properties;
          const samePath = p.some((op) => {
            return op.key.name === 'path' && op.value.value === routePath;
          });
          if (samePath && routePath == '/IceworksPreviewPage') {
            pageIndex = index;
          }
          return samePath;
        });

        if (!hasPage) {
          node.init.elements.push(
            routeNode({
              path: routePath,
              layout: layoutName,
              component: pageFolderName,
            })
          );
        } else if (pageIndex != -1) {
          node.init.elements.splice(
            pageIndex,
            1,
            routeNode({
              path: routePath,
              layout: layoutName,
              component: pageFolderName,
            })
          );
        }
        node.init.elements = node.init.elements.sort((a) => {
          const p = a.properties;
          const starPath = p.some((op) => {
            return op.key.name === 'path' && op.value.value === '*';
          });

          if (starPath) {
            return 1;
          }
          return 0;
        });
      }
    },
    ImportDeclaration({ node }) {
      if (!componentImported) {
        componentImported = node.specifiers.some((specifier) => {
          if (t.isImportDefaultSpecifier(specifier)) {
            if (
              t.isIdentifier(specifier.local) &&
              specifier.local.name == pageFolderName
            ) {
              return true;
            }
          }
          return false;
        });
      }

      if (!layoutImported && layoutName) {
        layoutImported = node.specifiers.some((specifier) => {
          if (t.isImportDefaultSpecifier(specifier)) {
            if (
              t.isIdentifier(specifier.local) &&
              specifier.local.name == upperCamelCase(layoutName)
            ) {
              return true;
            }
          }
          return false;
        });
      }
    },
  });

  if (!componentImported) {
    appendAfterLastImport(
      routerConfigAST,
      importDefaultNode({
        name: pageFolderName,
        source: `./pages/${pageFolderName}`,
      })
    );
  }
  if (!layoutImported && layoutName) {
    appendAfterLastImport(
      routerConfigAST,
      importDefaultNode({
        name: upperCamelCase(layoutName),
        source: `./layouts/${layoutName}`,
      })
    );
  }

  fs.writeFileSync(
    routerConfigFilePath,
    prettier.format(generator(routerConfigAST).code, config.prettier)
  );
};
