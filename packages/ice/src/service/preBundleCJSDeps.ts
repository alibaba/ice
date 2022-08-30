import path from 'path';
import { createHash } from 'crypto';
import consola from 'consola';
import fse from 'fs-extra';
import { build } from 'esbuild';
import type { Plugin } from 'esbuild';
import { resolve as resolveExports } from 'resolve.exports';
import moduleLexer from '@ice/bundles/compiled/es-module-lexer/index.js';
import type { Config } from '@ice/types';
import type { TaskConfig } from 'build-scripts';
import flattenId from '../utils/flattenId.js';
import formatPath from '../utils/formatPath.js';
import { BUILDIN_CJS_DEPS, BUILDIN_ESM_DEPS } from '../constant.js';
import type { DepScanData } from '../esbuild/scan.js';
import aliasPlugin from '../esbuild/alias.js';

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
  depsInfo: Record<string, DepScanData>;
  cacheDir: string;
  taskConfig: Config;
  alias: TaskConfig<Config>['config']['alias'];
  plugins?: Plugin[];
}

/**
 * Pre bundle dependencies from esm to cjs.
 */
export default async function preBundleCJSDeps(options: PreBundleDepsOptions): Promise<PreBundleDepsResult> {
  const { depsInfo, cacheDir, taskConfig, plugins = [], alias } = options;
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
    const packageEntry = resolvePackageEntry(depId, depsInfo[depId].pkgPath, alias);
    const flatId = flattenId(depId);
    flatIdDeps[flatId] = packageEntry;

    const file = path.join(depsCacheDir, `${flatId}.js`);
    // add meta info to metadata.deps
    metadata.deps[depId] = {
      file,
      src: flatIdDeps[flatId],
    };
  }

  try {
    await build({
      absWorkingDir: process.cwd(),
      entryPoints: flatIdDeps,
      bundle: true,
      logLevel: 'error',
      outdir: depsCacheDir,
      format: 'cjs',
      platform: 'node',
      loader: { '.js': 'jsx' },
      ignoreAnnotations: true,
      plugins: [
        aliasPlugin({ alias, format: 'cjs', externalDependencies: false }),
        ...plugins,
      ],
      external: [...BUILDIN_CJS_DEPS, ...BUILDIN_ESM_DEPS],
    });
  } catch (error) {
    consola.error('Failed to bundle dependencies.');
    consola.debug(error);
  }

  await fse.writeJSON(metadataJSONPath, metadata, { spaces: 2 });

  return {
    metadata,
  };
}

function resolvePackageEntry(depId: string, pkgPath: string, alias: TaskConfig<Config>['config']['alias']) {
  const pkgJSON = fse.readJSONSync(pkgPath);
  const pkgDir = path.dirname(pkgPath);
  const aliasKey = Object.keys(alias).find(key => depId === key || depId.startsWith(`${depId}/`));
  // alias: { rax: 'rax-compat' }
  // rax -> .
  // rax/element -> ./element
  const entry = aliasKey ? depId.replace(new RegExp(`^${aliasKey}`), '.') : depId;
  // resolve exports cjs field
  let resolvedEntryPoint = resolveExports(pkgJSON, entry, { require: true }) || '';
  if (!resolvedEntryPoint) {
    resolvedEntryPoint = pkgJSON['main'] || 'index.js';
  }
  const entryPointPath = path.join(pkgDir, resolvedEntryPoint);
  return entryPointPath;
}


function createDepsMetadata(depsInfo: Record<string, DepScanData>, taskConfig: Config): DepsMetaData {
  const hash = getDepHash(depsInfo, taskConfig);
  return {
    hash,
    deps: {},
  };
}

function getDepHash(depsInfo: Record<string, DepScanData>, taskConfig: Config) {
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
