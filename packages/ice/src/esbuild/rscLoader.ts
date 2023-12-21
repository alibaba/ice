import type { PluginBuild } from 'esbuild';
import type { AssetsManifest, ClientManifest, SSRModuleMapping } from '@ice/runtime/types';

interface CompilationInfo {
  assetsManifest?: AssetsManifest;
  reactClientManifest?: ClientManifest;
  reactSSRModuleMapping?: SSRModuleMapping;
}

// Import client component modules for ssr.
const RscLoaderPlugin = (compilationInfo: CompilationInfo | (() => CompilationInfo)) => ({
  name: 'esbuild-rsc-loader',
  setup(build: PluginBuild) {
    build.onResolve({ filter: /react-ssr-module-mapping.json$/ }, (args) => {
      if (args.path === 'virtual-rsc-module:react-ssr-module-mapping.json') {
        return {
          path: args.path,
          namespace: 'virtual-rsc-module',
        };
      }
    });

    build.onLoad({ filter: /.*/, namespace: 'virtual-rsc-module' }, () => {
      const manifest = typeof compilationInfo === 'function' ? compilationInfo() : compilationInfo;
      const ssrManifest = manifest?.reactSSRModuleMapping || {};

      const imports: string[] = [];
      const maps: string[] = [];
      const modules = {};
      let index = 0;

      const CSSRegex = /\.(css|sass|scss)$/;

      Object.keys(ssrManifest).map(router => {
        const moduleMap = ssrManifest[router];
        Object.keys(moduleMap).map((moduleId) => {
          const id = moduleMap[moduleId]['*'].id as string;
          if (modules[id] || CSSRegex.test(id)) return;
          modules[id] = true;
          index++;
          imports.push(`import * as component_${index} from "(rsc)${id}";`);
          maps.push(`"${id}": component_${index}`);
        });
      });

      const contents = `
        ${imports.join('\n')};

        const clientModules = {
          ${maps.join(',\n')}
        }

        export default clientModules;
      `;

      return {
        contents: contents,
        loader: 'tsx',
      };
    });
  },
});

export default RscLoaderPlugin;
