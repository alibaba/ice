import type { NodePath } from '@babel/traverse';
import * as t from '@babel/types';

const removeUnreferencedCode = (nodePath: NodePath<t.Program>) => {
  let hasRemoved = false;

  // Update bindings removed in enter hooks.
  nodePath.scope.crawl();
  for (const [, binding] of Object.entries(nodePath.scope.bindings)) {
    if (!binding.referenced && binding.path.node) {
      const nodeType = binding.path.node.type;
      if (['VariableDeclarator', 'ImportSpecifier', 'FunctionDeclaration'].includes(nodeType)) {
        if (nodeType === 'ImportSpecifier' && (binding.path.parentPath.node as t.ImportDeclaration).specifiers.length === 1) {
          binding.path.parentPath.remove();
        } else if (nodeType === 'VariableDeclarator') {
          if (binding.identifier === binding.path.node.id) {
            binding.path.remove();
          } else {
            if (binding.path.node.id.type === 'ArrayPattern') {
              binding.path.node.id.elements = binding.path.node.id.elements.filter((element) =>
                (element !== binding.identifier && (element as t.RestElement)?.argument !== binding.identifier));
              if (binding.path.node.id.elements.length === 0) {
                binding.path.remove();
              }
            } else if (binding.path.node.id.type === 'ObjectPattern') {
              binding.path.node.id.properties = binding.path.node.id.properties.filter((property) =>
                ((property as t.ObjectProperty)?.value !== binding.identifier &&
                  (property as t.RestElement)?.argument !== binding.identifier));
              if (binding.path.node.id.properties.length === 0) {
                binding.path.remove();
              }
            }
          }
        } else {
          binding.path.remove();
        }
        hasRemoved = true;
      } else if (['ImportDefaultSpecifier'].includes(nodeType)) {
        binding.path.parentPath.remove();
        hasRemoved = true;
      }
    }
  }
  if (hasRemoved) {
    // Remove code until there is no more to removed.
    removeUnreferencedCode(nodePath);
  }
};

const removeTopLevelCode = () => {
  return {
    ExportNamedDeclaration: {
      enter(nodePath: NodePath<t.ExportNamedDeclaration>) {
        const { node } = nodePath;
        // export function getConfig() {}
        const isFunctionExport = t.isFunctionDeclaration(node.declaration) && t.isIdentifier(node.declaration.id, { name: 'getConfig' });
        // export const getConfig = () => {}
        const isVariableExport = t.isVariableDeclaration(node.declaration) && t.isIdentifier(node.declaration.declarations![0]?.id, { name: 'getConfig' });
        // export { getConfig };
        if (node.specifiers && node.specifiers.length > 0) {
          nodePath.traverse({
            ExportSpecifier(nodePath: NodePath<t.ExportSpecifier>) {
              if (!t.isIdentifier(nodePath.node.exported, { name: 'getConfig' })) {
                nodePath.remove();
              }
            },
          });
          node.specifiers = node.specifiers.filter(specifier => t.isIdentifier(specifier.exported, { name: 'getConfig' }));
        } else if (!isFunctionExport && !isVariableExport) {
          // Remove named export expect 'getConfig'.
          nodePath.remove();
        }
      },
    },
    ExportDefaultDeclaration: {
      enter(nodePath: NodePath<t.ExportDefaultDeclaration>) {
        // Remove default export declaration.
        nodePath.remove();
      },
    },
    ExpressionStatement: {
      enter(nodePath: NodePath<t.ExpressionStatement>) {
        // Remove top level call expression.
        if (nodePath.parentPath.isProgram() && t.isCallExpression(nodePath.node.expression)) {
          nodePath.remove();
        }
      },
    },
    ImportDeclaration: {
      enter(nodePath: NodePath<t.ImportDeclaration>) {
        // Remove import statement without specifiers.
        if (nodePath.node.specifiers.length === 0) {
          nodePath.remove();
        }
      },
    },
    'IfStatement|TryStatement|WhileStatement|DoWhileStatement': {
      // Remove statement even if it's may cause variable changed.
      enter(nodePath: NodePath<t.IfStatement | t.TryStatement | t.WhileStatement>) {
        // TODO: check expression statement if it is changed top level variable referenced by getConfig
        nodePath.remove();
      },
    },
    Program: {
      exit(nodePath: NodePath<t.Program>) {
        removeUnreferencedCode(nodePath);
      },
    },
  };
};

export default removeTopLevelCode;
