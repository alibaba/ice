import type { PluginBuild } from 'esbuild';
import type { AssetsManifest } from '@ice/runtime/types';

interface CompilationInfo {
  assetsManifest?: AssetsManifest;
  rscManifest?: any;
  rscServerManifest?: any;
}

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
      const serverManifest = manifest?.rscServerManifest || {};

      const imports = [];
      const maps = [];
      const modules = {};

      Object.keys(serverManifest).map(router => {
        const moduleMap = serverManifest[router];
        Object.keys(moduleMap).map((moduleId, index) => {
          if (modules[moduleId] || moduleId.indexOf('.css') > -1) return;

          modules[moduleId] = true;
          const { id } = moduleMap[moduleId]['*'];
          imports.push(`import * as component_${router}_${index} from "(rsc)${id}";`);
          maps.push(`"${id}": component_${router}_${index}`);
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
