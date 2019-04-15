const babylon = require('babylon');
const fs = require('fs');
const generator = require('babel-generator').default;
const prettier = require('prettier');
const t = require('babel-types');
const traverse = require('babel-traverse').default; // https://astexplorer.net/
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
  program.body.forEach((n, index) => {
    if (t.isImportDeclaration(n)) {
      lasterImport = index;
    }
  });
  program.body.splice(lasterImport, 0, node);
}

let componentImported = false;
let layoutImported = false;

const ROUTER_CONFIG = 'routerConfig';

module.exports = async function ({
  routePath,
  routeFilePath,
  routerConfigFilePath,
  pageFolderName,
  layoutName,
}) {
  const routerConfigContext = fs.readFileSync(routerConfigFilePath).toString();
  const routerConfigAST = babylon.parse(routerConfigContext, {
    sourceType: 'module',
    plugins: ['*'],
  });

  routePath = `/${routePath.replace(/^\//, '')}`;

  // 判断router.jsx 中是否引入routerconfig.js，如果引入则为老项目，在 routerconfig 中需要添加layout。
  // 新项目在 routerconfig 中不添加。
  let ifRouterConfigNeedLayout = false;
  if (fs.existsSync(routeFilePath)) {
    const routerContext = fs.readFileSync(routeFilePath).toString();
    const routerAST = babylon.parse(routerContext, {
      sourceType: 'module',
      plugins: ['*'],
    });
    traverse(routerAST, {
      ImportDeclaration({ node }) {
        ifRouterConfigNeedLayout = node.specifiers.some((specifier) => {
          if (t.isImportDefaultSpecifier(specifier)) {
            if (
              t.isIdentifier(specifier.local) &&
              specifier.local.name === ROUTER_CONFIG
            ) {
              return true;
            }
          }
          return false;
        });
      },
    });
  }

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
          if (samePath && routePath === '/IceworksPreviewPage') {
            pageIndex = index;
          }
          return samePath;
        });

        const routeNodeConfig = {
          path: routePath,
          component: pageFolderName,
        };
        if (ifRouterConfigNeedLayout) {
          routeNodeConfig.layout = layoutName;
        }

        if (!hasPage) {
          node.init.elements.push(
            routeNode(routeNodeConfig)
          );
        } else if (pageIndex !== -1) {
          node.init.elements.splice(
            pageIndex,
            1,
            routeNode(routeNodeConfig)
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
              specifier.local.name === pageFolderName
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
              specifier.local.name === upperCamelCase(layoutName)
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
  if (ifRouterConfigNeedLayout && !layoutImported && layoutName) {
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
