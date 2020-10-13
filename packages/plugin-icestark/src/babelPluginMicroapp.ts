import * as t from '@babel/types';

const templateIfStatement = 'if (!isInIcestark()) {}';
const templateExportStatement = `
export const mount = (props) => {
  createApp(APP_CONFIG);
};
export const unmount = ({ container, customProps }) => {
  if (APP_CONFIG?.icestark?.regsiterAppLeave) {
    APP_CONFIG.icestark.regsiterAppLeave(container, customProps);
  } else {
    ReactDOM.unmountComponentAtNode(container);
  }
};`;

const getUid = () => {
  let uid = 0;
  return () => `_APP_CONFIG${(uid++) || ''}`;
};

export default (api, { entryList }) => {
  let namespaceSpecifier: string;
  let importSpecifier: string;
  let configIdentifier: string;
  let replaced = false;

  const checkEntryFile = (filename: string) => {
    return !!entryList.find((filePath: string) => {
      // filePath may not have an extension
      return filePath.includes((filename || '').replace(/\.[^/.]+$/, ''));
    });
  };
  
  return {
    visitor: {
      Program(nodePath, state) {
        if (checkEntryFile(state.filename)) {
          const node: t.Program = nodePath.node;
          const { body } = node;
          let starkappStatement = false;
          let reactdomStatement = false;
          let lastImportIndex = 0;
          body.forEach((item, index) => {
            // check ImportDeclaration
            if (t.isImportDeclaration(item)) {
              if (t.isStringLiteral(item.source, { value: 'ice'})) {
                item.specifiers.forEach((value) => {
                  if (t.isImportNamespaceSpecifier(value)) {
                    namespaceSpecifier = value.local.name;
                  }
                  if (t.isImportSpecifier(value)) {
                    importSpecifier = value.local.name;
                  }
                });
              } else if (t.isIdentifier(item.source, { value: '@ice/stark-app'})) {
                starkappStatement = true;
                let importIsInIcestark = false;
                item.specifiers.forEach((value) => {
                  if (t.isImportSpecifier(value) && t.isIdentifier(value.local, { name: 'isInIcestark'})) {
                    importIsInIcestark = true;
                  }
                });
                if (!importIsInIcestark) {
                  item.specifiers.push(t.importSpecifier(t.identifier('isInIcestark'), t.identifier('isInIcestark')));
                }
              // check import ReactDOM from 'react-dom';
              } else if (t.isIdentifier(item.source, { value: 'react-dom'})) {
                reactdomStatement = true;
                let importReactDOM = false;
                item.specifiers.forEach((value) => {
                  if (t.isImportDefaultSpecifier(value) && t.isIdentifier(value.local, { name: 'ReactDOM'})) {
                    importReactDOM = true;
                  }
                });
                if (!importReactDOM) {
                  item.specifiers.push(t.importDefaultSpecifier(t.identifier('ReactDOM')));
                }
              }
              lastImportIndex = index;
            }
          });
          // import @ice/stark-app
          if (!starkappStatement) {
            const starkappImport = t.importDeclaration(
              [t.importSpecifier(t.identifier('isInIcestark'), t.identifier('isInIcestark'))],
              t.stringLiteral('@ice/stark-app'),
            );
            lastImportIndex += 1;
            body.splice(lastImportIndex, 0, starkappImport);
          }

          // import ReactDOM from 'react-dom';
          if (!reactdomStatement) {
            lastImportIndex += 1;
            body.splice(lastImportIndex, 0, t.importDeclaration([t.importDefaultSpecifier(t.identifier('ReactDOM'))], t.stringLiteral('react-dom')));
          }
        }
      },
      ExpressionStatement(nodePath, state) {
        if (checkEntryFile(state.filename) && !replaced) {
          const node: t.ExpressionStatement = nodePath.node;
          // replace with if statement
          const memberExpressisonCallee = namespaceSpecifier
            && t.isCallExpression(node.expression)
            && t.isMemberExpression(node.expression.callee)
            && t.isIdentifier(node.expression.callee.object, { name: namespaceSpecifier})
            && t.isIdentifier(node.expression.callee.property, { name: 'createApp'});
          const identifierCallee = importSpecifier
            && t.isCallExpression(node.expression)
            && t.isIdentifier(node.expression.callee, { name: importSpecifier});


          if (memberExpressisonCallee || identifierCallee) {
            const expression = node.expression as t.CallExpression;
            if (t.isIdentifier(expression.arguments[0])) {
              configIdentifier = expression.arguments[0].name;
            } else {
              // check current scope
              const gid = getUid();
              let breakLoop = false;
              while(!breakLoop) {
                configIdentifier = gid();
                if (!nodePath.scope.hasOwnBinding(configIdentifier)) {
                  breakLoop = true;
                }
              }
              nodePath.container.splice(nodePath.key - 1, 0,
                t.variableDeclaration(
                  'var',
                  [t.variableDeclarator(
                    t.identifier(configIdentifier),
                    expression.arguments[0] as t.Expression)
                  ]));
              expression.arguments = [t.identifier(configIdentifier)];
            }
            const astIf = api.template(templateIfStatement)();
            astIf.consequent.body.push(node);
            nodePath.replaceWith(astIf);

            const astExport = api.template(templateExportStatement)({
              APP_CONFIG: configIdentifier
            });
            nodePath.insertAfter(astExport);
            replaced = true;
          }
        }
      }
    },
  };
};