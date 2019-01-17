const fs = require('fs');
const path = require('path');
const babylon = require('babylon');
const generator = require('babel-generator').default;
const traverse = require('babel-traverse').default;
const t = require('babel-types');
const rimraf = require('rimraf');

const prettier = require('prettier');
const config = require('../../config');

function getFileAst(file) {
  const c = fs.readFileSync(file).toString();
  return babylon.parse(c, {
    sourceType: 'module',
    plugins: ['*'],
  });
}

const ROUTER_CONFIG = 'routerConfig'; // AST 解析 routeConfig.js 的变量名
const MENU_CONFIG = 'asideMenuConfig'; // AST 解析 menuConfig.js 的变量名

// 过滤 menuConfig 配置
function removePageMenuConfig(elements, routerPath) {
  return elements.filter((element) => {
    return !element.properties.some((op) => {
      // 如果存在次级路由
      if (op.key.name == 'children' && t.isArrayExpression(op.value)) {
        op.value.elements = removePageMenuConfig(op.value.elements, routerPath);
        return false;
      } else {
        return op.key.name == 'path' && op.value.value == routerPath;
      }
    });
  });
}

module.exports = async function({ 
  clientSrcPath, // 项目路径
  pageFolderName,  // 页面文件夹名
  routerPath = '', // 路由路径
}) {
  const pageImportPath = `./pages/${pageFolderName}`; // 文件导入路径
  const routerConfigFilePath = path.join(clientSrcPath, 'routerConfig.js'); // 路由配置文件全路径
  const pageFullPath = path.join(clientSrcPath, `/pages/${pageFolderName}`); // 文件全路径

  let componentName = ''; // 组件名

  // 1. 删除文件
  rimraf.sync(pageFullPath);

  // 2. 删除路由配置
  // 移除 import 节点，并记录 componentName、 routerPath 用于后续处理。
  const routerConfigAST = getFileAst(routerConfigFilePath);
  traverse(routerConfigAST, {
    ImportDeclaration(path) {
      const { node } = path;
      if (
        t.isStringLiteral(node.source) &&  
        node.source.value === pageImportPath
      ) {
        // 获取页面对应的组件名。
        node.specifiers.forEach( specifier => {
          if (
            t.isImportDefaultSpecifier(specifier) &&
            t.isIdentifier(specifier.local)
          ) {
            componentName = specifier.local.name;
          }
        });
        // 移除对应import节点
        path.remove();
      }
    }
  });
  // 移除 routerConfig 中配置
  traverse(routerConfigAST, {
    VariableDeclarator({ node }) {
      if (
        t.isIdentifier(node.id, { name: ROUTER_CONFIG }) &&
        t.isArrayExpression(node.init)
      ) {
        // 过滤path
        node.init.elements = node.init.elements.filter((element) => {
          // 记录匹配状态
          const ifMatched = element.properties.some((op) => {
            return op.key.name == 'component' && op.value.name == componentName;
          });
          // 如果匹配到过滤条件，则设置routerPath
          if (ifMatched) {
            element.properties.forEach( op => {
              if (op.key.name == 'path') {
                routerPath = op.value.value;
              }
            });
          }
          // 过滤
          return !ifMatched;
        })
      }
    }
  });
  // 重写 routerConfig.js
  fs.writeFileSync(
    routerConfigFilePath,
    prettier.format(generator(routerConfigAST).code, config.prettier)
  );

  // 3. 删除menu配置
  if (routerPath) {
    const menuConfigFilePath = path.join(clientSrcPath, 'menuConfig.js');
    const menuConfigAST = getFileAst(menuConfigFilePath);
  
    traverse(menuConfigAST, {
      VariableDeclarator(path) {
        if (
          t.isIdentifier(path.node.id, { name: MENU_CONFIG }) &&
          t.isArrayExpression(path.node.init)
        ) {
          // 移除menu配置
          path.node.init.elements = removePageMenuConfig(path.node.init.elements, routerPath);
        }
      },
    });
  
    fs.writeFileSync(
      menuConfigFilePath,
      prettier.format(generator(menuConfigAST).code, config.prettier)
    );
  }
 
};
