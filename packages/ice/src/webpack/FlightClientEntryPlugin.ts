import * as path from 'path';
import querystring from 'querystring';
import webpack from '@ice/bundles/compiled/webpack/index.js';
import type { Compiler, Compilation } from 'webpack';

const PLUGIN_NAME = 'FlightClientEntryPlugin';

export class FlightClientEntryPlugin {
  constructor() {
  }

  apply(compiler: Compiler) {
    compiler.hooks.finishMake.tapPromise(PLUGIN_NAME, (compilation) =>
      this.createClientEntries(compiler, compilation),
    );
  }

  async createClientEntries(compiler: Compiler, compilation: Compilation) {
    const addClientEntryAndSSRModulesList = [];

    for (const [name, entry] of compilation.entries.entries()) {
      if (name === 'main') {
        continue;
      }

      const clientEntriesToInject = new Set();

      let _entry_dependencies;
      const entryDependency = (_entry_dependencies = entry.dependencies) == null ? void 0 : _entry_dependencies[0];
      let entryModule = compilation.moduleGraph.getResolvedModule(entryDependency);

      for (const connection of compilation.moduleGraph.getOutgoingConnections(entryModule)) {
        // @ts-ignore
        const entryRequest = connection.dependency.request;

        const result = this.collectComponentInfoFromServerEntryDependency({
          entryRequest,
          compilation,
          resolvedModule: connection.resolvedModule,
        });

        if (result && result.length > 0) {
          result.forEach((value) => clientEntriesToInject.add(value));
        }
      }

      if (clientEntriesToInject.size) {
        const injected = this.injectClientEntryAndSSRModules({
          compiler,
          compilation,
          entryName: name,
          clientImports: clientEntriesToInject,
        });
        addClientEntryAndSSRModulesList.push(injected);
      }
    }

    await Promise.all(addClientEntryAndSSRModulesList);
  }

  injectClientEntryAndSSRModules({ compiler, compilation, entryName, clientImports }) {
    // @ts-ignore
    const clientLoader = `flight-client-entry-loader?${querystring.stringify({
      modules: [...clientImports],
    })}!`;

    console.log(clientLoader);

    const clientComponentEntryDep = webpack.EntryPlugin.createDependency(clientLoader, {
      name: `rsc@${entryName}`,
    });

    // const block = new webpack.AsyncDependenciesBlock(
    //   {
    //     name: 'about_chunk',
    //   },
    //   null,
    //   clientLoader,
    // );
    // // @ts-expect-error TODO: add types for ModuleDependency.
    // block.addDependency(clientLoader);

    // const entry = compilation.entries.get('main');
    // let entryModule = compilation.moduleGraph.getResolvedModule(entry.dependencies[0]);
    // entryModule.addBlock(block);

    return new Promise<void>((resolve, reject) => {
      compilation.addEntry(compiler.context, clientComponentEntryDep, { name: `rsc@${entryName}`, dependOn: ['main'] }, (err) => {
        if (err) {
          console.error(err);
          reject(err);
        }
        resolve();
      });

    //   compilation.addModuleTree({
    //     context: compiler.context,
    //     dependency: clientComponentEntryDep,
    // }, (err, module)=>{
    //     if (err) {
    //         compilation.hooks.failedEntry.call(clientComponentEntryDep, {}, err);
    //         return reject(err);
    //     }
    //     console.log('after add entry ----');
    //     console.log(compilation.entries)
    //     compilation.hooks.succeedEntry.call(clientComponentEntryDep, {}, module);
    //     return resolve(module);
    // });
    });
  }

  collectComponentInfoFromServerEntryDependency({ entryRequest, compilation, resolvedModule }) {
    // Keep track of checked modules to avoid infinite loops with recursive imports.
    const visited = new Set();
    // Info to collect.
    const result = [];
    const filterClientComponents = (mod) => {
        let _mod_resourceResolveData,
_mod_resourceResolveData1;
        if (!mod) return;
        const isCSS = isCSSMod(mod);
        // We have to always use the resolved request here to make sure the
        // server and client are using the same module path (required by RSC), as
        // the server compiler and client compiler have different resolve configs.
        let modRequest = ((_mod_resourceResolveData = mod.resourceResolveData) == null ? void 0 : _mod_resourceResolveData.path) + ((_mod_resourceResolveData1 = mod.resourceResolveData) == null ? void 0 : _mod_resourceResolveData1.query);
        // Context modules don't have a resource path, we use the identifier instead.
        if (mod.constructor.name === 'ContextModule') {
            modRequest = mod._identifier;
        }
        if (!modRequest || visited.has(modRequest)) return;
        visited.add(modRequest);
        if (isCSS) {
          result.push(modRequest);
        }
        if (isClientComponentEntryModule(mod)) {
          result.push(modRequest);
          return;
        }
        compilation.moduleGraph.getOutgoingConnections(mod).forEach((connection) => {
            filterClientComponents(connection.resolvedModule);
        });
    };
    // Traverse the module graph to find all client components.
    filterClientComponents(resolvedModule);
    return result;
  }
}

const regexCSS = /\.(css|scss|sass)(\?.*)?$/;
function isCSSMod(mod) {
  return mod.resource && regexCSS.test(mod.resource);
}

function isClientComponentEntryModule(mod) {
  return mod.resource && mod.resource.indexOf('.client.tsx') > -1;
}