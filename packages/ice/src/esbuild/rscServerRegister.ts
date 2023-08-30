import fs from 'fs';
import url from 'url';
import type { Loader, Plugin, PluginBuild } from 'esbuild';
import { Parser } from 'acorn';
import jsx from 'acorn-jsx';
import recast from 'recast';

// TODO：整理代码
const rscServerRegister = (): Plugin => {
  return {
    name: 'rsc-server-register',
    setup: async (build: PluginBuild) => {
      build.onLoad({ filter: /\/src\/.*\.(js|ts|jsx|tsx)$/ }, async (args) => { //  /src\/.*\
        const { path } = args;
        const loader = path.endsWith('.tsx') || path.endsWith('.ts') ? 'tsx' : 'jsx';
        const content = await fs.promises.readFile(path, 'utf-8');
        if (path.indexOf('routes-config') > 0) {
          console.log('path.indexOf(\'routes-config\') > 0');
          return { contents: content, loader };
        }

        if (path.indexOf('/src/') === -1) {
          return { contents: content, loader };
        }
        console.log('rsc 编译', path, content.indexOf('use client'), content.indexOf('use server'));

        if (content.indexOf('use client') === -1 && content.indexOf('use server') === -1) {
          return { contents: content, loader };
        }

        let body;
        try {
          body = (Parser.extend(jsx()).parse(content, {
            ecmaVersion: 2024,
            sourceType: 'module',
          }) as any).body;
        } catch (x) {
          console.error('Error parsing %s %s %s', url, x.message, path);
          console.log(content);
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

        let source = content;
        if (useClient) {
          const moduleId: string = url.pathToFileURL(path).href;
          source = 'import {createClientModuleProxy} from \'@ice/runtime\';';
          source += transformContent(moduleId);
        }

        if (useServer) {
          source = 'import {registerServerReference} from \'@ice/runtime\';';
          const moduleId: string = url.pathToFileURL(path).href;

        //   // This module is imported server to server, but opts in to exposing functions by
        //   // reference. If there are any functions in the export.
          body = (Parser.extend(jsx()).parse(content, {
            ecmaVersion: 2024,
            sourceType: 'module',
          }) as any).body;
          for (let i = 0; i < body.length; i++) { //  TODO：编译后的的代码其实是不完整的，忽略了有一些全局定义的变量的情况
            const node = body[i];
            if (node.type === 'ImportDeclaration') { // TODO: 如果是 import 语句的情况
              const { start, end } = node;
              source += content.substring(start, end);
            } else if (node.type === 'ExportNamedDeclaration' || node.type === 'ExportDefaultDeclaration') {
              const { declaration } = node;
              if (declaration.type === 'FunctionDeclaration') {
                if (moduleId.indexOf('/pages') !== -1) {
                  source += `\
                  var toExport${i} = ${recast.print(declaration).code};
                  const pageConfig = registerServerReference(toExport${i}, '${moduleId}', null);\n
                  export {pageConfig};
                  `;
                } else {
                  source += `\
                  var toExport${i} = ${recast.print(declaration).code};
                  const comp = registerServerReference(toExport${i}, '${moduleId}', null);\n
                  export default comp;
                  `;
                }
              } else { //  TODO: 不是 function 类型的导出的情况
                //
              }
            }
          }
          console.log('服务端组件编译结果', source);
        }

        source += ';console.log(\'------------==============---------\');';
        source = source.replace(/^(\'|\")use (client|server)(\';|\'|\";|\")/, '');
        return { contents: source, loader };
      });

      //  there are some .png file are imported in .tsx file
      build.onLoad({ filter: /.\.png$/ }, async (args) => {
        const fileContents = await fs.promises.readFile(args.path);
        const base64 = fileContents.toString('base64');
        const contents = `export default "data:image/png;base64,${base64}"`;
        return { contents, loader: 'js' };
      });
    },
  };
};

function transformContent(moduleId: string) { //  TODO: 还没处理 import 语句的情况，待加入
  let content = '';
  if (moduleId.indexOf('/pages') !== -1) {
    content = `\
    const pageConfig = createClientModuleProxy('${moduleId}');\n
    export {pageConfig};`;
  } else {
    content = `\
    const comp = createClientModuleProxy('${moduleId}');
    export default comp`;
  }
  console.log('客户端组件编译结果', content);
  return content;
}

export default rscServerRegister;
