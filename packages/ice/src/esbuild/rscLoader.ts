import type { PluginBuild } from 'esbuild';
import type { AssetsManifest } from '@ice/runtime/types';

interface CompilationInfo {
  assetsManifest?: AssetsManifest;
  reactClientManifest?: any;
  reactSSRManifest?: any;
}

// Import client component modules for ssr.
const RscLoaderPlugin = (compilationInfo: CompilationInfo | (() => CompilationInfo)) => ({
  name: 'esbuild-rsc-loader',
  setup(build: PluginBuild) {
    build.onResolve({ filter: /react-ssr-manifest.json$/ }, (args) => {
      if (args.path === 'virtual-rsc-module:react-ssr-manifest.json') {
        return {
          path: args.path,
          namespace: 'virtual-rsc-module',
        };
      }
    });

    build.onLoad({ filter: /.*/, namespace: 'virtual-rsc-module' }, () => {
      const manifest = typeof compilationInfo === 'function' ? compilationInfo() : compilationInfo;
      const ssrManifest = manifest?.reactSSRManifest || {};

      const imports: string[] = [];
      const maps: string[] = [];
      const modules = {};
      let index = 0;

      const CSSRegex = /\.(css|sass|scss)$/;

      Object.keys(ssrManifest).map(router => {
        const moduleMap = ssrManifest[router];
        Object.keys(moduleMap).map((moduleId) => {
          const { id } = moduleMap[moduleId]['*'];
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
