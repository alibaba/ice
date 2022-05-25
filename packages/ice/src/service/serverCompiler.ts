import * as path from 'path';
import { fileURLToPath } from 'url';
import { createHash } from 'crypto';
import * as fs from 'fs';
import consola from 'consola';
import esbuild, { type BuildOptions } from 'esbuild';
import type { Config } from '@ice/types';
import type { ServerCompiler } from '@ice/types/esm/plugin.js';
import type { TaskConfig } from 'build-scripts';
import { getCompilerPlugins } from '@ice/webpack-config';
import escapeLocalIdent from '../utils/escapeLocalIdent.js';
import cssModulesPlugin from '../esbuild/cssModules.js';
import aliasPlugin from '../esbuild/alias.js';
import createAssetsPlugin from '../esbuild/assets.js';
import { ASSETS_MANIFEST } from '../constant.js';
import emptyCSSPlugin from '../esbuild/emptyCSS.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

interface Options {
  rootDir: string;
  task: TaskConfig<Config>;
}

type CompilerOptions = Pick<BuildOptions, 'entryPoints' | 'outfile' | 'plugins' | 'bundle'>;

export function createServerCompiler(options: Options) {
  const { task, rootDir } = options;
  const transformPlugins = getCompilerPlugins(task.config, 'esbuild');
  const alias = (task.config?.alias || {}) as Record<string, string | false>;
  const assetsManifest = path.join(rootDir, ASSETS_MANIFEST);
  const defineVars = task.config?.define || {};

  // auto stringify define value
  Object.keys(defineVars).forEach((key) => {
    defineVars[key] = JSON.stringify(defineVars[key]);
  });

  // get runtime variable for server build
  const runtimeDefineVars = {};
  Object.keys(process.env).forEach((key) => {
    if (/^ICE_CORE_/i.test(key)) {
      // in server.entry
      runtimeDefineVars[`__process.env.${key}__`] = JSON.stringify(process.env[key]);
    } else if (/^ICE_/i.test(key)) {
      runtimeDefineVars[`process.env.${key}`] = JSON.stringify(process.env[key]);
    }
  });

  const serverCompiler: ServerCompiler = async (buildOptions: CompilerOptions) => {
    const startTime = new Date().getTime();
    consola.debug('[esbuild]', `start compile for: ${buildOptions.entryPoints}`);
    const define = {
      // ref: https://github.com/evanw/esbuild/blob/master/CHANGELOG.md#01117
      // in esm, this in the global should be undefined. Set the following config to avoid warning
      this: undefined,
      ...defineVars,
      ...runtimeDefineVars,
    };

    const buildResult = await esbuild.build({
      bundle: true,
      format: 'esm',
      target: 'node12.20.0',
      ...buildOptions,
      define,
      outExtension: { '.js': '.mjs' },
      inject: [path.resolve(__dirname, '../polyfills/react.js')],
      plugins: [
        emptyCSSPlugin(),
        aliasPlugin({
          alias,
          compileRegex: (task.config?.compileIncludes || []).map((includeRule) => {
            return includeRule instanceof RegExp ? includeRule : new RegExp(includeRule);
          }),
        }),
        cssModulesPlugin({
          extract: false,
          generateLocalIdentName: function (name: string, filename: string) {
            const hash = createHash('md4');
            hash.update(Buffer.from(filename + name, 'utf8'));
            return escapeLocalIdent(`${name}--${hash.digest('base64').slice(0, 8)}`);
          },
        }),
        fs.existsSync(assetsManifest) && createAssetsPlugin(assetsManifest, rootDir),
        ...transformPlugins,
        ...(buildOptions.plugins || []),
      ].filter(Boolean),
    });
    consola.debug('[esbuild]', `time cost: ${new Date().getTime() - startTime}ms`);
    return buildResult;
  };
  return serverCompiler;
}


