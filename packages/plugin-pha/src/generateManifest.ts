import * as path from 'path';
import * as fs from 'fs';
import type { GetAppConfig, GetDataloaderConfig, GetRoutesConfig, ServerCompiler, CreateLoggerReturnType } from '@ice/app/types';
import type { Context } from 'build-scripts';
import { parseManifest, rewriteAppWorker, getAppWorkerUrl, getMultipleManifest, type ParseOptions } from './manifestHelpers.js';
import { getCompilerConfig } from './constants.js';
import type { Compiler } from './index.js';

export interface Options {
  rootDir: string;
  outputDir: string;
  parseOptions: Partial<ParseOptions>;
  compiler: Compiler;
  getAppConfig: GetAppConfig;
  getRoutesConfig: GetRoutesConfig;
  getDataloaderConfig: GetDataloaderConfig;
  compileTask?: () => ReturnType<ServerCompiler>;
  getAllPlugin: Context['getAllPlugin'];
  logger?: CreateLoggerReturnType;
}

export async function getAppWorkerContent(
  compiler: Compiler,
  buildOptions: {
    entry: string;
    outfile: string;
    minify?: boolean;
  }, options): Promise<string> {
  const { entry, outfile, minify = false } = buildOptions;
  const appWorkerFile = await compiler({
    entry,
    outfile,
    minify,
    timestamp: false,
  }, options);
  return fs.readFileSync(appWorkerFile, 'utf-8');
}

export async function getAppWorkerPath({
  getAppConfig,
  rootDir,
}) {
  const appConfig = await getAppConfig(['phaManifest']);
  let manifest = appConfig.phaManifest;
  return getAppWorkerUrl(manifest, path.join(rootDir, 'src'));
}

export default async function generateManifest({
  rootDir,
  outputDir,
  parseOptions,
  getAllPlugin,
  getAppConfig,
  getRoutesConfig,
  getDataloaderConfig,
  compiler,
  logger,
}: Options) {
  const [appConfig, routesConfig] = await Promise.all([getAppConfig(['phaManifest']), getRoutesConfig()]);

  let dataloaderConfig;
  try {
    // dataLoader may have side effect code.
    dataloaderConfig = await getDataloaderConfig();
  } catch (err) {
    logger.debug('PHA: getDataloaderConfig failed.');
    logger.debug(err);
  }

  let manifest = appConfig.phaManifest;
  const appWorkerPath = getAppWorkerUrl(manifest, path.join(rootDir, 'src'));
  // TODO: PHA Worker should deal with url which load by script element.
  if (appWorkerPath) {
    manifest = rewriteAppWorker(manifest);
    const entry = path.join(rootDir, './.ice/appWorker.ts');

    await getAppWorkerContent(compiler, {
      entry: fs.existsSync(entry) ? entry : appWorkerPath,
      outfile: path.join(outputDir, 'app-worker.js'),
      minify: true,
    }, getCompilerConfig({ getAllPlugin }));
  }

  const phaManifest = await parseManifest(manifest, {
    dataloaderConfig,
    ...parseOptions,
    routesConfig,
  } as ParseOptions);
  if (phaManifest?.tab_bar) {
    fs.writeFileSync(path.join(outputDir, 'manifest.json'), JSON.stringify(phaManifest), 'utf-8');
  } else {
    const multipleManifest = getMultipleManifest(phaManifest);
    Object.keys(multipleManifest).forEach((key) => {
      fs.writeFileSync(path.join(outputDir, `${key}-manifest.json`), JSON.stringify(multipleManifest[key]), 'utf-8');
    });
  }
}
