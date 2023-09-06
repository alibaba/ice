import fs from 'fs';
import url from 'url';
import type { Plugin, PluginBuild } from 'esbuild';
import { Parser } from 'acorn';
import jsx from 'acorn-jsx';
import recast from 'recast';

const rscServerRegister = (): Plugin => {
  return {
    name: 'rsc-server-register',
    setup: async (build: PluginBuild) => {
      build.onLoad({ filter: /\/src\/.*\.(js|ts|jsx|tsx)$/ }, async (args) => {
        const { path } = args;
        const loader = path.endsWith('.tsx') || path.endsWith('.ts') ? 'tsx' : 'jsx';
        const content: string = await fs.promises.readFile(path, 'utf-8');

        if (content.indexOf('use client') === -1 && content.indexOf('use server') === -1) {
          return { contents: content, loader };
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
          return { contents: content, loader };
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
          return { contents: content, loader };
        }

        if (useClient && useServer) {
          throw new Error(
            'Cannot have both "use client" and "use server" directives in the same file.',
          );
        }

        let source: string = content;
        const moduleId: string = url.pathToFileURL(path).href;

        if (useClient) {
          source = `\
            const Server: any = require('react-server-dom-webpack/server.node');\n
            const createClientModuleProxy = Server.createClientModuleProxy;\n`;
          source += transformContent(moduleId);
        } else if (useServer) {
          source = `\
            const Server = require('react-server-dom-webpack/server.node');\n
            const registerServerReference = Server.registerServerReference;\n`;
          for (let i = 0; i < body.length; i++) {
            const node = body[i];
            if (node.type === 'ImportDeclaration') {
              // concat the 'import' statements.
              const { start, end } = node;
              source += content.substring(start, end);
            } else if (node.type === 'ExportNamedDeclaration' || node.type === 'ExportDefaultDeclaration') {
              const { declaration } = node;
              // Handling the case where the export is a function.
              if (declaration.type === 'FunctionDeclaration') {
                source += `var ${declaration.id.name} = registerServerReference(${recast.print(declaration).code}, '${moduleId}', null);\n`;
                if (node.type === 'ExportNamedDeclaration') {
                  source += `module.exports.${declaration.id.name} = ${declaration.id.name};\n`;
                } else {
                  source += `module.exports = ${declaration.id.name};\n`;
                }
              }
            }
          }
        }
        return { contents: source, loader };
      });
    },
  };
};

function transformContent(moduleId: string) {
  const content = `\
    const comp = createClientModuleProxy('${moduleId}');\n\
    module.exports = comp;`;
  return content;
}

export default rscServerRegister;