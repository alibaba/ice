import * as path from 'path';
import consola from 'consola';
import fg from 'fast-glob';
import esbuild from 'esbuild';
import { createUnplugin } from 'unplugin';
import type { UnpluginOptions } from 'unplugin';
import type { Config } from '@ice/types';
import type { EsbuildCompile } from '@ice/types/esm/plugin.js';
import { resolveId } from './analyze.js';

export function createEsbuildCompiler(options: {
  alias?: Record<string, string>;
  getTransformPlugins?: (config: Partial<Config>) => UnpluginOptions[];
}) {
  const { alias = {}, getTransformPlugins } = options;
  const esbuildCompile: EsbuildCompile = async (buildOptions, customConfig) => {
    const startTime = new Date().getTime();
    consola.debug('[esbuild]', `start compile for: ${buildOptions.entryPoints}`);
    const transformPlugins = getTransformPlugins(customConfig);
    const buildResult = await esbuild.build({
      bundle: true,
      ...buildOptions,
      plugins: [
        {
          name: 'esbuild-alias',
          setup(build) {
            build.onResolve({ filter: /.*/ }, (args) => {
              const id = args.path;
              const resolved = resolveId(id, alias);
              if (resolved && resolved !== id) {
                if (!path.extname(resolved)) {
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
              }
            });
          },
        },
        ...transformPlugins.map(plugin => createUnplugin(() => plugin).esbuild()),
      ],
    });
    consola.debug('[esbuild]', `time cost: ${new Date().getTime() - startTime}ms`);
    return buildResult;
  };
  return esbuildCompile;
}