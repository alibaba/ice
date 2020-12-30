module.exports = (babel, { importDeclarations }) => {
  const { types: t } = babel;
  return {
    visitor: {
      ImportDeclaration(nodePath, state) {
        const { node } = nodePath;
        if (t.isStringLiteral(node.source, { value: 'ice' })) {
          // check import specifier
          // only transform parttern like: import { withAuth, useAuth } from 'ice';
          const needTransform = node.specifiers.every((specifier) => {
            return t.isImportSpecifier(specifier) && importDeclarations[specifier.imported.name];
          });
          if (needTransform) {
            const transformNodes = node.specifiers.map((specifier) => {
              const importName = specifier.imported.name;
              const { value, type } = importDeclarations[importName];
              return t.importDeclaration(
                [type === 'default' ?
                  t.importDefaultSpecifier(t.identifier(importName)) : t.importSpecifier(t.identifier(importName), t.identifier(importName))
                ], t.stringLiteral(value));
            });
            nodePath.replaceWithMultiple(transformNodes);
          } else {
            console.log('[babel transform]', `${state.filename} import statement of ice does not meet the specification`);
          }
        }
      },
    }
  };
};
