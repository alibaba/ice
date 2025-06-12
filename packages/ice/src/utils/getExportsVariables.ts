import fs from 'fs';
import { swc } from '@ice/bundles';

/**
 * Parses a JavaScript file and extracts all named exports.
 *
 * @param {string} filePath The path to the JavaScript file.
 * @returns {Promise<string[]>} A promise that resolves to an array of collected export names.
 */
export async function getExportsVariables(filePath: string) {
  const fileContent = await fs.promises.readFile(filePath, 'utf-8');
  const ast = await swc.parse(fileContent, {
    syntax: 'ecmascript', // or 'typescript' if you might have TypeScript files
    jsx: true, // Set to true if you might have JSX
  });

  const exportNames = new Set();

  for (const node of ast.body) {
    if (node.type === 'ExportDeclaration') {
      // Handles: export const a = 1; export class MyClass {}
      if (node.declaration) {
        if (node.declaration.type === 'VariableDeclaration') {
          for (const declarator of node.declaration.declarations) {
            if (declarator.id.type === 'Identifier') {
              exportNames.add(declarator.id.value);
            } else if (declarator.id.type === 'ObjectPattern') {
              // Handles object destructuring in export: export const { a, b } = {};
              for (const prop of declarator.id.properties) {
                if (prop.type === 'Property' && prop.key.type === 'Identifier') {
                  exportNames.add(prop.key.value);
                }
              }
            }
          }
        } else if (node.declaration.type === 'FunctionDeclaration' || node.declaration.type === 'ClassDeclaration') {
          if (node.declaration.identifier) {
            exportNames.add(node.declaration.identifier.value);
          }
        }
      }
    } else if (node.type === 'ExportNamedDeclaration') {
      // Handles: export { foo } from './foo'; export { foo as foo1 };
      // export * as aaa from './aaa'
      for (const specifier of node.specifiers) {
        if (specifier.type === 'ExportSpecifier') {
          exportNames.add((specifier.exported || specifier.orig).value);
        } else if (specifier.type === 'ExportNamespaceSpecifier') {
          exportNames.add(specifier.name.value);
        }
      }
    } else if (node.type === 'ExportDefaultExpression') {
      // Handles: export default ...
      exportNames.add('default');
    }
  }

  return Array.from(exportNames);
}
