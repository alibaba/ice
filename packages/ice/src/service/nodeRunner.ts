// Inspired by https://github.com/vitest-dev/vitest/tree/main/packages/vite-node
import { createRequire } from 'module';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import vm from 'vm';
import { isNodeBuiltin } from 'mlly';

export interface ModuleResult {
  code?: string;
  externalize?: string;
  // TODO: add sourcemap type.
  map?: any;
}

export interface NodeRunnerOptions {
  rootDir: string;
  moduleCache?: ModuleCacheMap;
  load: (id: string) => Promise<ModuleResult>;
  resolveId?: (id: string, importer?: string) => Promise<string | null>;
  interopDefault?: boolean;
}

interface ModuleCache {
  promise?: Promise<any>;
  exports?: any;
  evaluated?: boolean;
  resolving?: boolean;
  code?: string;
  map?: any;
  /**
   * Module ids that imports this module
   */
  importers?: Set<string>;
}

class ModuleCacheMap extends Map<string, ModuleCache> {
  set(id: string, mod: ModuleCache) {
    return super.set(id, mod);
  }

  get(id: string): ModuleCache {
    if (!super.has(id)) {
      super.set(id, {});
    }
    return super.get(id)!;
  }

  update(id: string, mod: Partial<ModuleCache>) {
    if (!super.has(id)) {
      super.set(id, mod);
    } else {
      Object.assign(super.get(id), mod);
    }
    return this;
  }

  delete(id: string): boolean {
    return super.delete(id);
  }
}


class NodeRunner {
  rootDir: string;
  moduleCache: ModuleCacheMap;

  constructor(public options: NodeRunnerOptions) {
    this.rootDir = options.rootDir;
    this.moduleCache = options.moduleCache || new ModuleCacheMap();
  }

  async run(id: string) {
    const filePath = path.join(this.rootDir, id);
  }

  async cachedRequest(id: string, callstack: string[]) {

  }

  async resolveUrl(id: string, importee?: string) {
    const resolveKey = `resolve:${id}`;
    // put info about new import as soon as possible, so we can start tracking it
    this.moduleCache.set(resolveKey, { resolving: true });
    try {
      if (isNodeBuiltin(id) || !this.options.resolveId) {
        return id;
      } else {
        return await this.options.resolveId(id, importee);
      }
    } finally {
      this.moduleCache.delete(resolveKey);
    }
  }

  async dependencyRequest(id: string, callstack: string[]) {
    const getStack = () => {
      return `stack:\n${[...callstack, id].reverse().map(p => `- ${p}`).join('\n')}`;
    };

    try {
      if (callstack.includes(id)) {
        const depExports = this.moduleCache.get(id)?.exports;
        if (depExports) return depExports;
        throw new Error(`[vite-node] Failed to resolve circular dependency, ${getStack()}`);
      }
      return await this.cachedRequest(id, callstack);
    } catch (e) {
      console.error(e);
    }
  }

  async request(id: string, _callstack: string[] = []) {
    const mod = this.moduleCache.get(id);
    const callstack = [..._callstack, id];
    let { code: transformed, externalize } = await this.options.load(id);

    const request = async (dep: string) => {
      const requestId = await this.resolveUrl(dep, id);
      return this.dependencyRequest(requestId, callstack);
    };

    if (externalize) {
      const exports = await this.interopedImport(externalize);
      mod.exports = exports;
      return exports;
    }

    const { href } = pathToFileURL(id);
    const meta = { url: href };
    const exports = Object.create(null);

    // this prosxy is triggered only on exports.{name} and module.exports access
    const cjsExports = new Proxy(exports, {
      set: (_, p, value) => {
        // treat "module.exports =" the same as "exports.default =" to not have nested "default.default",
        // so "exports.default" becomes the actual module
        if (p === 'default' && this.shouldInterop(id, { default: value })) {
          exportAll(cjsExports, value);
          exports.default = value;
          return true;
        }

        if (!Reflect.has(exports, 'default')) exports.default = {};

        // returns undefined, when accessing named exports, if default is not an object
        // but is still present inside hasOwnKeys, this is Node behaviour for CJS
        if (isPrimitive(exports.default)) {
          defineExport(exports, p, () => undefined);
          return true;
        }

        exports.default[p] = value;
        if (p !== 'default') defineExport(exports, p, () => value);

        return true;
      },
    });

    Object.assign(mod, { code: transformed, exports });
    const __filename = fileURLToPath(href);
    const moduleProxy = {
      set exports(value) {
        exportAll(cjsExports, value);
        exports.default = value;
      },
      get exports() {
        return cjsExports;
      },
    };

    const context = {
      // esm transformed by ice
      __ssr_import__: request,
      __ssr_dynamic_import__: request,
      __ssr_exports__: exports,
      __ssr_exportAll__: (obj: any) => exportAll(exports, obj),
      __ssr_import_meta__: meta,

      // cjs compact
      require: createRequire(href),
      exports: cjsExports,
      module: moduleProxy,
      __filename,
      __dirname: path.dirname(__filename),
    };

    if (transformed[0] === '#') transformed = transformed.replace(/^\#\!.*/, s => ' '.repeat(s.length));

    // add 'use strict' since ESM enables it by default
    const codeDefinition = `'use strict';async (${Object.keys(context).join(',')})=>{{`;
    const code = `${codeDefinition}${transformed}\n}}`;
    const fn = vm.runInThisContext(code, {
      filename: __filename,
      lineOffset: 0,
      columnOffset: -codeDefinition.length,
    });

    await fn(...Object.values(context));

    return exports;
  }

  shouldInterop(path: string, mod: any) {
    if (this.options.interopDefault === false) {
      return false;
    }
    return !path.endsWith('.mjs') && 'default' in mod;
  }

  async interopedImport(id: string) {
    const importedModule = await import(id);
    if (!this.shouldInterop(id, importedModule)) {
      return importedModule;
    }
    const { mod, defaultExport } = interopModule(importedModule);
    return new Proxy(mod, {
      get(mod, prop) {
        if (prop === 'default') return defaultExport;
        return mod[prop] ?? defaultExport?.[prop];
      },
      has(mod, prop) {
        if (prop === 'default') return defaultExport !== undefined;
        return prop in mod || (defaultExport && prop in defaultExport);
      },
      getOwnPropertyDescriptor(mod, prop) {
        const descriptor = Reflect.getOwnPropertyDescriptor(mod, prop);
        if (descriptor) return descriptor;
        if (prop === 'default' && defaultExport !== undefined) {
          return {
            value: defaultExport,
            enumerable: true,
            configurable: true,
          };
        }
      },
    });
  }
}

function isPrimitive(v: any) {
  return v !== Object(v);
}

function interopModule(mod: any) {
  if (isPrimitive(mod)) {
    return {
      mod: { default: mod },
      defaultExport: mod,
    };
  }

  let defaultExport = 'default' in mod ? mod.default : mod;

  if (!isPrimitive(defaultExport) && '__esModule' in defaultExport) {
    mod = defaultExport;
    if ('default' in defaultExport) defaultExport = defaultExport.default;
  }

  return { mod, defaultExport };
}

function defineExport(exports: any, key: string | symbol, value: () => any) {
  Object.defineProperty(exports, key, {
    enumerable: true,
    configurable: true,
    get: value,
  });
}

function exportAll(exports: any, sourceModule: any) {
  if (exports === sourceModule) return;

  if (isPrimitive(sourceModule) || Array.isArray(sourceModule)) return;

  for (const key in sourceModule) {
    if (key !== 'default') {
      try {
        defineExport(exports, key, () => sourceModule[key]);
      } catch (_err) { }
    }
  }
}

function slash(str: string) {
  return str.replace(/\\/g, '/');
}

