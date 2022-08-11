import path from 'path';
import type { Plugin, PluginBuild, BuildOptions } from 'esbuild';
import fg from 'fast-glob';
import { resolveId } from '../service/analyze.js';
import isExternalBuiltinDep from '../utils/isExternalBuiltinDep.js';

interface PluginOptions {
  alias: Record<string, string | false>;
  externalDependencies: boolean;
  format: BuildOptions['format'];
}

const aliasPlugin = (options: PluginOptions): Plugin => {
  const { alias, externalDependencies, format } = options;
  return {
    name: 'esbuild-alias',
    setup(build: PluginBuild) {
      build.onResolve({ filter: /.*/ }, (args) => {
        const id = args.path;
        // ice do not support alias with config onlyModule
        const resolved = resolveId(id, alias);
        if (resolved && resolved !== id) {
          // glob specified file module aliased with absolute path
          if (!path.extname(resolved) && path.isAbsolute(resolved)) {
            const basename = path.basename(resolved);
            const patterns = [`${basename}.{js,ts,jsx,tsx}`, `${basename}/index.{js,ts,jsx,tsx}`];
            const absoluteId = fg.sync(patterns, {
              cwd: path.dirname(resolved),
              absolute: true,
            })[0];
            if (absoluteId) {
              return {
                path: absoluteId,
              };
            }
          }
          return { path: resolved };
        }
      });
      build.onResolve({ filter: /.*/ }, (args) => {
        const id = args.path;
        // external ids which is third-party dependencies
        if (id[0] !== '.' && !path.isAbsolute(id) && externalDependencies && isExternalBuiltinDep(id, format)) {
          return {
            external: true,
          };
        }
      });
    },
  };
};

export default aliasPlugin;
