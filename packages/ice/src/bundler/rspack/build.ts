import type { MultiStats } from '@rspack/core';
import { logger } from '../../utils/logger.js';
import { getOutputPaths, removeServerOutput } from '../config/output.js';
import type { BuildOptions, CompileResults } from '../types.js';
import formatStats from './formatStats.js';

async function build(options: BuildOptions) {
  const { compiler, context, hooksAPI, taskConfigs, rspackConfigs, appConfig, routeManifest } = options;
  const { rootDir, extendsPluginAPI, applyHook, userConfig, commandArgs } = context;
  await applyHook('before.build.run', {
    commandArgs,
    taskConfigs,
    rspackConfigs,
    ...hooksAPI,
  });
  const { stats, isSuccessful, messages } = await new Promise<CompileResults>((resolve, reject) => {
    let messages: { errors: string[]; warnings: string[] };
    compiler.run(async (_, stats: MultiStats) => {
      const obj = stats.toJson({
        all: false,
        timings: true,
      });
      if (!stats.hasErrors()) {
        obj.children?.forEach(c => {
          c.time &&
            logger.success(`${c.name} compiled successfully in`, c.time, 'ms');
        });
      }
      const { message, level } = formatStats(stats);
      let isSuccessful = level !== 'error';
      if (level === 'error' || level === 'warning') {
        logger.log(message);
      }
      compiler.close(() => {
        if (isSuccessful) {
          resolve({
            stats,
            messages,
            isSuccessful,
          });
        } else {
          reject(new Error(message));
        }
      });
    });
  });

  if (isSuccessful) {
    const outputDir = rspackConfigs[0].output.path;
    const { serverEntry, error } = await extendsPluginAPI.serverCompileTask.get() || {};
    if (error) {
      throw new Error('Build failed, please check the error message.');
    }
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
      rspackConfigs,
      output: { paths: outputPaths },
      appConfig,
    });
    await removeServerOutput(outputDir, userConfig.ssr);
  }
}

export default build;
