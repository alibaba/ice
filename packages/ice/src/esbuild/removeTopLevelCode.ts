import * as fs from 'fs';
import consola from 'consola';
import type { Plugin } from 'esbuild';
import { parse, type ParserOptions } from '@babel/parser';
import babelTraverse from '@babel/traverse';
import babelGenerate from '@babel/generator';
import removeTopLevelCode from '../utils/babelPluginRemoveCode.js';
import formatPath from '../utils/formatPath.js';

// @ts-ignore @babel/traverse is not a valid export in esm
const traverse = babelTraverse.default || babelTraverse;
// @ts-ignore @babel/generate is not a valid export in esm
const generate = babelGenerate.default || babelGenerate;

const removeCodePlugin = (keepExports: string[], transformInclude: (id: string) => boolean): Plugin => {
  const parserOptions: ParserOptions = {
    sourceType: 'module',
    plugins: [
      'jsx',
      'importMeta',
      'topLevelAwait',
      'classProperties',
      'classPrivateMethods',
    ],
  };
  return {
    name: 'esbuild-remove-top-level-code',
    setup(build) {
      build.onLoad({ filter: /\.(js|jsx|ts|tsx)$/ }, async ({ path: id }) => {
        if (!transformInclude(formatPath(id))) {
          return;
        }
        const source = fs.readFileSync(id, 'utf-8');
        let isTS = false;
        if (id.match(/\.(ts|tsx)$/)) {
          isTS = true;
          parserOptions.plugins.push('typescript', 'decorators-legacy');
        }
        try {
          const ast = parse(source, parserOptions);
          traverse(ast, removeTopLevelCode(keepExports));
          const contents = generate(ast).code;
          return {
            contents,
            loader: isTS ? 'tsx' : 'jsx',
          };
        } catch (error) {
          consola.debug('Remove top level code error.', error.stack);
        }
      });
    },
  };
};

export default removeCodePlugin;
