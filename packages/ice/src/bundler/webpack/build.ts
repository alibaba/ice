import type webpack from '@ice/bundles/compiled/webpack/index.js';
import type { StatsCompilation, StatsError, Configuration } from 'webpack';
import { getOutputPaths, removeServerOutput } from '../config/outputPaths.js';
import { logger } from '../../utils/logger.js';
import formatWebpackMessages from '../../utils/formatWebpackMessages.js';
import type { BundlerOptions, CompileResults, Context } from '../types.js';
// Enable source map support when build.
import 'source-map-support/register.js';

async function build(
  compiler: webpack.Compiler,
  webpackConfigs: Configuration[],
  context: Context,
  options: BundlerOptions,
) {
  const { rootDir, extendsPluginAPI, applyHook } = context;
  const { hooksAPI, taskConfigs, appConfig, userConfig, routeManifest } = options;
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
    const outputPaths = await getOutputPaths({
      rootDir,
      serverEntry,
      outputDir,
      bundleOptions: {
        userConfig,
        appConfig,
        routeManifest,
      },
    });
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

export default build;
