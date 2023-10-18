import * as path from 'path';
import { stringify } from 'querystring';
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
          console.log(name, entryRequest, clientComponentImports, CSSImports);

          const injected = this.injectClientEntry({
            compiler,
            compilation,
            bundlePath: entryRequest,
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

    const name = `rsc${bundlePath}`;
    const clientComponentEntryDep = webpack.EntryPlugin.createDependency(clientLoader, {
      name,
    });

    return new Promise<void>((resolve, reject) => {
      compilation.addEntry(compiler.context, clientComponentEntryDep, { name, dependOn: ['main'] }, (err) => {
        if (err) {
          console.error(err);
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

      if (isClientComponentEntryModule(mod)) {
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
}

const regexCSS = /\.(css|scss|sass)(\?.*)?$/;
function isCSSMod(mod) {
  return mod.resource && regexCSS.test(mod.resource);
}

function isClientComponentEntryModule(mod) {
  return mod.resource && mod.resource.indexOf('.client.tsx') > -1;
}