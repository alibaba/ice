import path from 'path';
import type { Plugin, PluginBuild, BuildOptions } from 'esbuild';
import fg from 'fast-glob';
import type { Config } from '@ice/webpack-config/esm/types';
import { resolveId } from '../service/analyze.js';
import isExternalBuiltinDep from '../utils/isExternalBuiltinDep.js';

interface PluginOptions {
  alias: Record<string, string | false>;
  externalDependencies: boolean;
  format: BuildOptions['format'];
  externals?: Config['externals'];
}

const aliasPlugin = (options: PluginOptions): Plugin => {
  const { alias, externalDependencies, format, externals } = options;
  return {
    name: 'esbuild-alias',
    setup(build: PluginBuild) {
      build.onResolve({ filter: /.*/ }, (args) => {
        const id = args.path;
        // ice do not support alias with config onlyModule
        const resolved = resolveId(id, alias);
        if (resolved && resolved !== id) {
          let resolvedPath = resolved;

          // glob specified file module aliased with absolute path
          if (!path.extname(resolved) && path.isAbsolute(resolved)) {
            const basename = path.basename(resolved);
            const patterns = [`${basename}.{js,ts,jsx,tsx}`, `${basename}/index.{js,ts,jsx,tsx}`];
            const absoluteId = fg.sync(patterns, {
              cwd: path.dirname(resolved),
              absolute: true,
            })[0];

            if (absoluteId) {
              resolvedPath = absoluteId;
            }
          }

          const external = shouldExternal(resolvedPath, externals);

          // absolute path will be resolved by other plugins, so we need to check external here.
          if (external) {
            return {
              path: resolvedPath,
              external: true,
            };
          }

          return { path: resolvedPath };
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

        const external = shouldExternal(id, externals);

        if (external) {
          return {
            path: id,
            external: true,
          };
        }
      });
    },
  };
};

function shouldExternal(id, externals) {
  if (!externals) {
    return;
  }

  return externals.find(regexStr => {
    return new RegExp(regexStr).test(id);
  });
}

export default aliasPlugin;
