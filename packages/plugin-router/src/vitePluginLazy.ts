import { transformSync } from '@builder/pack/deps/@babel/core';
import { Plugin } from 'vite';

const vitePluginLazy = (routesPath: string): Plugin => {
  const routesRegExp = /src\/routes\.(j|t)s(x)?$/;

  return {
    name: 'vite-plugin-lazy',
    enforce: 'pre',
    transform(code, id) {
      if (!id.match(routesRegExp)) {
        return;
      }
      const parserPlugins = [
        'jsx',
        'importMeta',
        'topLevelAwait',
        'classProperties',
        'classPrivateMethods',
      ];

      if (/\.tsx?$/.test(id)) {
        // when routes file is a typescript file,
        // add ts parser plugins
        parserPlugins.push('typescript');
        parserPlugins.push('decorators-legacy');  // allowing decorators by default
      }
      const result = transformSync(code, {
        babelrc: false,
        configFile: false,
        filename: id,
        parserOpts: {
          sourceType: 'module',
          allowAwaitOutsideFunction: true,
          plugins: parserPlugins,
        },
        generatorOpts: {
          decoratorsBeforeExport: true
        },
        plugins: [
          [require.resolve('./babelPluginLazy'), { routesPath }]
        ],
        sourceFileName: id,
      });

      return result;
    }
  };
};

export default vitePluginLazy;
