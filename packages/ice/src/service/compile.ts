import * as path from 'path';
import consola from 'consola';
import fg from 'fast-glob';
import esbuild from 'esbuild';
import { createUnplugin } from 'unplugin';
import type { EsbuildCompile } from '@ice/types/esm/plugin.js';
import { getTransformPlugins } from '@ice/webpack-config';
import type { ContextConfig } from '../utils/getContextConfig.js';
import { resolveId } from './analyze.js';

interface Options {
  rootDir: string;
  task: ContextConfig;
}

export function createEsbuildCompiler(options: Options) {
  const { task, rootDir } = options;
  const { taskConfig, webpackConfig } = task;
  const alias = webpackConfig.resolve?.alias || {};
  const compileRegex = (taskConfig.compileIncludes || []).map((includeRule) => {
    return includeRule instanceof RegExp ? includeRule : new RegExp(includeRule);
  });
  const transformPlugins = getTransformPlugins(rootDir, taskConfig);
  const esbuildCompile: EsbuildCompile = async (buildOptions) => {
    const startTime = new Date().getTime();
    consola.debug('[esbuild]', `start compile for: ${buildOptions.entryPoints}`);
    const buildResult = await esbuild.build({
      bundle: true,
      target: 'node12.19.0',
      ...buildOptions,
      define: {
        // ref: https://github.com/evanw/esbuild/blob/master/CHANGELOG.md#01117
        // in esm, this in the global should be undefined. Set the following config to avoid warning
        this: undefined,
      },
      plugins: [
        {
          name: 'esbuild-alias',
          setup(build) {
            build.onResolve({ filter: /.*/ }, (args) => {
              const id = args.path;
              // ice do not support alias with config onlyModule
              const resolved = resolveId(id, alias as Record<string, string | false>);
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
                return { path: resolved };
              }
            });
            build.onResolve({ filter: /.*/ }, (args) => {
              const id = args.path;
              // external ids which is third-party dependencies
              if (id[0] !== '.' && !path.isAbsolute(id) &&
                // runtime folder need to been bundled while it is not compiled
                !compileRegex.some((regex) => regex.test(id))) {
                return {
                  external: true,
                };
              }
            });
          },
        },
        ...transformPlugins
          // ignore compilation-plugin while esbuild has it's own transform
          .filter(({ name }) => name !== 'compilation-plugin')
          .map(plugin => createUnplugin(() => plugin).esbuild()),
      ],
    });
    consola.debug('[esbuild]', `time cost: ${new Date().getTime() - startTime}ms`);
    return buildResult;
  };
  return esbuildCompile;
}