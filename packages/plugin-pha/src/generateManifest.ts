import * as path from 'path';
import * as fs from 'fs';
import { parseManifest, rewriteAppWorker, getAppWorkerUrl, getMultipleManifest, type ParseOptions } from './manifestHelpers.js';
import { templateFile } from './constants.js';
import type { Manifest } from './types.js';
import type { Compiler } from './index.js';

export interface Options {
  rootDir: string;
  outputDir: string;
  parseOptions: Partial<ParseOptions>;
  compiler: Compiler;
  compileTask?: () => Promise<{ serverEntry: string}>;
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

// Compile task before parse pha manifest.
export async function compileEntires(
  compiler: Compiler,
  { rootDir, outputDir }: { rootDir: string; outputDir: string }) {
  return await Promise.all([
    compiler({
      entry: path.join(rootDir, templateFile),
      outfile: path.join(outputDir, 'pha-manifest.mjs'),
    }),
    compiler({
      entry: path.join(rootDir, '.ice/routes-config.ts'),
      outfile: path.join(outputDir, 'routes-config.mjs'),
      removeCode: true,
    }),
  ]);
}

export default async function generateManifest({
  rootDir,
  outputDir,
  parseOptions,
  compiler,
}: Options) {
  const [manifestEntry, routesConfigEntry] = await compileEntires(compiler, { rootDir, outputDir });
  let manifest: Manifest = (await import(manifestEntry)).default;
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
    configEntry: routesConfigEntry,
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
