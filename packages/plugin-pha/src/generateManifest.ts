import * as path from 'path';
import * as fs from 'fs';
import type { GetAppConfig, GetRoutesConfig, ServerCompiler } from '@ice/app/esm/types';
import { parseManifest, rewriteAppWorker, getAppWorkerUrl, getMultipleManifest, type ParseOptions } from './manifestHelpers.js';
import type { Compiler } from './index.js';

export interface Options {
  rootDir: string;
  outputDir: string;
  parseOptions: Partial<ParseOptions>;
  compiler: Compiler;
  getAppConfig: GetAppConfig;
  getRoutesConfig: GetRoutesConfig;
  compileTask?: () => ReturnType<ServerCompiler>;
}

export async function getAppWorkerContent(
  compiler: Compiler,
  options: {
    entry: string;
    outfile: string;
    minify?: boolean;
  }): Promise<string> {
  const { entry, outfile, minify = false } = options;
  const appWorkerFile = await compiler({
    entry,
    outfile,
    minify,
    timestamp: false,
  });
  return fs.readFileSync(appWorkerFile, 'utf-8');
}

export default async function generateManifest({
  rootDir,
  outputDir,
  parseOptions,
  getAppConfig,
  getRoutesConfig,
  compiler,
}: Options) {
  const [appConfig, routesConfig] = await Promise.all([getAppConfig(['phaManifest']), getRoutesConfig()]);
  let manifest = appConfig.phaManifest;
  const appWorkerPath = getAppWorkerUrl(manifest, path.join(rootDir, 'src'));
  if (appWorkerPath) {
    manifest = rewriteAppWorker(manifest);
    await getAppWorkerContent(compiler, {
      entry: appWorkerPath,
      outfile: path.join(outputDir, 'app-worker.js'),
      minify: true,
    });
  }
  const phaManifest = await parseManifest(manifest, {
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
