import * as path from 'path';
import fse from 'fs-extra';
import type webpack from '@ice/bundles/compiled/webpack/index.js';
import type { StatsCompilation, StatsError, Configuration } from 'webpack';
import type { Context } from 'build-scripts';
import type { Config } from '@ice/webpack-config/types';
import generateEntry from '../../utils/generateEntry.js';
import injectInitialEntry from '../../utils/injectInitialEntry.js';
import { SERVER_OUTPUT_DIR } from '../../constant.js';
import { logger } from '../../utils/logger.js';
import formatWebpackMessages from '../../utils/formatWebpackMessages.js';
import type { ExtendsPluginAPI } from '../../types/plugin.js';
import type { BundlerOptions, CompileResults } from './types.js';
// Enable source map support when build.
import 'source-map-support/register.js';

async function build(
  compiler: webpack.Compiler,
  webpackConfigs: Configuration[],
  context: Context<Config, ExtendsPluginAPI>,
  options: BundlerOptions,
) {
  const { rootDir, extendsPluginAPI, applyHook } = context;
  const { hooksAPI, taskConfigs, appConfig, userConfig } = options;
  // Run webpack compiler.
  const { stats, isSuccessful, messages } = await new Promise<CompileResults>((resolve, reject) => {
    let messages: { errors: string[]; warnings: string[] };
    compiler.run(async (err, stats) => {
      let statsInfo: StatsCompilation;
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
        statsInfo = stats.toJson({ all: false, warnings: true, errors: true });
        messages = formatWebpackMessages(statsInfo);
      }
      if (messages.errors.length) {
        logger.briefError('Webpack compile error.');
        logger.debug(statsInfo);
        reject(new Error(messages.errors.join('\n\n')));
      } else {
        compiler?.close?.(() => {});
        const isSuccessful = !messages.errors.length;
        resolve({
          stats,
          messages,
          isSuccessful,
        });
      }
    });
  });

  if (isSuccessful) {
    // Generate html when SSG.
    const outputDir = webpackConfigs[0].output.path;
    const { serverEntry } = await extendsPluginAPI.serverCompileTask.get() || {};
    let outputPaths: string[] = [];
    if (serverEntry) {
      outputPaths = await buildCustomOuputs(rootDir, outputDir, serverEntry, options);
    }
    await applyHook('after.build.compile', {
      ...hooksAPI,
      stats,
      isSuccessful,
      messages,
      taskConfigs,
      webpackConfigs,
      serverEntryRef: { current: serverEntry },
      output: { paths: outputPaths },
      appConfig,
    });
    await removeServerOutput(outputDir, userConfig.ssr);
  }
}

async function removeServerOutput(outputDir: string, ssr: boolean) {
  if (!ssr) {
    await fse.remove(path.join(outputDir, SERVER_OUTPUT_DIR));
  }
}
// Build custom outputs such html and js file for weex.
async function buildCustomOuputs(
  rootDir: string,
  outputDir: string,
  serverEntry: string,
  bundleOptions: BundlerOptions,
) {
  const { userConfig, appConfig, routeManifest } = bundleOptions;
  const { ssg, output: { distType, prependCode } } = userConfig;
  const routeType = appConfig?.router?.type;
  const {
    outputPaths = [],
  } = await generateEntry({
    rootDir,
    outputDir,
    entry: serverEntry,
    // only ssg need to generate the whole page html when build time.
    documentOnly: !ssg,
    renderMode: ssg ? 'SSG' : undefined,
    routeType: appConfig?.router?.type,
    distType,
    prependCode,
    routeManifest,
  });
  if (routeType === 'memory' && userConfig?.routes?.injectInitialEntry) {
    injectInitialEntry(routeManifest, outputDir);
  }
  return outputPaths;
}

export default build;
