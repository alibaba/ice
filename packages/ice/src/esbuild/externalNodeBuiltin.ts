import { isNodeBuiltin } from 'mlly';
import type { Plugin, PluginBuild } from 'esbuild';

const externalBuiltinPlugin = (): Plugin => {
  return {
    name: 'esbuild-external-node-builtin',
    setup(build: PluginBuild) {
      build.onResolve({ filter: /.*/ }, (args) => {
        const id = args.path;
        if (isNodeBuiltin(id)) {
          return { path: id, external: true };
        }
      });
    },
  };
};

export default externalBuiltinPlugin;
