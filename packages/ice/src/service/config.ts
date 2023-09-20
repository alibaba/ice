import * as path from 'path';
import fs from 'fs-extra';
import type { Config as SharedConfig } from '@ice/shared-config/types';
import type { ServerCompiler } from '../types/plugin.js';
import { getCache, setCache } from '../utils/persistentCache.js';
import { getFileHash } from '../utils/hash.js';
import dynamicImport from '../utils/dynamicImport.js';
import formatPath from '../utils/formatPath.js';
import { RUNTIME_TMP_DIR, CACHE_DIR } from '../constant.js';
import { createLogger } from '../utils/logger.js';
import externalBuiltinPlugin from '../esbuild/externalNodeBuiltin.js';

type GetOutfile = (entry: string, exportNames: string[]) => string;

interface CompileConfig {
  entry: string;
  rootDir: string;
  transformInclude?: (id: string) => boolean;
  needRecompile?: (entry: string, options: string[]) => Promise<boolean | string>;
  getOutfile?: GetOutfile;
  redirectImports?: SharedConfig['redirectImports'];
}

class Config {
  private compileTasks: Record<string, Promise<string>>;
  private compiler: (keepExports: string[]) => Promise<string | null>;
  private compileConfig: CompileConfig;
  private lastOptions: string[];
  private getOutfile: GetOutfile;
  private status: 'PENDING' | 'RESOLVED';

  constructor(compileConfig: CompileConfig) {
    const { rootDir, entry } = compileConfig;
    this.compileTasks = {};
    this.compileConfig = compileConfig;
    this.lastOptions = [];
    this.status = 'PENDING';
    this.getOutfile = compileConfig.getOutfile ||
      (() => formatPath(path.join(rootDir, 'node_modules', `${path.basename(entry)}.mjs`)));
  }

  public setCompiler(serverCompiler: ServerCompiler): void {
    this.compiler = async (keepExports) => {
      const { entry, transformInclude, redirectImports } = this.compileConfig;
      const outfile = this.getOutfile(entry, keepExports);
      this.status = 'PENDING';
      const { error } = await serverCompiler({
        entryPoints: [entry],
        format: 'esm',
        outfile,
        plugins: [
          // External node builtin modules, such as `fs`, it will be imported by weex document.
          externalBuiltinPlugin(),
        ].filter(Boolean),
        sourcemap: false,
        logLevel: 'silent', // The main server compiler process will log it.
      }, {
        // Always external dependencies when get config.
        externalDependencies: true,
        swc: {
          keepExports: {
            value: keepExports,
            include: transformInclude,
          },
        },
        redirectImports,
      });
      if (!error) {
        this.status = 'RESOLVED';
        return outfile;
      }
    };
  }

  public clearTasks = () => {
    this.status = 'PENDING';
    this.compileTasks = {};
  };

  public reCompile = (taskKey: string) => {
    // Re-compile only triggered when `pageConfig` has been called.
    if (this.compileTasks[taskKey]) {
      this.compileTasks[taskKey] = this.compiler(this.lastOptions);
    }
  };

  public getConfigFile = async (keepExports: string[]) => {
    const taskKey = keepExports.join('_');
    this.lastOptions = keepExports;
    let targetFile = '';
    // Check file hash if it need to be re compiled
    if (this.compileConfig?.needRecompile) {
      const outfile = this.getOutfile(this.compileConfig.entry, keepExports);
      const cached = await this.compileConfig?.needRecompile(outfile, keepExports);
      if (cached && typeof cached === 'string') {
        targetFile = this.status === 'RESOLVED' ? cached
          : (await this.compileTasks[taskKey]);
      } else if (!cached) {
        this.reCompile(taskKey);
      }
    }

    if (!this.compileTasks[taskKey]) {
      this.compileTasks[taskKey] = this.compiler(keepExports);
    }

    if (!targetFile) {
      targetFile = await this.compileTasks[taskKey];
    }

    return targetFile;
  };

  public getConfig = async (keepExports: string[]) => {
    const targetFile = await this.getConfigFile(keepExports);
    if (targetFile) return await dynamicImport(targetFile, true);
  };
}

type AppExportConfig = {
  init: (serverCompiler: ServerCompiler) => void;
  getAppConfig: (exportNames?: string[]) => Promise<Record<string, any>>;
};

let appExportConfig: null | AppExportConfig;

export const getAppExportConfig = (rootDir: string) => {
  const logger = createLogger('app-config');

  if (appExportConfig) {
    return appExportConfig;
  }
  const appEntry = path.join(rootDir, 'src/app');
  const getOutfile = (entry: string, keepExports: string[]) =>
    formatPath(path.join(rootDir, CACHE_DIR, `${keepExports.join('_')}_${path.basename(entry)}.mjs`));
  const config = new Config({
    entry: appEntry,
    rootDir,
    // Only remove top level code for src/app.
    transformInclude: (id) => id.includes('src/app') || id.includes('.ice'),
    getOutfile,
    needRecompile: async (entry, keepExports) => {
      const cachedKey = `app_${keepExports.join('_')}_${process.env.__ICE_VERSION__}`;
      const cached = await getCache(rootDir, cachedKey);
      const fileHash = await getFileHash(appEntry);
      if (!cached || fileHash !== cached) {
        await setCache(rootDir, cachedKey, fileHash);
        return false;
      }
      return entry;
    },
  });

  const getAppConfig = async (exportNames?: string[]) => {
    try {
      return (await config.getConfig(exportNames || ['default', 'defineAppConfig'])) || {};
    } catch (error) {
      logger.briefError('Failed to get app config.');
      logger.debug(error);
    }
  };

  appExportConfig = {
    init(serverCompiler: ServerCompiler) {
      try {
        config.setCompiler(serverCompiler);
      } catch (error) {
        logger.briefError('Failed to compile app config.');
        logger.debug(error);
      }
    },
    getAppConfig,
  };

  return appExportConfig;
};

type RouteExportConfig = {
  init: (serverCompiler: ServerCompiler) => void;
  getRoutesConfig: (specifyRoutId?: string) => undefined | Promise<Record<string, any>>;
  getDataloaderConfig: (specifyRoutId?: string) => undefined | Promise<Record<string, any>>;
  reCompile: (taskKey: string) => void;
  ensureRoutesConfig: () => Promise<void>;
};

// FIXME: when run multiple test cases, this config will not be reset.
let routeExportConfig: null | RouteExportConfig;

export const getRouteExportConfig = (rootDir: string) => {
  const dataLoaderConfigLogger = createLogger('data-loader-config');
  const routeConfigLogger = createLogger('route-config');

  if (routeExportConfig) {
    return routeExportConfig;
  }

  const routeConfigFile = path.join(rootDir, RUNTIME_TMP_DIR, 'routes-config.ts');
  const loadersConfigFile = path.join(rootDir, RUNTIME_TMP_DIR, 'dataloader-config.ts');
  const getRouteConfigOutfile = () => formatPath(path.join(rootDir, RUNTIME_TMP_DIR, 'routes-config.bundle.mjs'));
  const getdataLoadersConfigOutfile = () => formatPath(path.join(rootDir, RUNTIME_TMP_DIR, 'dataloader-config.bundle.mjs'));
  const cachedKey = `route_config_file_${process.env.__ICE_VERSION__}`;

  const routeConfig = new Config({
    entry: routeConfigFile,
    rootDir,
    getOutfile: getRouteConfigOutfile,
    needRecompile: async (entry) => {
      const cached = await getCache(rootDir, cachedKey);
      if (cached) {
        // Always use cached file path while `routes-config` trigger re-compile by webpack plugin.
        return entry;
      } else {
        await setCache(rootDir, cachedKey, 'true');
        return false;
      }
    },
    redirectImports: [{
      specifier: ['definePageConfig'],
      source: 'ice/types',
    }],
  });

  const dataloaderConfig = new Config({
    entry: loadersConfigFile,
    rootDir,
    getOutfile: getdataLoadersConfigOutfile,
    needRecompile: async (entry) => {
      const cachedKey = `loader_config_file_${process.env.__ICE_VERSION__}`;
      const cached = await getCache(rootDir, cachedKey);
      if (cached) {
        // Always use cached file path while `routes-config` trigger re-compile by webpack plugin.
        return entry;
      } else {
        await setCache(rootDir, cachedKey, 'true');
        return false;
      }
    },
  });

  const getRoutesConfig = async (specifyRoutId?: string) => {
    // Routes config file may be removed after file changed.
    if (!fs.existsSync(routeConfigFile)) {
      return undefined;
    }
    const res = (await routeConfig.getConfig(['pageConfig']) || {}).default;
    return specifyRoutId ? res[specifyRoutId] : res;
  };

  const getDataloaderConfig = async (specifyRoutId?: string) => {
    // Loaders config file may be removed after file changed.
    if (!fs.existsSync(loadersConfigFile)) {
      return undefined;
    }
    const res = (await dataloaderConfig.getConfig(['dataLoader']) || {}).default;
    return specifyRoutId ? res[specifyRoutId] : res;
  };

  // ensure routes config is up to date.
  const ensureRoutesConfig = async () => {
    const configFile = await routeConfig.getConfigFile(['pageConfig']);
    if (!configFile) {
      await setCache(rootDir, cachedKey, '');
    }
  };

  routeExportConfig = {
    init(serverCompiler: ServerCompiler) {
      routeConfig.clearTasks();
      try {
        routeConfig.setCompiler(serverCompiler);
      } catch (error) {
        routeConfigLogger.briefError('Failed to get route config.');
        routeConfigLogger.debug(error);
      }
      try {
        dataloaderConfig.setCompiler(serverCompiler);
      } catch (error) {
        dataLoaderConfigLogger.briefError('Failed to get dataLoader config.');
        dataLoaderConfigLogger.debug(error);
      }
    },
    getRoutesConfig,
    getDataloaderConfig,
    ensureRoutesConfig,
    reCompile: routeConfig.reCompile,
  };

  return routeExportConfig;
};

export default Config;
