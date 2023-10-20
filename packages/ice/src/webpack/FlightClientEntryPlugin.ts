import { join, isAbsolute, relative, sep } from 'path';
import { stringify } from 'querystring';
import { asyncLib, acorn } from '@ice/bundles';
import webpack from '@ice/bundles/compiled/webpack/index.js';
import NullDependency from '@ice/bundles/compiled/webpack/NullDependency.js';
import ModuleDependency from '@ice/bundles/compiled/webpack/ModuleDependency.js';
import type { Compiler, Compilation } from 'webpack';
import { createComponentName } from '@ice/route-manifest';

export function formatPath(pathStr) {
    return process.platform === 'win32' ? pathStr.split(sep).join('/') : pathStr;
}

const PLUGIN_NAME = 'FlightClientEntryPlugin';

interface ClientReferenceSearchPath {
  directory: string;
  recursive?: boolean;
  include: RegExp;
  exclude?: RegExp;
}

interface Options {
  rootDir: string;
  clientReferences?: ClientReferenceSearchPath[];
}

class ClientReferenceDependency extends ModuleDependency {
  userRequest: string;
  request: string;

  constructor(request: string) {
    super(request);
    this.request = request;
  }
  get type(): string {
    return 'client-reference';
  }
}

export class FlightClientEntryPlugin {
  clientReferences: ClientReferenceSearchPath[];
  clientFiles = new Set();
  pageDir: string;

  constructor(options: Options) {
    this.pageDir = join(options.rootDir, 'src', 'pages');

    if (options.clientReferences) {
      this.clientReferences = options.clientReferences;
    } else {
      this.clientReferences = [
        {
          directory: '.',
          recursive: true,
          include: /\.(js|ts|jsx|tsx)$/,
          exclude: /types.ts|.d.ts|node_modules/,
        },
      ];
    }
  }

  apply(compiler: Compiler) {
    const _this = this;

    compiler.hooks.thisCompilation.tap(PLUGIN_NAME, (compilation, { normalModuleFactory }) => {
      // @ts-expect-error TODO: add types for ModuleDependency.
      compilation.dependencyFactories.set(ClientReferenceDependency, normalModuleFactory);
      // @ts-expect-error TODO: add types for ModuleDependency.
      compilation.dependencyTemplates.set(ClientReferenceDependency, new NullDependency.Template());
    });

    compiler.hooks.beforeCompile.tapAsync(PLUGIN_NAME, ({ contextModuleFactory }, callback) => {
      const contextResolver = compiler.resolverFactory.get('context', {});
      const normalResolver = compiler.resolverFactory.get('normal');

      _this.resolveClientFiles(
        compiler.context,
        contextResolver,
        normalResolver,
        compiler.inputFileSystem,
        contextModuleFactory,
        (err, resolvedClientRefs) => {
          if (err) {
            callback(err);
            return;
          }
          resolvedClientRefs.forEach(dep => {
            _this.clientFiles.add(dep.request);
          });

          callback();
        },
      );
    });

    compiler.hooks.finishMake.tapPromise(PLUGIN_NAME, (compilation) =>
      _this.createClientEntries(compiler, compilation),
    );

    compiler.hooks.make.tap(PLUGIN_NAME, (compilation) => {
      compilation.hooks.processAssets.tap({
        name: PLUGIN_NAME,
        stage: webpack.Compilation.PROCESS_ASSETS_STAGE_PRE_PROCESS,
      }, () => {
        compilation.chunks.forEach((chunk) => {
          if (chunk.name === 'route' || chunk.runtime === 'route') {
            chunk.files.forEach((file) => {
              delete compilation.assets[file];
            });
          }
        });
      });
    });
  }

  async createClientEntries(compiler: Compiler, compilation: Compilation) {
    const addClientEntryList = [];

    for (const [name, entry] of compilation.entries.entries()) {
      if (name === 'main') {
        continue;
      }

      const entryDependency = entry.dependencies?.[0];
      if (!entryDependency) {
        continue;
      }

      const entryModule = compilation.moduleGraph.getResolvedModule(entryDependency);
      for (const connection of compilation.moduleGraph.getOutgoingConnections(entryModule)) {
        const entryRequest = (connection.dependency as any).request;

        if (entryRequest.indexOf('@/pages/') === -1) continue;

        const { clientComponentImports, CSSImports } = this.collectComponentInfoFromDependency({
          compilation,
          resolvedModule: connection.resolvedModule,
        });

        if (clientComponentImports.length || CSSImports.length) {
          const injected = this.injectClientEntry({
            compiler,
            compilation,
            // @ts-ignore
            bundlePath: connection.resolvedModule?.resource,
            clientImports: [
              ...clientComponentImports,
              ...CSSImports,
            ],
          });

          addClientEntryList.push(injected);
        }
      }
    }

    await Promise.all(addClientEntryList);
  }

  injectClientEntry({ compiler, compilation, bundlePath, clientImports }) {
    const clientLoader = `flight-client-entry-loader?${stringify({
      modules: clientImports,
    })}!`;

    const componentName = createComponentName(formatPath(relative(this.pageDir, bundlePath)));
    const name = `rsc_${componentName}`;
    const clientComponentEntryDep = webpack.EntryPlugin.createDependency(clientLoader, {
      name,
    });

    return new Promise<void>((resolve, reject) => {
      compilation.addEntry(compiler.context, clientComponentEntryDep, { name, dependOn: ['main'] }, (err) => {
        if (err) {
          reject(err);
        }

        resolve();
      });
    });
  }

  collectComponentInfoFromDependency({ compilation, resolvedModule }) {
    // Keep track of checked modules to avoid infinite loops with recursive imports.
    const visited = new Set();
    // Info to collect.
    const clientComponentImports = [];
    const CSSImports = [];

    const filterClientComponents = (mod) => {
      if (!mod) return;

      const modRequest: string | undefined = mod.resourceResolveData?.path + mod.resourceResolveData?.query;

      if (!modRequest || visited.has(modRequest)) return;
      visited.add(modRequest);

      const isCSS = isCSSMod(mod);

      if (isCSS) {
        CSSImports.push(modRequest);
      }

      if (this.isClientComponentEntryModule(mod)) {
        clientComponentImports.push(modRequest);
        return;
      }

      compilation.moduleGraph.getOutgoingConnections(mod).forEach((connection) => {
        filterClientComponents(connection.resolvedModule);
      });
    };

    // Traverse the module graph to find all client components.
    filterClientComponents(resolvedModule);

    return {
      clientComponentImports,
      CSSImports,
    };
  }

  isClientComponentEntryModule(mod) {
    if (this.clientFiles.has(mod.resource)) {
      return true;
    }

    return false;
  }

  resolveClientFiles(
    context: string,
    contenxtResolver: ReturnType<Compiler['resolverFactory']['get']>,
    normalResolver: ReturnType<Compiler['resolverFactory']['get']>,
    fs: Compilation['inputFileSystem'],
    contextModuleFactory: Compilation['params']['contextModuleFactory'],
    callback: (err: Error | null, files?: ClientReferenceDependency[]) => void,
  ) {
    function hasUseClientDirective(source: string): boolean {
      if (source.indexOf('use client') === -1) {
        return false;
      }
      let body;
      try {
        // TODO: check client directive by comment injected by swc plugin.
        body = acorn.parse(source, {
          ecmaVersion: '2024',
          sourceType: 'module',
        }).body;
      } catch (x) {
        return false;
      }
      for (let i = 0; i < body.length; i++) {
        const node = body[i];
        if (node.type !== 'ExpressionStatement' || !node.directive) {
          break;
        }
        if (node.directive === 'use client') {
          return true;
        }
      }
      return false;
    }
    asyncLib.map(this.clientReferences, (
      clientReference: ClientReferenceSearchPath,
      cb: (err: null | Error, result?: ClientReferenceDependency[]) => void,
    ) => {
      contenxtResolver.resolve({}, context, clientReference.directory, {}, (err, resolvedDirectory) => {
        if (err) return cb(err);
        const options = {
          resource: resolvedDirectory,
          resourceQuery: '',
          recursive:
          clientReference.recursive === undefined
            ? true
            : clientReference.recursive,
          regExp: clientReference.include,
          include: undefined,
          exclude: clientReference.exclude,
        };
        // @ts-expect-error TODO: add types for resolveDependencies options.
        contextModuleFactory.resolveDependencies(fs, options, (err, dependencies) => {
          if (err) return cb(err);
          const clientRefDeps = dependencies.map(dep => {
            // Use userRequest instead of request. request always end with undefined which is wrong.
            const request = join(resolvedDirectory as string, dep.userRequest);
            const clientRefDep = new ClientReferenceDependency(request);
            clientRefDep.userRequest = dep.userRequest;
            return clientRefDep;
          });
          asyncLib.filter(
            clientRefDeps,
            (dep: ClientReferenceDependency, filterCb: (err: null | Error, truthValue: boolean) => void,
          ) => {
            normalResolver.resolve(
              {},
              context,
              dep.request,
              {},
              (err: null | Error, resolvedPath: any) => {
                if (err || typeof resolvedPath !== 'string') {
                  return filterCb(null, false);
                }

                fs.readFile(
                  resolvedPath,
                  'utf-8',
                  // @ts-expect-error
                  (err: null | Error, content: string) => {
                    if (err || typeof content !== 'string') {
                      return filterCb(null, false);
                    }
                    const useClient = hasUseClientDirective(content);
                    filterCb(null, useClient);
                  },
                );
              },
            );
          }, cb);
        });
      });
    }, (
      err: null | Error,
      result: ClientReferenceDependency[],
    ) => {
      if (err) return callback(err);
      const flat: ClientReferenceDependency[] = [];
      for (let i = 0; i < result.length; i++) {
        flat.push.apply(flat, result[i]);
      }
      callback(null, flat);
    });
  }
}

const regexCSS = /\.(css|scss|sass)(\?.*)?$/;
function isCSSMod(mod) {
  return mod.resource && regexCSS.test(mod.resource);
}