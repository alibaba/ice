import * as path from 'path';
import fs from 'fs-extra';
import consola from 'consola';
import type { ServerCompiler } from '../types/plugin.js';
import removeTopLevelCode from '../esbuild/removeTopLevelCode.js';
import { getCache, setCache } from '../utils/persistentCache.js';
import { getFileHash } from '../utils/hash.js';
import dynamicImport from '../utils/dynamicImport.js';
import formatPath from '../utils/formatPath.js';
import { RUNTIME_TMP_DIR } from '../constant.js';

type GetOutfile = (entry: string, exportNames: string[]) => string;

interface CompileConfig {
  entry: string;
  rootDir: string;
  transformInclude: (id: string) => boolean;
  needRecompile?: (entry: string, options: string[]) => Promise<boolean | string>;
  getOutfile?: GetOutfile;
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

  public setCompiler(esbuildCompiler: ServerCompiler): void {
    this.compiler = async (keepExports) => {
      const { entry, transformInclude } = this.compileConfig;
      const outfile = this.getOutfile(entry, keepExports);
      this.status = 'PENDING';
      const { error } = await esbuildCompiler({
        entryPoints: [entry],
        format: 'esm',
        outfile,
        plugins: [removeTopLevelCode(keepExports, transformInclude)],
        logLevel: 'silent', // The main server compiler process will log it.
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
  if (appExportConfig) {
    return appExportConfig;
  }
  const appEntry = path.join(rootDir, 'src/app');
  const getOutfile = (entry: string, keepExports: string[]) =>
    formatPath(path.join(rootDir, 'node_modules', `${keepExports.join('_')}_${path.basename(entry)}.mjs`));
  const config = new Config({
    entry: appEntry,
    rootDir,
    // Only remove top level code for src/app.
    transformInclude: (id) => id.includes('src/app') || id.includes('.ice'),
    getOutfile,
    needRecompile: async (entry, keepExports) => {
      let cached = null;
      const cachedKey = `app_${keepExports.join('_')}_${process.env.__ICE_VERSION__}`;
      try {
        cached = await getCache(rootDir, cachedKey);
      } catch (err) {}
      const fileHash = await getFileHash(appEntry);
      if (!cached || fileHash !== cached) {
        await setCache(rootDir, cachedKey, fileHash);
        return false;
      }
      return entry;
    },
  });

  const getAppConfig = async (exportNames?: string[]) => {
    return (await config.getConfig(exportNames || ['default', 'defineAppConfig'])) || {};
  };

  appExportConfig = {
    init(serverCompiler: ServerCompiler) {
      try {
        config.setCompiler(serverCompiler);
      } catch (error) {
        consola.error('Get app export config error.');
        console.debug(error.stack);
      }
    },
    getAppConfig,
  };

  return appExportConfig;
};

type RouteExportConfig = {
  init: (serverCompiler: ServerCompiler) => void;
  getRoutesConfig: (specifyRoutId?: string) => undefined | Promise<Record<string, any>>;
  reCompile: (taskKey: string) => void;
  ensureRoutesConfig: () => Promise<void>;
};

// FIXME: when run multiple test cases, this config will not be reset.
let routeExportConfig: null | RouteExportConfig;

export const getRouteExportConfig = (rootDir: string) => {
  if (routeExportConfig) {
    return routeExportConfig;
  }

  const routeConfigFile = path.join(rootDir, RUNTIME_TMP_DIR, 'routes-config.ts');
  const getOutfile = () => formatPath(path.join(rootDir, RUNTIME_TMP_DIR, 'routes-config.bundle.mjs'));

  const config = new Config({
    entry: routeConfigFile,
    rootDir,
    getOutfile,
    // Only remove top level code for route component file.
    transformInclude: (id) => id.includes('src/pages'),
    needRecompile: async (entry) => {
      let cached = false;
      const cachedKey = `route_config_file_${process.env.__ICE_VERSION__}`;
      try {
        cached = await getCache(rootDir, cachedKey);
      } catch (err) {}
      if (cached) {
        // Always use cached file path while `routes-config` trigger re-compile by webpack plugin.
        return entry;
      } else {
        setCache(rootDir, cachedKey, 'true');
        return false;
      }
    },
  });

  const getRoutesConfig = async (specifyRoutId?: string) => {
    // Routes config file may be removed after file changed.
    if (!fs.existsSync(routeConfigFile)) {
      return undefined;
    }
    const routeConfig = (await config.getConfig(['pageConfig']) || {}).default;
    return specifyRoutId ? routeConfig[specifyRoutId] : routeConfig;
  };

  // ensure routes config is up to date.
  const ensureRoutesConfig = async () => {
    await config.getConfigFile(['pageConfig']);
  };

  routeExportConfig = {
    init(serverCompiler: ServerCompiler) {
      config.clearTasks();
      try {
        config.setCompiler(serverCompiler);
      } catch (error) {
        consola.error('Get route export config error.');
        console.debug(error.stack);
      }
    },
    getRoutesConfig,
    ensureRoutesConfig,
    reCompile: config.reCompile,
  };
  return routeExportConfig;
};

export default Config;
