import * as path from 'path';
import fs from 'fs-extra';
import type { ServerCompiler } from '@ice/types/esm/plugin.js';
import removeTopLevelCode from '../esbuild/removeTopLevelCode.js';
import { getCache, setCache } from '../utils/persistentCache.js';
import { getFileHash } from '../utils/hash.js';
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
  private compiler: (keepExports: string[]) => Promise<string>;
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
      (() => path.join(rootDir, 'node_modules', `${path.basename(entry)}.mjs`));
  }

  public setCompiler(esbuildCompiler: ServerCompiler): void {
    this.compiler = async (keepExports) => {
      const { entry, transformInclude } = this.compileConfig;
      const outfile = this.getOutfile(entry, keepExports);
      this.status = 'PENDING';
      await esbuildCompiler({
        entryPoints: [entry],
        format: 'esm',
        inject: [],
        outfile,
        plugins: [removeTopLevelCode(keepExports, transformInclude)],
      });
      this.status = 'RESOLVED';
      return `${outfile}?version=${new Date().getTime()}`;
    };
  }

  public reCompile(taskKey: string) {
    // Re-compile only triggered when `getConfig` has been called.
    if (this.compileTasks[taskKey]) {
      this.compileTasks[taskKey] = this.compiler(this.lastOptions);
    }
  }

  public getConfig = async (keepExports: string[]) => {
    const taskKey = keepExports.join('_');
    this.lastOptions = keepExports;
    let targetFile = '';
    // Check file hash if it need to be re compiled
    if (this.compileConfig?.needRecompile) {
      const outfile = this.getOutfile(this.compileConfig.entry, keepExports);
      const cached = await this.compileConfig?.needRecompile(outfile, keepExports);
      if (cached && typeof cached === 'string') {
        targetFile = this.status === 'RESOLVED' ? `${cached}?version=${new Date().getTime()}`
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
    return await import(targetFile);
  };
}

export const getAppExportConfig = (rootDir: string) => {
  const appEntry = path.join(rootDir, 'src/app');
  const getOutfile = (entry: string, keepExports: string[]) =>
    path.join(rootDir, 'node_modules', `${keepExports.join('_')}_${path.basename(entry)}.mjs`);
  const appExportConfig = new Config({
    entry: appEntry,
    rootDir,
    // Only remove top level code for src/app.
    transformInclude: (id) => id.includes('src/app') || id.includes('.ice'),
    getOutfile,
    needRecompile: async (entry, keepExports) => {
      let cached = null;
      const cachedKey = `app_${keepExports.join('_')}`;
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
    return await appExportConfig.getConfig(exportNames || ['default', 'defineAppConfig']);
  };

  return {
    init(serverCompiler: ServerCompiler) {
      appExportConfig.setCompiler(serverCompiler);
    },
    getAppConfig,
  };
};

export const getRouteExportConfig = (rootDir: string) => {
  const routeConfigFile = path.join(rootDir, RUNTIME_TMP_DIR, 'routes-config.ts');
  const routeExportConfig = new Config({
    entry: routeConfigFile,
    rootDir,
    // Only remove top level code for route component file.
    transformInclude: (id) => id.includes('src/pages'),
    needRecompile: async (entry) => {
      let cached = false;
      const cachedKey = 'route_config_file';
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
    const routeConfig = await routeExportConfig.getConfig(['getConfig']);
    return specifyRoutId ? routeConfig[specifyRoutId] : routeConfig;
  };
  return {
    init(serverCompiler: ServerCompiler) {
      routeExportConfig.setCompiler(serverCompiler);
    },
    getRoutesConfig,
    reCompile: routeExportConfig.reCompile,
  };
};

export default Config;