import path from 'path';
import { createRequire } from 'module';
import fse from 'fs-extra';
import findUp from 'find-up';
import type { Plugin } from 'esbuild';
import type { Config } from '@ice/shared-config/types';
import { logger } from '../utils/logger.js';
import { CACHE_DIR } from '../constant.js';
import { bundleDeps, resolvePackageESEntry, getDepsCacheDir } from './preBundleDeps.js';
import type { PreBundleDepsMetaData } from './preBundleDeps.js';
import { resolveId } from './analyze.js';

const require = createRequire(import.meta.url);

interface PreBundleResult {
  bundlePath?: string;
}

interface PreBundleOptions {
  rootDir: string;
  pkgName: string;
  alias: Record<string, string>;
  resolveId: string;
  ignores: string[];
  plugins?: Plugin[];
  external?: string[];
  define?: Record<string, string>;
  taskConfig?: Config;
  speedup?: boolean;
}

export class RuntimeMeta {
  private rootDir: string;
  private alias: Record<string, string>;
  private ignores: string[];
  private plugins: Plugin[];
  private metaData: PreBundleDepsMetaData;
  private cachePath: string;
  private external: string[];
  private define: Record<string, string>;
  private taskConfig: Config;
  private speedup: boolean;

  constructor(options: Omit<PreBundleOptions, 'pkgName' | 'resolveId'>) {
    this.rootDir = options.rootDir;
    this.alias = options.alias;
    this.ignores = options.ignores;
    this.plugins = options.plugins;
    this.external = options.external;
    this.define = options.define;
    this.speedup = options.speedup;
    this.cachePath = path.join(getDepsCacheDir(path.join(this.rootDir, CACHE_DIR)), 'metadata.json');
    this.taskConfig = options.taskConfig;
  }

  async getDepsCache() {
    if (fse.pathExistsSync(this.cachePath)) {
      this.metaData = await fse.readJSON(this.cachePath) as PreBundleDepsMetaData;
    } else {
      this.metaData = {
        deps: {},
        hash: '',
      };
    }
    return this.metaData;
  }

  async setDepsCache(pkgName: string, resolveSource: string, bundlePath: string) {
    this.metaData.deps[pkgName] = {
      file: bundlePath,
      src: resolveSource,
    };
    await fse.writeJSON(this.cachePath, this.metaData);
  }

  resolveDepPath(pkgName: string) {
    // Check if the package is aliased.
    let resolved = resolveId(pkgName, this.alias);
    if (resolved && !path.isAbsolute(resolved)) {
      const resolvePath = require.resolve(resolved, { paths: [this.rootDir] });
      // If the package is aliased, we need to bundle the aliased package.
      try {
        const pkgPath = findUp.sync('package.json', { cwd: resolvePath });
        resolved = resolvePackageESEntry(pkgName, pkgPath, this.alias);
      } catch (err) {
        logger.error(`cant resolve package of path: ${resolved}`, err);
      }
    }
    return resolved;
  }

  public async bundle(pkgName: string): Promise<string> {
    const resolveId = this.resolveDepPath(pkgName);
    const metaData = this.metaData || await this.getDepsCache();
    if (metaData.deps[pkgName] && metaData.deps[pkgName].src === resolveId) {
      return metaData.deps[pkgName].file;
    } else if (resolveId) {
      const { bundlePath } = await preBundleDeps({
        rootDir: this.rootDir,
        alias: this.alias,
        ignores: this.ignores,
        plugins: this.plugins,
        external: this.external,
        define: this.define,
        pkgName: pkgName,
        resolveId,
        taskConfig: this.taskConfig,
        speedup: this.speedup,
      });
      await this.setDepsCache(pkgName, resolveId, bundlePath);
      return bundlePath;
    }
    // If the package is not found, return an empty string.
    return '';
  }
}

export default async function preBundleDeps(options: PreBundleOptions): Promise<PreBundleResult> {
  const { rootDir, pkgName, alias, ignores, plugins, resolveId, external, define, speedup, taskConfig } = options;
  const depsCacheDir = getDepsCacheDir(path.join(rootDir, CACHE_DIR));
  try {
    await bundleDeps({
      entryPoints: { [pkgName]: resolveId },
      outdir: depsCacheDir,
      alias,
      ignores,
      plugins: plugins || [],
      external,
      define,
      taskConfig,
      speedup,
      rootDir,
    });
  } catch (err) {
    logger.error('Failed to bundle dependencies.', { [pkgName]: resolveId });
    logger.error(err);
    return {};
  }
  return {
    bundlePath: path.join(depsCacheDir, `${pkgName}.mjs`),
  };
}
