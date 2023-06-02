import path from 'path';
import type { TransformOptions } from 'esbuild';
import { esbuild } from '@ice/bundles';
import MagicString from '@ice/bundles/compiled/magic-string/index.js';
import esModuleLexer from '@ice/bundles/compiled/es-module-lexer/index.js';
import type { ImportSpecifier } from '@ice/bundles/compiled/es-module-lexer/index.js';
import type { UnpluginOptions } from 'unplugin';
import type { PreBundleDepsMetaData } from '../service/preBundleDeps.js';
import formatPath from '../utils/formatPath.js';

const { init, parse } = esModuleLexer;

/**
 * Redirect original dependency path to the prebundle dependency path.
 */
const transformImportPlugin = (preBundleDepsMetadata: PreBundleDepsMetaData, serverDir: string): UnpluginOptions => {
  const { deps } = preBundleDepsMetadata;
  const redirectDepIds = [];
  return {
    name: 'transform-import',
    resolveId(id) {
      if (redirectDepIds.includes(id)) {
        return {
          id,
          external: true,
        };
      }
    },
    transformInclude(id: string) {
      return /\.(js|jsx|ts|tsx)$/.test(id);
    },
    async transform(source: string, id: string) {
      await init;
      let imports: readonly ImportSpecifier[] = [];
      imports = parse(source)[0];
      const str = new MagicString(source);
      for (let index = 0; index < imports.length; index++) {
        const {
          // depId start and end
          s: start,
          e: end,
          n: specifier,
        } = imports[index];
        if (!(specifier in deps)) {
          continue;
        }
        // Overwrite the prebundle dependency path.
        const filePath = formatPath(path.relative(formatPath(serverDir), formatPath(deps[specifier].file)));
        redirectDepIds.push(filePath);
        str.overwrite(start, end, filePath, { contentOnly: true });
      }
      return str.toString();
    },
  };
};

// Fork from https://github.com/vitejs/vite/blob/d98c8a710b8f0804120c05e5bd3eb403f17e7b30/packages/vite/src/node/plugins/esbuild.ts#L60
async function transformWithESBuild(
  input: string,
  filePath: string,
  options: TransformOptions = {},
) {
  let loader = options?.loader as TransformOptions['loader'];
  if (!loader) {
    const extname = path.extname(filePath).slice(1);
    if (extname === 'mjs' || extname === 'cjs' || extname === 'js') {
      loader = 'jsx';
    } else {
      loader = extname as TransformOptions['loader'];
    }
  }

  const transformOptions = {
    sourcemap: true,
    sourcefile: filePath,
    ...options,
    loader,
  } as TransformOptions;

  return await esbuild.transform(input, transformOptions);
}

export default transformImportPlugin;
