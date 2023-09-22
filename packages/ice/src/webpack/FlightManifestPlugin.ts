// Fork form https://github.com/facebook/react/blob/main/packages/react-server-dom-webpack/src/ReactFlightWebpackPlugin.js
// Add special handling for ice.js when enable RSC.
import * as path from 'path';
import { asyncLib, acorn } from '@ice/bundles';
import ModuleDependency from '@ice/bundles/compiled/webpack/ModuleDependency.js';
import NullDependency from '@ice/bundles/compiled/webpack/NullDependency.js';
import webpack from '@ice/bundles/compiled/webpack/index.js';
import type { Compiler, Compilation } from 'webpack';

const PLUGIN_NAME = 'FlightManifestPlugin';

interface ClientReferenceSearchPath {
  directory: string;
  recursive?: boolean;
  include: RegExp;
  exclude?: RegExp;
}

interface Options {
  clientReferences?: ClientReferenceSearchPath[];
  chunkName?: string;
  clientManifestFilename?: string;
  ssrManifestFilename?: string;
}

interface SSRExports {
  [chunkName: string]: { specifier: string; name: string };
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
// Webpack template utils of toPath.
const PATH_NAME_NORMALIZE_REPLACE_REGEX = /[^a-zA-Z0-9_!§$()=\-^°]+/g;
const MATCH_PADDED_HYPHENS_REPLACE_REGEX = /^-|-$/g;
const toPath = (str: any) => {
  if (typeof str !== 'string') return '';
  return str
    .replace(PATH_NAME_NORMALIZE_REPLACE_REGEX, '-')
    .replace(MATCH_PADDED_HYPHENS_REPLACE_REGEX, '');
};

export class FlightManifestPlugin {
  clientReferences: ClientReferenceSearchPath[];
  chunkName?: string;
  clientManifestFilename?: string;
  ssrManifestFilename?: string;

  constructor(options: Options = {}) {
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
    if (typeof options.chunkName === 'string') {
      this.chunkName = options.chunkName;
      if (!/\[(index|request)\]/.test(this.chunkName)) {
        this.chunkName += '[index]';
      }
    } else {
      this.chunkName = 'client[index]';
    }
    this.clientManifestFilename =
      options.clientManifestFilename || 'react-client-manifest.json';
    this.ssrManifestFilename =
      options.ssrManifestFilename || 'react-ssr-manifest.json';
  }

  apply(compiler: Compiler) {
    const _this = this;
    let resolvedClientReferences: ClientReferenceDependency[];
    let clientFileNameFound = false;

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
          resolvedClientReferences = resolvedClientRefs;
          callback();
        },
      );
    });

    compiler.hooks.thisCompilation.tap(PLUGIN_NAME, (compilation, { normalModuleFactory }) => {
      // @ts-expect-error TODO: add types for ModuleDependency.
      compilation.dependencyFactories.set(ClientReferenceDependency, normalModuleFactory);
      // @ts-expect-error TODO: add types for ModuleDependency.
      compilation.dependencyTemplates.set(ClientReferenceDependency, new NullDependency.Template());

      const handler = (parser) => {
        parser.hooks.program.tap(PLUGIN_NAME, () => {
          const { module } = parser.state;
          if (!module.resource.includes('react-server-dom-webpack/client.browser')) {
            return;
          }
          clientFileNameFound = true;
          if (resolvedClientReferences) {
            if (resolvedClientReferences) {
              for (let i = 0; i < resolvedClientReferences.length; i++) {
                const dep = resolvedClientReferences[i];

                const chunkName = _this.chunkName
                  .replace(/\[index\]/g, `${i}`)
                  .replace(/\[request\]/g, toPath(dep.userRequest));

                const block = new webpack.AsyncDependenciesBlock(
                  {
                    name: chunkName,
                  },
                  null,
                  dep.request,
                );
                // @ts-expect-error TODO: add types for ModuleDependency.
                block.addDependency(dep);
                module.addBlock(block);
              }
            }
          }
        });
      };

      normalModuleFactory.hooks.parser.for('javascript/auto').tap('HarmonyModulesPlugin', handler);
      normalModuleFactory.hooks.parser.for('javascript/esm').tap('HarmonyModulesPlugin', handler);
      normalModuleFactory.hooks.parser.for('javascript/dynamic').tap('HarmonyModulesPlugin', handler);
    });

    compiler.hooks.make.tap(PLUGIN_NAME, (compilation) => {
      compilation.hooks.processAssets.tap({
        name: PLUGIN_NAME,
        stage: webpack.Compilation.PROCESS_ASSETS_STAGE_REPORT,
      }, () => {
        if (clientFileNameFound === false) {
          compilation.warnings.push(
            // @ts-expect-error mismatch import path of webpack.
            new webpack.WebpackError(
              `Client runtime at 'react-server-dom-webpack/client' was not found. React Server Components module map file ${_this.clientManifestFilename} was not created.`,
            ),
          );
          return;
        }

        const resolveClientFiles = new Set((resolvedClientReferences || []).map((dep) => dep.request));
        const clientManifest: { [key: string]: {
          chunks: (string | number)[];
          id: string | number;
          name: string;
        };} = {};
        const ssrManifest: {
          [key: string]: SSRExports;
        } = {};

        compilation.chunkGroups.forEach((chunkGroup) => {
          const chunkIds = chunkGroup.chunks.map((chunk) => chunk.id);
          const recordModule = (id: string | number, module: any) => {
            if (!resolveClientFiles.has(module.resource)) {
              return;
            }
            // const modId = path.relative(compiler.context, module.resource);
            const modId = module.resource;
            if (modId !== undefined) {
              clientManifest[modId] = {
                id,
                chunks: chunkIds,
                name: '*',
              };
              // TODO: If this module ends up split into multiple modules, then
              // we should encode each the chunks needed for the specific export.
              // When the module isn't split, it doesn't matter and we can just
              // encode the id of the whole module. This code doesn't currently
              // deal with module splitting so is likely broken from ESM anyway.
              ssrManifest[id] = {
                '*': {
                  specifier: modId,
                  name: '*',
                },
              };
            }
          };

          chunkGroup.chunks.forEach((chunk) => {
            const chunkModules = compilation.chunkGraph.getChunkModulesIterable(chunk);
            [...chunkModules].forEach((module) => {
              const moduleId = compilation.chunkGraph.getModuleId(module);
              recordModule(moduleId, module);
              // If this is a concatenation, register each child to the parent ID.
              // @ts-expect-error
              if (module.modules) {
                // @ts-expect-error
                module.modules.forEach(concatenatedMod => {
                  recordModule(moduleId, concatenatedMod);
                });
              }
            });
          });
        });
        const clientOutput = JSON.stringify(clientManifest, null, 2);
        compilation.emitAsset(
          _this.clientManifestFilename,
          new webpack.sources.RawSource(clientOutput, false),
        );
        const ssrOutput = JSON.stringify(ssrManifest, null, 2);
        compilation.emitAsset(
          _this.ssrManifestFilename,
          new webpack.sources.RawSource(ssrOutput, false),
        );
      });
    });
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
            const request = path.join(resolvedDirectory as string, dep.userRequest);
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
