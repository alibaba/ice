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

      const imports: string[] = [];
      const maps: string[] = [];
      const modules = {};
      let index = 0;

      const CSSRegex = /\.(css|sass|scss)$/;

      Object.keys(serverManifest).map(router => {
        const moduleMap = serverManifest[router];
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
