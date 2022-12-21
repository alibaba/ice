import type { Plugin, PluginBuild } from 'esbuild';

/**
 * set the CSS file(but not the css modules) content to empty.
 * In ssr, we don't need the css.
 */
const emptyCSSPlugin = (): Plugin => {
  return {
    name: 'esbuild-empty-css',
    setup: async (build: PluginBuild) => {
      build.onResolve({ filter: /\.(css|sass|scss|less)$/ }, (args) => {
        // golang not support the following regexp, we use javascript to determine again
        if (/(?<!.module)\.(css|sass|scss|less)$/.test(args.path)) {
          return {
            path: args.path,
            namespace: 'empty-css-content',
          };
        }
      });

      build.onLoad({ filter: /.*/, namespace: 'empty-css-content' }, () => {
        return {
          contents: '',
        };
      });
    },
  };
};

export default emptyCSSPlugin;
