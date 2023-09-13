import fs from 'fs';
import url from 'url';
import type { Plugin, PluginBuild } from 'esbuild';
import { Parser } from 'acorn';
import jsx from 'acorn-jsx';
import recast from 'recast';
import ts from 'typescript';

export function rscCodeTransform({ content, path }: { content: string; path: string }): string {
  if (content.indexOf('use client') === -1 && content.indexOf('use server') === -1) {
    return content;
  }

  //  transform tsx/ts code to es6 jsx code
  if (path.endsWith('tsx') || path.endsWith('ts')) {
    const result = ts.transpileModule(content, {
      compilerOptions: {
        target: ts.ScriptTarget.ES2022,
        module: ts.ModuleKind.ES2022,
        jsx: ts.JsxEmit.Preserve,
        moduleResolution: ts.ModuleResolutionKind.NodeJs,
      },
    });
    content = result.outputText;
  }

  let body;
  try {
    // get AST of source code.
    body = (Parser.extend(jsx()).parse(content, {
      ecmaVersion: 2024,
      sourceType: 'module',
    }) as any).body;
  } catch (x) {
    console.error('Error parsing %s %s %s', url, x.message, path);
    return content;
  }

  let useClient = false;
  let useServer = false;
  for (let i = 0; i < body.length; i++) {
    const node = body[i];
    if (node.type !== 'ExpressionStatement' || !node.directive) {
      break;
    }
    if (node.directive === 'use client') {
      useClient = true;
    }
    if (node.directive === 'use server') {
      useServer = true;
    }
  }

  if (!useClient && !useServer) {
    return content;
  }

  if (useClient && useServer) {
    throw new Error(
      'Cannot have both "use client" and "use server" directives in the same file.',
    );
  }

  let source: string = content;
  const moduleId: string = url.pathToFileURL(path).href;

  if (useClient) {
    source = 'const Server = require(\'react-server-dom-webpack/server.node\');\n';
    source += 'const createClientModuleProxy = Server.createClientModuleProxy;\n';
    source += transformContent(moduleId);
  } else if (useServer) {
    source = 'const Server = require(\'react-server-dom-webpack/server.node\');\n';
    source += 'const registerServerReference = Server.registerServerReference;\n';
    for (let i = 0; i < body.length; i++) {
      const node = body[i];
      if (['ExpressionStatement', 'VariableDeclaration', 'AssignmentExpression', 'ForStatement', 'IfStatement'].includes(node.type)) {
        // concat top level statements.
        const { start, end } = node;
        const statement = content.substring(start, end);
        if (statement.indexOf('use client') === -1 && statement.indexOf('use server') === -1) {
          source += `${statement}\n`;
        }
      } else if (node.type === 'ImportDeclaration') {
        // concat the 'import' statements.
        const { start, end } = node;
        source += `${content.substring(start, end)}\n`;
      } else if (node.type === 'ExportNamedDeclaration' || node.type === 'ExportDefaultDeclaration') {
        const { declaration } = node;
        // Handling the case where the export is a function.
        if (declaration.type === 'FunctionDeclaration') {
          const functionName = declaration.id.name;
          source += `${recast.print(declaration).code};\n`;
          if (node.type === 'ExportNamedDeclaration') {
            source += `registerServerReference(${functionName}, '${moduleId}', '${functionName}');\n`;
            source += `module.exports.${functionName} = ${functionName};\n`;
          } else {
            source += `registerServerReference(${functionName}, '${moduleId}', null);\n`;
            source += `module.exports = ${functionName};\n`;
          }
        } else {
          //  concat export variables
          const exportNames = declaration.declarations.map(item => item.id.name);
          source += `${recast.print(declaration).code}\n`;
          for (const exportName of exportNames) {
            source += `module.exports.${exportName} = ${exportName};\n`;
          }
        }
      } else if (node.type === 'FunctionDeclaration') {
        source += `${recast.print(node).code};\n`;
      }
    }
  }

  return source;
}

const rscServerRegister = (): Plugin => {
  return {
    name: 'rsc-server-register',
    setup: async (build: PluginBuild) => {
      build.onLoad({ filter: /\/src\/.*\.(js|ts|jsx|tsx)$/ }, async (args) => {
        const { path } = args;
        const loader = path.endsWith('.tsx') || path.endsWith('.ts') ? 'tsx' : 'jsx';
        let content: string = await fs.promises.readFile(path, 'utf-8');
        const source = rscCodeTransform({ content, path });
        return { contents: source, loader };
      });
    },
  };
};

function transformContent(moduleId: string) {
  let content = `const comp = createClientModuleProxy('${moduleId}');\n`;
  content += 'module.exports = comp;\n';
  return content;
}

export default rscServerRegister;