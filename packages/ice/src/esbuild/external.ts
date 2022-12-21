import path from 'path';
import type { Plugin, PluginBuild, BuildOptions } from 'esbuild';
import isExternalBuiltinDep from '../utils/isExternalBuiltinDep.js';

interface PluginOptions {
  externalDependencies: boolean;
  format: BuildOptions['format'];
  externals?: string[];
}

const externalPlugin = (options: PluginOptions): Plugin => {
  const { externalDependencies, format, externals } = options;
  return {
    name: 'esbuild-external',
    setup(build: PluginBuild) {
      build.onResolve({ filter: /.*/ }, (args) => {
        const id = args.path;
        // Custom external rule by userConfig.server.externals.
        const external = shouldExternal(id, externals);
        if (external) {
          return {
            path: id,
            external: true,
          };
        }

        // External ids which is third-party dependencies.
        if (id[0] !== '.' && !path.isAbsolute(id) && externalDependencies && isExternalBuiltinDep(id, format)) {
          return {
            external: true,
          };
        }
      });
    },
  };
};

function shouldExternal(id: string, externals?: string[]) {
  if (!externals) {
    return;
  }

  return externals.find(regexStr => {
    return new RegExp(regexStr).test(id);
  });
}

export default externalPlugin;
