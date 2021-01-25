module.exports = ({ types }, { routesPath }) => {
  let hasLazyImport = false;
  let importName = '';
  return {
    visitor: {
      ImportDeclaration(nodePath, state) {
        // only transform route files
        const isRoutesFile = routesPath === state.filename;
        if (isRoutesFile) {
          const { node } = nodePath;
          if (types.isStringLiteral(node.source, { value: 'ice'})) {
            node.specifiers.forEach((importSpecifier) => {
              if (importSpecifier.imported && types.isIdentifier(importSpecifier.imported, { name: 'lazy'})) {
                hasLazyImport = true;
              }
              if (types.isImportNamespaceSpecifier(importSpecifier)) {
                // ice has no default export, just check ImportNamespaceSpecifier
                importName = importSpecifier.local && importSpecifier.local.name;
              }
            });
          }
        }
      },
      CallExpression(nodePath, state) {
        // only transform route files
        const isRoutesFile = routesPath === state.filename;
        if (isRoutesFile) {
          const { node } = nodePath;
          if (
            // case import * as xxx from 'ice'; xxx.lazy
            (importName && types.isMemberExpression(node.callee)
              && types.isIdentifier(node.callee.object, { name: importName})
              && types.isIdentifier(node.callee.property, { name: 'lazy'})) ||

            (hasLazyImport && (
              // case import { lazy } from 'ice';
              types.isIdentifier(node.callee, { name: 'lazy' }) ||
              // case import { lazy as loadable } from 'ice';
              types.isIdentifier(node.callee, { name: 'loadable' }))
            )
          ) {
            if (node.arguments.length === 1) {
              node.arguments.push(types.booleanLiteral(true));
            }
          }
        }
      },
    },
  };
};
