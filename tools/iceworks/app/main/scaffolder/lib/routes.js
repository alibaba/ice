/**
 * Created at 2018/3/12.
 * @Author Ling.
 * @Email i@zeroling.com
 */

const path = require('path');
const babylon = require('babylon');
const babelGenerator = require('@babel/generator').default;
const babelTypes = require('@babel/types');

/**
 * 解析路由
 */
exports._parseRoute = (str) => {
  const ast = babylon.parse(str, {
    // parse in strict mode and allow module declarations
    sourceType: 'module',

    plugins: ['*'],
  });

  return ast;
};

exports._generateRoute = (ast) => {
  return babelGenerator(ast, {});
};

/**
 * exports.addRoute(ast.program.body, {
 *   path: '/page-new/add-demo',
 *   childRoutes: [],
 *   component: "id HelloWorldHeaderAsideFooterLayout",
 *   indexRoute: {
 *     component: 'id PageDemo'
 *   },
 * });
 * @param programBody
 * @param route
 * @param position, before 在前面增加, after 在后面增加
 * @returns {*}
 */
exports.addRoute = (programBody, route, position = 'before') => {
  const routeVariableDeclaration = findRouteDeclaration(programBody);
  if (!routeVariableDeclaration) {
    console.log('add route failed', 'not found route variable declaration.');
    return programBody;
  }

  const routeVariableDeclarator = routeVariableDeclaration.declarations[0];
  const {
    init: { elements },
  } = routeVariableDeclarator;

  function createProperties(obj) {
    return Object.keys(obj).map((key) => {
      const value = obj[key];

      const propertyValue = Array.isArray(value)
        ? babelTypes.identifier(JSON.stringify(value))
        : typeof value === 'object'
          ? babelTypes.objectExpression(createProperties(value))
          : /^id /.test(value)
            ? babelTypes.identifier(value.slice(3))
            : babelTypes.stringLiteral(value);

      return babelTypes.objectProperty(
        babelTypes.identifier(key),
        propertyValue
      );
    });
  }

  const properties = createProperties(route);
  const newRouteDefinitionObjectExpression = babelTypes.objectExpression(
    properties
  );

  if (position === 'before') {
    elements.unshift(newRouteDefinitionObjectExpression);
  } else if (position === 'after') {
    elements.push(newRouteDefinitionObjectExpression);
  }

  return programBody;
};

/**
 * exports.addImports(ast.program.body, [
 *   { type: 'page', ref: 'XXX', }
 *   { type: 'layout', ref: '', }
 * ]);
 */
exports.addImports = (programBody, imports = []) => {
  const imported = {};
  const routeVariableDeclaration = findRouteDeclaration(programBody);
  programBody.forEach((declaration) => {
    const { type, source, specifiers } = declaration || {};
    const isImport = type === 'ImportDeclaration';
    if (isImport) {
      imported[specifiers[0].local.name] = source.value;
    }
    return isImport;
  });

  if (routeVariableDeclaration) {
    // 如果不删除 start, 会影响生成位置
    delete routeVariableDeclaration.start;
  }

  imports
    .filter((importStatement) => {
      const { type, ref } = importStatement;
      const path = `./${type}s/${ref}`;
      if (ref in imported) {
        return false;
      } else {
        importStatement.path = path;
        return true;
      }
    })
    .forEach(({ ref, path }, idx) => {
      // // 插入到最后一行 import 语句
      // programBody.splice(
      //   importDeclarations.length + idx - 1,
      //   1,
      //   babelTypes.importDeclaration(
      //     [babelTypes.importDefaultSpecifier(babelTypes.identifier(ref))],
      //     babelTypes.stringLiteral(path)
      //   ),
      //   importDeclarations[importDeclarations.length + idx - 1]
      // );
      // import 插入到最顶上一行
      programBody.unshift(
        babelTypes.importDeclaration(
          [babelTypes.importDefaultSpecifier(babelTypes.identifier(ref))],
          babelTypes.stringLiteral(path)
        )
      );
    });

  return programBody;
};

/**
 * exports.removeImports(ast.program.body, [
 * { type: 'layout', ref: 'HelloWorldHeaderAsideFooterLayout', },
 * { type: 'page', ref: 'PageDemo', },
 * ]);
 * @param programBody
 * @param imports
 */
exports.removeImports = (programBody, imports = []) => {
  const imported = {};
  programBody.forEach(({ type, specifiers }, idx) => {
    const isImport = type === 'ImportDeclaration';
    if (isImport) {
      imported[specifiers[0].local.name] = idx;
    }
  });

  // splice 有副作用, 所以需要倒序来删除
  imports
    .map(({ ref }) => imported[ref])
    .filter((key) => typeof key !== 'undefined')
    .sort()
    .reverse()
    .forEach((idx) => {
      programBody.splice(idx, 1);
    });
};

/**
 * 删除路由
 * @param programBody
 * @param path
 */
exports.removeRoute = (programBody, path) => {
  const paths = path.replace(/^\//, '').split('/');
  if (paths.length === 0) {
    paths.push('/');
  }

  const routeVariableDeclaration = findRouteDeclaration(programBody);
  if (!routeVariableDeclaration) {
    console.log('remove failed', 'not found route var declaration');
    return programBody;
  }

  const routeVariableDeclarator = routeVariableDeclaration.declarations[0];
  const {
    init: { elements },
  } = routeVariableDeclarator;

  routeVariableDeclarator.init.elements = elements.filter(
    (objectExpression, idx) => {
      let needFirstLevelRoute = true;
      objectExpression.properties.forEach((pty) => {
        if (
          pty.key &&
          pty.key.name === 'path' &&
          pty.value.value === '/' + paths[0] &&
          paths[1] === undefined
        ) {
          needFirstLevelRoute = false;
        } else if (
          pty.key &&
          pty.key.name === 'childRoutes' &&
          paths.length > 1 &&
          babelTypes.isArrayExpression(pty.value) &&
          pty.value.elements.length > 0
        ) {
          const ladderPath = paths.slice(1).join('/');

          pty.value.elements = pty.value.elements.filter((objectExpression) => {
            let needChildRoute = true;
            objectExpression.properties.forEach((pty) => {
              if (
                pty.key &&
                pty.key.name === 'path' &&
                pty.value.value === ladderPath
              ) {
                // need to delete
                needChildRoute = false;
              }
            });
            return needChildRoute;
          });
        }
      });
      return needFirstLevelRoute;
    }
  );

  return removeInneedRoute(programBody);
};

// exports.removeRouteByPageName(ast.program.body, 'NotFound');
exports.removeRouteByPageName = function(programBody, pageName) {
  const paths = [];
  const routeVariableDeclaration = findRouteDeclaration(programBody);
  if (!routeVariableDeclaration) {
    console.log('remove failed', 'not found route var declaration');
    return programBody;
  }

  const routeVariableDeclarator = routeVariableDeclaration.declarations[0];
  const {
    init: { elements },
  } = routeVariableDeclarator;

  const needDeleteIndexRouteIds = [];
  elements.forEach((objectExpression, idx) => {
    let currentPath = '';
    const childPaths = [];
    objectExpression.properties.forEach((pty) => {
      if (pty.key && pty.key.name === 'indexRoute') {
        pty.value.properties.forEach((idxRoutePty) => {
          if (
            isIdentifier(idxRoutePty.key, 'component') &&
            isIdentifier(idxRoutePty.value, pageName)
          ) {
            needDeleteIndexRouteIds.push(idx);
          }
        });
      } else if (
        pty.key &&
        pty.key.name === 'childRoutes' &&
        babelTypes.isArrayExpression(pty.value) &&
        pty.value.elements.length > 0
      ) {
        pty.value.elements = pty.value.elements.filter((objectExpression) => {
          let needChildRoute = true;
          let path = '';
          objectExpression.properties.forEach((pty) => {
            if (
              pty.key &&
              pty.key.name === 'component' &&
              isIdentifier(pty.value, pageName)
            ) {
              // need to delete
              needChildRoute = false;
            }
            if (pty.key && pty.key.name === 'path') {
              path = pty.value.value;
            }
          });

          if (!needChildRoute) {
            childPaths.push(path);
          }
          return needChildRoute;
        });
      } else if (pty.key && pty.key.name === 'path') {
        currentPath = pty.value.value;
      }
    });
    childPaths.forEach((p) => {
      paths.push(path.join(currentPath, p));
    });
  });

  // 删除 indexRoute
  needDeleteIndexRouteIds.forEach((idx) => {
    elements[idx].properties = elements[idx].properties.filter((pty) => {
      return !isIdentifier(pty.key, 'indexRoute');
    });
  });

  removeInneedRoute(programBody);

  return paths;
};

/**
 * 移除没有 indexRoute 也没有 childRoute 的对象
 * @param programBody
 */
function removeInneedRoute(programBody) {
  const toDeleteIdx = [];
  const routeVariableDeclaration = findRouteDeclaration(programBody);
  if (!routeVariableDeclaration) {
    return programBody;
  }

  const routeVariableDeclarator = routeVariableDeclaration.declarations[0];
  const {
    init: { elements },
  } = routeVariableDeclarator;
  elements.forEach((objectExpression, idx) => {
    let haveIndexRoute = false;
    let haveChildRoutes = false;
    if (Array.isArray(objectExpression.properties)) {
      objectExpression.properties.forEach((pty) => {
        switch (pty.key.name) {
          case 'indexRoute':
            haveIndexRoute = true;
            break;
          case 'childRoutes':
            if (
              pty.value &&
              pty.value &&
              pty.value.elements &&
              pty.value.elements.length > 0
            ) {
              haveChildRoutes = true;
            }
            break;
          default:
            break;
        }
      });
    }

    if (!haveChildRoutes && !haveIndexRoute) {
      toDeleteIdx.push(idx);
    }
  });

  toDeleteIdx
    .sort()
    .reverse()
    .forEach((idx) => {
      routeVariableDeclarator.init.elements.splice(idx, 1);
    });
  return programBody;
}

// 找到定义 route 对象的节点
function findRouteDeclaration(programBody = []) {
  const declaration = programBody.find((part) => {
    const { type, declarations } = part || {};
    return (
      type === 'VariableDeclaration' &&
      declarations &&
      isIdentifier(
        declarations && declarations[0] && declarations[0].id,
        'autoGeneratedRoutes'
      )
    );
  });
  if (declaration) {
    return declaration;
  } else {
    return null;
  }
}

// const ast = exports._parseRoute(`
// import HeaderAsideFooterLayout from './layouts/HeaderAsideFooterLayout';
// import Home from './pages/Home';
// import HeaderFooterLayout from './layouts/HeaderFooterLayout';
// import NotFound from './pages/NotFound';
// import PageDemo from './pages/PageDemo';
// const autoGeneratedRoutes = [
//   {
//     path: '/page-demo',
//     childRoutes: [{ path: 'asd', childRoutes: [], component: NotFound }],
//     component: HeaderAsideFooterLayout,
//     indexRoute: { component: PageDemo },
//   },
//   {
//     path: '/',
//     childRoutes: [{ path: '*', childRoutes: [], component: NotFound }],
//     component: HeaderAsideFooterLayout,
//     indexRoute: { component: Home },
//   },
// ];
// `);

// const { code } = exports._generateRoute({
//   type: 'Program',
//   body: ast.program.body
// });
//
// console.log(code);

function isIdentifier(node, name) {
  const isId = node && node.type === 'Identifier';
  if (name) {
    return isId && node && node.name === name;
  } else {
    return isId;
  }
}
