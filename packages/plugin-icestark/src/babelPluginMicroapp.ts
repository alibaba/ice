import * as t from '@babel/types';

const templateIfStatement = 'if (!isInIcestark()) {}';

const templateSetLibraryStatement = `
if (!OMIT_SETLIBRARY) {
  setLibraryName(LIBRARY);
}`;

const templateExportStatement = `
export const mount = async (props) => {
  (APP_CONFIG.icestark = APP_CONFIG.icestark || {}).$$props = props;
  APP_CALLEE(APP_CONFIG);
};
export const unmount = async ({ container, customProps }) => {
  if(APP_CONFIG?.icestark?.regsiterAppLeave) {
    APP_CONFIG.icestark.regsiterAppLeave(container, customProps);
  } else {
    ReactDOM.unmountComponentAtNode(container);
  }
};
export const bootstrap = async () => {
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

export default (api, { checkEntryFile, libraryName, omitSetLibraryName }) => {
  return {
    visitor: {
      Program: {
        enter (nodePath, state) {
          if (checkEntryFile(state.filename)) {
            const node: t.Program = nodePath.node;
            const { body } = node;

            const namespaceSpecifier: string[] = [];
            const importSpecifier: string[] = [];

            let starkappStatement = false;
            let reactdomStatement = false;
            let replaced = false;

            let configIdentifier: string;
            let callIdentifier = '';
            let identifierCallee = '';

            let mountExportStatement = false;
            let unmountExportStatement = false;
            let setLibraryNameStatement = false;

            let lastImportIndex = 0;

            body.forEach((item, index) => {
              // check ImportDeclaration
              if (t.isImportDeclaration(item)) {
                if (t.isStringLiteral(item.source, { value: process.env.__FRAMEWORK_NAME__ || 'ice' })) {
                  item.specifiers.forEach((value) => {
                    if (t.isImportNamespaceSpecifier(value)) {
                      namespaceSpecifier.push(value.local.name);
                    }
                    if (t.isImportSpecifier(value)) {
                      importSpecifier.push(value.local.name);
                    }
                  });
                } else if (t.isStringLiteral(item.source, { value: '@ice/stark-app'})) {
                  starkappStatement = true;
                  let importIsInIcestark = false;
                  let importSetLibraryName = false;
                  item.specifiers.forEach((value) => {
                    if (t.isImportSpecifier(value) && t.isIdentifier(value.local, { name: 'isInIcestark'})) {
                      importIsInIcestark = true;
                    }
                    if (t.isImportSpecifier(value) && t.isIdentifier(value.local, { name: 'setLibraryName'})) {
                      importSetLibraryName = true;
                    }
                  });
                  if (!importIsInIcestark) {
                    item.specifiers.push(t.importSpecifier(t.identifier('isInIcestark'), t.identifier('isInIcestark')));
                  }
                  if (!importSetLibraryName) {
                    item.specifiers.push(t.importSpecifier(t.identifier('setLibraryName'), t.identifier('setLibraryName')));
                  }
                // check import ReactDOM from 'react-dom';
                } else if (t.isStringLiteral(item.source, { value: 'react-dom'})) {
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
  
              if (t.isExpressionStatement(item)
                && t.isCallExpression (item.expression)
                && t.isIdentifier(item.expression.callee)
                && item.expression.callee.name === 'setLibraryName') {
                setLibraryNameStatement = true;
              }
  
              // check lifecycle functions
              if (t.isExportNamedDeclaration(item)) {
                // like `export function mount() {}`
                const isFuntionDec = (name: string) => t.isFunctionDeclaration(item.declaration) && t.isIdentifier(item.declaration.id, { name });
                // like `export const mount = () => {}`
                const isVariableDec = (name: string) => t.isVariableDeclaration(item.declaration) && t.isIdentifier(item.declaration.declarations[0], { name });
  
                if (isFuntionDec('mount') || isVariableDec('mount')) {
                  mountExportStatement = true;
                }
  
                if (isFuntionDec('unmount') || isVariableDec('unmount')) {
                  unmountExportStatement = true;
                }
              }
            });
  
            // import @ice/stark-app
            if (!starkappStatement) {
              const starkappImport = t.importDeclaration(
                [
                  t.importSpecifier(t.identifier('isInIcestark'), t.identifier('isInIcestark')),
                  t.importSpecifier(t.identifier('setLibraryName'), t.identifier('setLibraryName'))
                ],
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
  
            // inject setLibraryName
            if (!setLibraryNameStatement) {
              const setLibraryAst = api.template(templateSetLibraryStatement)({
                LIBRARY: t.stringLiteral(libraryName),
                OMIT_SETLIBRARY: t.booleanLiteral(omitSetLibraryName),
              });
              body.push(setLibraryAst);
            }

            // traveser
            nodePath.traverse({
              ExpressionStatement(expressionNodePath) {
                if (!replaced) {
                  const expressionNode: t.ExpressionStatement = expressionNodePath.node;
                  if (namespaceSpecifier.length
                    && t.isCallExpression(expressionNode.expression)
                    && t.isMemberExpression(expressionNode.expression.callee)
                    && namespaceSpecifier.some(specifier => t.isCallExpression(expressionNode.expression) && t.isMemberExpression(expressionNode.expression.callee) && t.isIdentifier(expressionNode.expression.callee.object, { name: specifier})))
                  {
                    callIdentifier = t.isIdentifier(expressionNode.expression.callee.property, { name: 'createApp'}) ? 'createApp' : 'runApp';
                  }
        
                  if (importSpecifier.length
                    && t.isCallExpression(expressionNode.expression)
                    && importSpecifier.some(specifier => t.isCallExpression(expressionNode.expression) && t.isIdentifier(expressionNode.expression.callee, { name: specifier })))
                  {
                    identifierCallee = t.isIdentifier(expressionNode.expression.callee, { name: 'createApp'}) ? 'createApp' : 'runApp';
                  }
        
                  if (callIdentifier || identifierCallee) {
                    const expression = expressionNode.expression as t.CallExpression;
                    if (t.isIdentifier(expression.arguments[0])) {
                      configIdentifier = expression.arguments[0].name;
                    } else {
                      // check current scope
                      const gid = getUid();
                      let breakLoop = false;
                      while(!breakLoop) {
                        configIdentifier = gid();
                        if (!expressionNodePath.scope.hasOwnBinding(configIdentifier)) {
                          breakLoop = true;
                        }
                      }
                      expressionNodePath.container.splice(expressionNodePath.key - 1, 0,
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
                    astIf.consequent.body.push(expressionNode);
                    expressionNodePath.replaceWith(astIf);
                    replaced = true;
                  }
                }
              }
            });
  
            // inject load mode (compatible for icestark 1.x)
            const codeAst = api.template(templateModeStatement)({
              ICESTARK: 'ICESTARK',
            });
            body.push(codeAst);

            // inject lifecycles
            const noCustomLifecycles = !(mountExportStatement || unmountExportStatement);
            if (noCustomLifecycles) {
              const astExport = api.template(templateExportStatement)({
                APP_CONFIG: configIdentifier,
                APP_CALLEE: callIdentifier || identifierCallee
              });
              if (astExport.length) {
                astExport.forEach(ast => body.push(ast));
              }
            }
          }
        },
      },

    },
  };
};