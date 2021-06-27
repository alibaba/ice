const Visitor = require('@swc/core/Visitor').default;
const t = require('@babel/types');

module.exports = (filename, { importDeclarations }) => {
  return class extends Visitor {
    visitProgram(node) {
      if (this.filename.includes('.ice')) {
        return node;
      }
      super.visitProgram(node);
      return node;
    }

    visitImportDeclaration(node) {
      if (t.isStringLiteral(node.source, { value: 'ice' }) || t.isStringLiteral(node.source, { value: 'rax-app' })) {
        // check import specifier
        // only transform parttern like: import { withAuth, useAuth } from 'ice';
        const needTransform = node.specifiers.every((specifier) => {
          return t.isImportSpecifier(specifier) && importDeclarations[specifier.local.value];
        });
        if (needTransform) {
          return node;
        } else {
          console.log('[swc transform]', `${filename} import statement does not meet the specification`);
          return node;
        }
      }
      return node;
    }
  };
};
