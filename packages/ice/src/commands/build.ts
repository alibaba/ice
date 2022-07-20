import * as path from 'path';
import consola from 'consola';
import { getWebpackConfig } from '@ice/webpack-config';
import type { Context, TaskConfig } from 'build-scripts';
import type { StatsError } from 'webpack';
import type { Config } from '@ice/types';
import type { ServerCompiler } from '@ice/types/esm/plugin.js';
import webpack from '@ice/bundles/compiled/webpack/index.js';
import type ora from '@ice/bundles/compiled/ora/index.js';
import webpackCompiler from '../service/webpackCompiler.js';
import formatWebpackMessages from '../utils/formatWebpackMessages.js';
import { RUNTIME_TMP_DIR, SERVER_ENTRY, SERVER_OUTPUT_DIR } from '../constant.js';
import generateHTML from '../utils/generateHTML.js';
import emptyDir from '../utils/emptyDir.js';
import keepPlatform from '../utils/keepPlatform.js';

const build = async (
  context: Context<Config>,
  options: {
    taskConfigs: TaskConfig<Config>[];
    serverCompiler: ServerCompiler;
    spinner: ora.Ora;
  },
) => {
  const { taskConfigs, serverCompiler, spinner } = options;
  const { applyHook, commandArgs, command, rootDir, userConfig } = context;
  const webpackConfigs = taskConfigs.map(({ config }) => getWebpackConfig({
    config,
    rootDir,
    // @ts-expect-error fix type error of compiled webpack
    webpack,
    runtimeTmpDir: RUNTIME_TMP_DIR,
  }));
  const outputDir = webpackConfigs[0].output.path;

  await emptyDir(outputDir);

  const compiler = await webpackCompiler({
    rootDir,
    webpackConfigs,
    taskConfigs,
    commandArgs,
    command,
    applyHook,
    serverCompiler,
    spinner,
  });
  const { ssg, server: { format } } = userConfig;
  // compile server bundle
  const entryPoint = path.join(rootDir, SERVER_ENTRY);
  const esm = format === 'esm';
  const outJSExtension = esm ? '.mjs' : '.cjs';
  const serverOutputDir = path.join(outputDir, SERVER_OUTPUT_DIR);
  // only ssg need to generate the whole page html when build time.
  const documentOnly = !ssg;
  let serverEntry;
  const { stats, isSuccessful, messages } = await new Promise((resolve, reject): void => {
    let messages: { errors: string[]; warnings: string[] };
    compiler.run(async (err, stats) => {
      if (err) {
        if (!err.message) {
          reject(err);
          return;
        }
        messages = formatWebpackMessages({
          errors: [err.message as unknown as StatsError],
          warnings: [],
        });
      } else {
        messages = formatWebpackMessages(stats.toJson({ all: false, warnings: true, errors: true }));
      }

      if (messages.errors.length) {
        consola.error('webpack compile error');
        reject(new Error(messages.errors.join('\n\n')));
        return;
      } else {
        compiler?.close?.(() => {});
        const isSuccessful = !messages.errors.length;
        const serverCompilerResult = await serverCompiler(
          {
            entryPoints: { index: entryPoint },
            outdir: serverOutputDir,
            splitting: esm,
            format,
            platform: esm ? 'browser' : 'node',
            outExtension: { '.js': outJSExtension },
          },
          {
            preBundle: format === 'esm',
            swc: {
              // Remove components and getData when document only.
              removeExportExprs: documentOnly ? ['default', 'getData', 'getServerData', 'getStaticData'] : [],
              compilationConfig: {
                jsc: {
                  transform: {
                    constModules: {
                      globals: {
                        '@uni/env': keepPlatform('node'),
                        'universal-env': keepPlatform('node'),
                      },
                    },
                  },
                },
              },
            },
          },
        );
        serverEntry = serverCompilerResult.serverEntry;

        let renderMode;
        if (ssg) {
          renderMode = 'SSG';
        }

        // generate html
        await generateHTML({
          rootDir,
          outputDir,
          entry: serverEntry,
          documentOnly,
          renderMode,
        });
        resolve({
          stats,
          messages,
          isSuccessful,
        });
      }
    });
  });

  await applyHook('after.build.compile', {
    stats,
    isSuccessful,
    messages,
    taskConfigs,
    serverCompiler,
    serverEntry,
  });

  return { compiler };
};

export default build;
