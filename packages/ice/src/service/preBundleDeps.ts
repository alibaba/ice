import path from 'path';
import { createHash } from 'crypto';
import fse from 'fs-extra';
import { esbuild } from '@ice/bundles';
import type { Plugin, BuildOptions } from 'esbuild';
import { resolve as resolveExports, legacy as resolveLegacy } from 'resolve.exports';
import moduleLexer from '@ice/bundles/compiled/es-module-lexer/index.js';
import type { Config } from '@ice/webpack-config/types';
import type { TaskConfig } from 'build-scripts';
import { getCSSModuleLocalIdent } from '@ice/webpack-config';
import flattenId from '../utils/flattenId.js';
import formatPath from '../utils/formatPath.js';
import { BUILDIN_CJS_DEPS, BUILDIN_ESM_DEPS } from '../constant.js';
import type { DepScanData } from '../esbuild/scan.js';
import externalPlugin from '../esbuild/external.js';
import emptyCSSPlugin from '../esbuild/emptyCSS.js';
import cssModulesPlugin from '../esbuild/cssModules.js';
import escapeLocalIdent from '../utils/escapeLocalIdent.js';
import { createLogger } from '../utils/logger.js';

const logger = createLogger('pre-bundle-deps');

interface DepInfo {
  file: string;
  src: string;
}

export interface PreBundleDepsMetaData {
  hash: string;
  deps: Record<string, DepInfo>;
}

interface PreBundleDepsResult {
  metadata?: PreBundleDepsMetaData;
}

interface PreBundleDepsOptions {
  rootDir: string;
  cacheDir: string;
  taskConfig: Config;
  alias: Record<string, string>;
  ignores?: string[];
  plugins?: Plugin[];
  define?: esbuild.BuildOptions['define'];
  external?: esbuild.BuildOptions['external'];
}

/**
 * Only when the server bundle format type is esm,
 * we will pre bundle dependencies which maybe have import css file directly.
 *
 * CSS files can not be resolve in ESM(server render will run in ESM), so we will external item.
 */
export default async function preBundleDeps(
  depsInfo: Record<string, DepScanData>,
  options: PreBundleDepsOptions,
): Promise<PreBundleDepsResult> {
  const { cacheDir, taskConfig, plugins = [], alias, ignores, define, external = [] } = options;
  const metadata = createDepsMetadata(depsInfo, taskConfig);

  if (!Object.keys(depsInfo)) {
    return {
      metadata,
    };
  }

  const depsCacheDir = getDepsCacheDir(cacheDir);
  const metadataJSONPath = getDepsMetaDataJSONPath(cacheDir);
  if (fse.pathExistsSync(metadataJSONPath)) {
    const prevMetadata = await fse.readJSON(metadataJSONPath) as PreBundleDepsMetaData;
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
    const packageEntry = resolvePackageESEntry(depId, depsInfo[depId].pkgPath, alias);
    const flatId = flattenId(depId);
    flatIdDeps[flatId] = packageEntry;

    const file = path.join(depsCacheDir, `${flatId}.mjs`);
    // add meta info to metadata.deps
    metadata.deps[depId] = {
      file,
      src: flatIdDeps[flatId],
    };
  }

  try {
    await bundleDeps({
      entryPoints: flatIdDeps,
      outdir: depsCacheDir,
      plugins,
      ignores,
      alias,
      external,
      define,
    });

    await fse.writeJSON(metadataJSONPath, metadata, { spaces: 2 });

    return {
      metadata,
    };
  } catch (error) {
    logger.error('Failed to bundle dependencies.');
    logger.debug(error);
    return {};
  }
}

export async function bundleDeps(options:
  {
    entryPoints: BuildOptions['entryPoints'];
    outdir: BuildOptions['outdir'];
    alias: BuildOptions['alias'];
    ignores: string[];
    plugins: Plugin[];
    external: string[];
    define: BuildOptions['define'];
  }) {
  const { entryPoints, outdir, alias, ignores, plugins, external, define } = options;
  return await esbuild.build({
    absWorkingDir: process.cwd(),
    entryPoints,
    bundle: true,
    logLevel: 'error',
    outdir,
    format: 'esm',
    platform: 'node',
    loader: { '.js': 'jsx' },
    ignoreAnnotations: true,
    alias,
    define,
    metafile: true,
    outExtension: {
      '.js': '.mjs',
    },
    banner: {
      js: "import { createRequire } from 'module';const require = createRequire(import.meta.url);",
    },
    plugins: [
      emptyCSSPlugin(),
      externalPlugin({ ignores, format: 'esm', externalDependencies: false }),
      cssModulesPlugin({
        extract: false,
        generateLocalIdentName: function (name: string, filename: string) {
          // Compatible with webpack css-loader.
          return escapeLocalIdent(getCSSModuleLocalIdent(filename, name));
        },
      }),
      ...plugins,
    ],
    external: [...BUILDIN_CJS_DEPS, ...BUILDIN_ESM_DEPS, ...external],
  });
}

export function resolvePackageESEntry(depId: string, pkgPath: string, alias: TaskConfig<Config>['config']['alias']) {
  const pkgJSON = fse.readJSONSync(pkgPath);
  const pkgDir = path.dirname(pkgPath);
  const aliasKey = Object.keys(alias).find(key => depId === key || depId.startsWith(`${depId}/`));
  // alias: { rax: 'rax-compat' }
  // rax -> .
  // rax/element -> ./element
  const entry = aliasKey ? depId.replace(new RegExp(`^${aliasKey}`), '.') : depId;
  // resolve "exports.import" field or "module" field
  const resolvedEntryPoint = (resolveExports(pkgJSON, entry) || resolveLegacy(pkgJSON) || 'index.js') as string;
  const entryPointPath = path.join(pkgDir, resolvedEntryPoint);
  return entryPointPath;
}


function createDepsMetadata(depsInfo: Record<string, DepScanData>, taskConfig: Config): PreBundleDepsMetaData {
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
