import type { Plugin, PluginBuild } from 'esbuild';

interface IgnorePattern {
  resourceRegExp: RegExp;
  contextRegExp?: RegExp;
}

const igonrePlugin = (ignores: IgnorePattern[] = []): Plugin => {
  return {
    name: 'esbuild-ignore',
    setup(build: PluginBuild) {
      if (!Array.isArray(ignores)) {
        return;
      }

      for (const ignorePattern of ignores) {
        build.onResolve({ filter: ignorePattern.resourceRegExp }, args => {
          if (ignorePattern.contextRegExp) {
            if (args.resolveDir.match(ignorePattern.contextRegExp)) {
              return {
                path: args.path,
                namespace: 'ignore',
              };
            } else {
              return {
                path: args.path,
              };
            }
          }

          return {
            path: args.path,
            namespace: 'ignore',
          };
        });
      }

      build.onLoad({ filter: /.*/, namespace: 'ignore' }, async () => {
        return {
          contents: '',
        };
      });
    },
  };
};

export default igonrePlugin;
