import * as t from '@babel/types';

const templateIfStatement = 'if (!isInIcestark()) {}';
const templateExportStatement = `
export const mount = (props) => {
  APP_CALLEE(APP_CONFIG);
};
export const unmount = ({ container, customProps }) => {
  if (APP_CONFIG?.icestark?.regsiterAppLeave) {
    APP_CONFIG.icestark.regsiterAppLeave(container, customProps);
  } else {
    ReactDOM.unmountComponentAtNode(container);
  }
};
export const bootstrap = () => {
  console.log('bootstrap');
};`;
const templateModeStatement = `
if (typeof window !== 'undefined' && window.ICESTARK && window.ICESTARK.loadMode && window.ICESTARK.loadMode !== 'umd') {
  console.warn('[icestark] unable to get lifecycle from umd module without specify the configration of umd');
}
`;

const getUid = () => {
  let uid = 0;
  return () => `_APP_CONFIG${(uid++) || ''}`;
};

export default (api, { entryList }) => {
  const namespaceSpecifier: string[] = [];
  const importSpecifier: string[] = [];
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
                    namespaceSpecifier.push(value.local.name);
                  }
                  if (t.isImportSpecifier(value)) {
                    importSpecifier.push(value.local.name);
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

          // inject code of icestark load mode
          const codeAst = api.template(templateModeStatement)({
            ICESTARK: 'ICESTARK',
          });
          body.push(codeAst);
        }
      },
      ExpressionStatement(nodePath, state) {
        if (checkEntryFile(state.filename) && !replaced) {
          const node: t.ExpressionStatement = nodePath.node;
          let callIdentifier = '';
          if (namespaceSpecifier.length
            && t.isCallExpression(node.expression)
            && t.isMemberExpression(node.expression.callee)
            && namespaceSpecifier.some(specifier => t.isCallExpression(node.expression) && t.isMemberExpression(node.expression.callee) && t.isIdentifier(node.expression.callee.object, { name: specifier})))
          {
            callIdentifier = t.isIdentifier(node.expression.callee.property, { name: 'createApp'}) ? 'createApp' : 'runApp';
          }

          let identifierCallee = '';
          if (importSpecifier.length
            && t.isCallExpression(node.expression)
            && importSpecifier.some(specifier => t.isCallExpression(node.expression) && t.isIdentifier(node.expression.callee, { name: specifier })))
          {
            identifierCallee = t.isIdentifier(node.expression.callee, { name: 'createApp'}) ? 'createApp' : 'runApp';
          }

          if (callIdentifier || identifierCallee) {
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
            // replace with if statement
            const astIf = api.template(templateIfStatement)();
            astIf.consequent.body.push(node);
            nodePath.replaceWith(astIf);

            const astExport = api.template(templateExportStatement)({
              APP_CONFIG: configIdentifier,
              APP_CALLEE: callIdentifier || identifierCallee,
            });
            nodePath.insertAfter(astExport);
            replaced = true;
          }
        }
      }
    },
  };
};