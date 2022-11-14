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
        if (nodeType === 'ImportSpecifier' && (binding.path.parentPath.node as t.ImportDeclaration)?.specifiers.length === 1) {
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

const keepExportCode = (identifier: t.Identifier, keepExports: string[]) => {
  return keepExports.some((exportString) => {
    return t.isIdentifier(identifier, { name: exportString });
  });
};

const removeTopLevelCode = (keepExports: string[] = []) => {
  return {
    ExportNamedDeclaration: {
      enter(nodePath: NodePath<t.ExportNamedDeclaration>) {
        const { node } = nodePath;
        // Exp: export function pageConfig() {}
        const isFunctionExport = t.isFunctionDeclaration(node.declaration) &&
          keepExportCode(node.declaration.id, keepExports);
        // Exp: export const pageConfig = () => {}
        const isVariableExport = t.isVariableDeclaration(node.declaration) &&
          keepExportCode(node.declaration.declarations![0]?.id as t.Identifier, keepExports);
        // Exp: export { pageConfig };
        if (node.specifiers && node.specifiers.length > 0) {
          nodePath.traverse({
            ExportSpecifier(nodePath: NodePath<t.ExportSpecifier>) {
              if (!keepExportCode(nodePath.node.exported as t.Identifier, keepExports)) {
                nodePath.remove();
              }
            },
          });
          node.specifiers = node.specifiers.filter(specifier =>
            keepExportCode(specifier.exported as t.Identifier, keepExports));
        } else if (!isFunctionExport && !isVariableExport) {
          // Remove named export expect defined in keepExports.
          nodePath.remove();
        }
      },
    },
    ExportDefaultDeclaration: {
      enter(nodePath: NodePath<t.ExportDefaultDeclaration>) {
        // Remove default export declaration.
        if (!keepExports.includes('default')) {
          nodePath.remove();
        }
      },
    },
    ExpressionStatement: {
      enter(nodePath: NodePath<t.ExpressionStatement>) {
        // Remove top level call expression.
        if (nodePath.parentPath.isProgram()) {
          if (t.isCallExpression(nodePath.node.expression) || t.isAssignmentExpression(nodePath.node.expression)) {
            nodePath.remove();
          }
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
        // TODO: check expression statement if it is changed top level variable referenced by pageConfig
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
