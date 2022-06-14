import path from 'path';
import { createHash } from 'crypto';
import fse from 'fs-extra';
import { build } from 'esbuild';
import { resolve as resolveExports } from 'resolve.exports';
import resolve from 'resolve';
import moduleLexer from '@ice/bundles/compiled/es-module-lexer/index.js';
import type { Config } from '@ice/types';
import flattenId from '../utils/flattenId.js';
import formatPath from '../utils/formatPath.js';
import { BUILDIN_CJS_DEPS, BUILDIN_ESM_DEPS } from '../constant.js';

interface PackageData {
  data: {
    name: string;
    type: string;
    version: string;
    main: string;
    module: string;
    exports: string | Record<string, any> | string[];
    dependencies: Record<string, string>;
    [field: string]: any;
  };
  dir: string;
}

interface DepInfo {
  file: string;
  src: string;
}

export interface DepsMetaData {
  hash: string;
  deps: Record<string, DepInfo>;
}

interface PreBundleDepsResult {
  metadata: DepsMetaData;
}

interface PreBundleDepsOptions {
  depsInfo: Record<string, string>;
  rootDir: string;
  cacheDir: string;
  taskConfig: Config;
}

export default async function preBundleCJSDeps(options: PreBundleDepsOptions): Promise<PreBundleDepsResult> {
  const { depsInfo, rootDir, cacheDir, taskConfig } = options;
  const metadata = createDepsMetadata(depsInfo, taskConfig);

  if (!Object.keys(depsInfo)) {
    return {
      metadata,
    };
  }

  const depsCacheDir = getDepsCacheDir(cacheDir);
  const metadataJSONPath = getDepsMetaDataJSONPath(cacheDir);
  if (fse.pathExistsSync(metadataJSONPath)) {
    const prevMetadata = await fse.readJSON(metadataJSONPath) as DepsMetaData;
    if (metadata.hash === prevMetadata.hash) {
      // don't need to pre bundle the deps again if the deps info is not updated
      return {
        metadata: prevMetadata,
      };
    }
  }

  await fse.emptyDir(depsCacheDir);

  const flatIdDeps: Record<string, string> = {};

  await moduleLexer.init;
  for (const depId in depsInfo) {
    const packageEntry = resolvePackageEntry(depId, rootDir);
    const flatId = flattenId(depId);
    flatIdDeps[flatId] = packageEntry;

    const file = path.join(depsCacheDir, `${flatId}.js`);
    // add meta info to metadata.deps
    metadata.deps[depId] = {
      file,
      src: flatIdDeps[flatId],
    };
  }

  await build({
    absWorkingDir: process.cwd(),
    entryPoints: flatIdDeps,
    bundle: true,
    logLevel: 'error',
    sourcemap: true,
    outdir: depsCacheDir,
    format: 'cjs',
    platform: 'node',
    loader: { '.js': 'jsx' },
    ignoreAnnotations: true,
    external: [...BUILDIN_CJS_DEPS, ...BUILDIN_ESM_DEPS],
  });

  await fse.writeJSON(metadataJSONPath, metadata, { spaces: 2 });

  return {
    metadata,
  };
}

function resolvePackageEntry(depId: string, rootDir: string) {
  const { data: pkgJSONData, dir } = resolvePackageData(depId, rootDir);
  // resolve exports cjs field
  let entryPoint = resolveExports(pkgJSONData, depId, { require: true });
  if (!entryPoint) {
    entryPoint = pkgJSONData['main'];
  }
  const entryPointPath = path.join(dir, entryPoint);
  return entryPointPath;
}

function resolvePackageData(
  id: string,
  rootDir: string,
): PackageData {
  // Find the actual package name. For examples: @ice/runtime/server -> @ice/runtime
  const idSplits = id.split('/');
  const pkgId = idSplits.slice(0, 2).join('/');
  const packageJSONPath = resolve.sync(`${pkgId}/package.json`, {
    basedir: rootDir,
    paths: [],
    preserveSymlinks: false,
  });
  const packageJSONData = fse.readJSONSync(packageJSONPath);
  const pkgDir = path.dirname(packageJSONPath);
  return {
    data: packageJSONData,
    dir: pkgDir,
  };
}

function createDepsMetadata(depsInfo: Record<string, string>, taskConfig: Config): DepsMetaData {
  const hash = getDepHash(depsInfo, taskConfig);
  return {
    hash,
    deps: {},
  };
}

function getDepHash(depsInfo: Record<string, string>, taskConfig: Config) {
  let content = JSON.stringify(depsInfo) + JSON.stringify(taskConfig);
  return getHash(content);
}

function getHash(text: Buffer | string): string {
  return createHash('sha1').update(text).digest('hex').substring(0, 8);
}

export function getDepsCacheDir(cacheDir: string) {
  return formatPath(path.resolve(cacheDir, 'deps'));
}

export function getDepsMetaDataJSONPath(cacheDir: string) {
  return formatPath(path.resolve(getDepsCacheDir(cacheDir), '_metadata.json'));
}
