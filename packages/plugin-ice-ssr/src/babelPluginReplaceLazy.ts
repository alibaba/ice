const lazyImportName = 'lazy';
const loadableImportName = 'loadable';

module.exports = ({ types: t }) => {
  return {
    visitor: {
      Program: {
        enter(programPath){
          programPath.traverse({
            ImportDeclaration(nodePath) {
              const { node } = nodePath;
              if (t.isStringLiteral(node.source, { value: 'ice' })) {
                const { specifiers } = node;
                specifiers.forEach((specifier) => {
                  const { imported, local } = specifier;

                  const importedName = imported.name;
                  const localName = local.name;
                  if (localName !== importedName) {
                    return;
                  }
                  if (importedName === lazyImportName) {
                    nodePath.replaceWith(
                      t.importDeclaration(
                        [
                          t.importSpecifier(t.identifier(loadableImportName), t.identifier(lazyImportName))
                        ],
                        t.stringLiteral(node.source.value)
                      )
                    );
                  }
                });
              }
            },
            CallExpression(nodePath) {
              const calleeName = nodePath.node.callee.name;
              if (calleeName && calleeName === lazyImportName) {
                nodePath.replaceWith(
                  t.callExpression(
                    t.identifier(loadableImportName),
                    nodePath.node.arguments
                  )
                );
              }
            }
          });
        },
      }
    }
  };
};
