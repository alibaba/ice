/**
 * 创建路由文件
 */

const babylon = require('babylon');
const fs = require('fs');
const prettier = require('prettier');
const t = require('@babel/types');
const traverse = require('@babel/traverse').default;
const template = require('@babel/template').default;
const pathExists = require('path-exists');

const { PRETTIER_CONFIG, BABEL_CONFIG } = require('../CONSTANT');
const { getPrettierConfig } = require('../utils');
const astToCode = require('../utils/astToCode');

function routeNode({ path, layout, component, module = '' }) {
  const routerData = {
    path: t.stringLiteral(path),
    layout: t.identifier(layout),
    component: t.identifier(component),
    module: t.identifier(module),
  };

  const objectExpressionValue = [];

  if (path) {
    objectExpressionValue.push(
      t.objectProperty(t.stringLiteral('path'), routerData['path'])
    );
  }

  if (layout) {
    objectExpressionValue.push(
      t.objectProperty(t.stringLiteral('layout'), routerData['layout'])
    );
  }

  if (component) {
    objectExpressionValue.push(
      t.objectProperty(t.stringLiteral('component'), routerData['component'])
    );
  }

  if (module) {
    objectExpressionValue.push(
      t.objectProperty(t.stringLiteral('module'), routerData['module'])
    );
  }

  return t.objectExpression(objectExpressionValue);
}

function importDefaultNode({ name, module, source }) {
  let importBuilder = template(`import NAME from "${source}";`, {
    sourceType: 'module',
  });
  let data;

  if (module) {
    importBuilder = template(`import { NAME, MODULE } from "${source}";`, {
      sourceType: 'module',
    });
    data = {
      NAME: t.identifier(name),
      MODULE: t.identifier(module),
    };
  } else {
    data = {
      NAME: t.identifier(name),
    };
  }

  const ast = importBuilder(data);
  return ast;
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

module.exports = async function addRouter(
  {
    path: routePath,
    routerConfigFilePath,
    component: routerComponent,
    module: routerModule,
    pagePath,
    layoutName,
    layoutPath,
  },
  prettierConfig = PRETTIER_CONFIG
) {
  if (!pathExists.sync(routerConfigFilePath)) {
    return false;
  }
  const routerContext = fs.readFileSync(routerConfigFilePath).toString();

  const routerConfigAST = babylon.parse(routerContext, BABEL_CONFIG);

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
              component: routerComponent,
              module: routerModule,
            })
          );
        } else if (pageIndex != -1) {
          node.init.elements.splice(
            pageIndex,
            1,
            routeNode({
              path: routePath,
              layout: layoutName,
              component: routerComponent,
              module: routerModule,
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
        componentImported = node.source.value == pagePath;
      }

      if (!layoutImported && layoutName) {
        layoutImported = node.source.value == layoutPath;
      }
    },
  });

  if (!componentImported) {
    appendAfterLastImport(
      routerConfigAST,
      importDefaultNode({
        name: routerComponent,
        module: routerModule,
        source: pagePath,
      })
    );
  }
  if (!layoutImported && layoutName) {
    appendAfterLastImport(
      routerConfigAST,
      importDefaultNode({
        name: layoutName,
        source: layoutPath,
      })
    );
  }
  prettierConfig = getPrettierConfig(routerConfigFilePath, prettierConfig);
  return prettier.format(astToCode(routerConfigAST), prettierConfig);
};
