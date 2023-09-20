import * as path from 'path';
import fse from 'fs-extra';
import generateEntry from '../../utils/generateEntry.js';
import injectInitialEntry from '../../utils/injectInitialEntry.js';
import { SERVER_OUTPUT_DIR } from '../../constant.js';
import { logger } from '../../utils/logger.js';
import type { BundlerOptions } from '../types.js';

export async function getOutputPaths(options: {
  rootDir: string;
  outputDir: string;
  serverEntry: string;
  bundleOptions: Pick<BundlerOptions, 'userConfig' | 'appConfig' | 'routeManifest'>;
}) {
  const { outputDir, serverEntry, bundleOptions, rootDir } = options;
  const { userConfig } = bundleOptions;
  let outputPaths: string[] = [];
  if (userConfig.ssg) {
    if (!userConfig.htmlGenerating) {
      logger.warn('SSG depends on htmlGenerating, SSG will not work when htmlGenerating is set to false.');
    }
  }
  if (serverEntry && userConfig.htmlGenerating) {
    outputPaths = await buildCustomOutputs(rootDir, outputDir, serverEntry, bundleOptions);
  }
  return outputPaths;
}

export async function removeServerOutput(outputDir: string, ssr: boolean) {
  if (!ssr) {
    await fse.remove(path.join(outputDir, SERVER_OUTPUT_DIR));
  }
}
// Build custom outputs such html and js file for weex.
async function buildCustomOutputs(
  rootDir: string,
  outputDir: string,
  serverEntry: string,
  bundleOptions: Pick<BundlerOptions, 'userConfig' | 'appConfig' | 'routeManifest'>,
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
