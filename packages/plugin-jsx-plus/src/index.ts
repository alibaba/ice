import path from 'path';
import { createRequire } from 'module';
import type { Plugin } from '@ice/types';
import { transformSync } from '@babel/core';

const require = createRequire(import.meta.url);
const runtimePackage = 'babel-runtime-jsx-plus';
const runtimePackagePath = require.resolve(runtimePackage);

const babelPlugins = [
  'babel-plugin-transform-jsx-list',
  'babel-plugin-transform-jsx-condition',
  'babel-plugin-transform-jsx-memo',
  'babel-plugin-transform-jsx-slot',
  ['babel-plugin-transform-jsx-fragment', { moduleName: 'react' }],
  'babel-plugin-transform-jsx-class',
];

const babelTransformOptions = {
  babelrc: false,
  configFile: false,
  parserOpts: {
    sourceType: 'module',
    allowAwaitOutsideFunction: true,
    // ts syntax had already been transformed by swc plugin.
    plugins: [
      'jsx',
      'importMeta',
      'topLevelAwait',
      'classProperties',
      'classPrivateMethods',
    ],
    generatorOpts: {
      decoratorsBeforeExport: true,
    },
  },
  plugins: [],
};

babelPlugins.forEach((plugin) => {
  if (typeof plugin === 'string') {
    babelTransformOptions.plugins.push(require.resolve(plugin));
  } else if (Array.isArray(plugin)) {
    const pluginName = plugin[0] as string;
    const pluginOption = plugin[1];
    babelTransformOptions.plugins.push([require.resolve(pluginName), pluginOption]);
  }
});

export function idFilter(options: JSXPlusOptions, id: string): boolean {
  const extFilter = (id) => options.extensions.some((ext) => id.endsWith(ext));

  if (options.exclude) {
    for (const pattern of options.exclude) {
      if (typeof pattern === 'string') {
        if (id.indexOf(pattern) > -1) {
          return false;
        }
      } else if (pattern instanceof RegExp && pattern.test(id)) {
        return false;
      }
    }
  }

  if (options.include) {
    for (const pattern of options.include) {
      if (typeof pattern === 'string') {
        if (id.indexOf(pattern) > -1) {
          return extFilter(id);
        }
      } else if (pattern instanceof RegExp && pattern.test(id)) {
        return extFilter(id);
      }
    }
  }

  return false;
}

export interface JSXPlusOptions {
  include?: (string | RegExp)[];
  exclude?: (string | RegExp)[];
  extensions?: string[];
}

const plugin: Plugin<JSXPlusOptions> = (options: JSXPlusOptions = {}) => ({
  name: '@ice/plugin-jsx-plus',
  setup: ({ onGetConfig, context }) => {
    // Default include all files in `src`.
    if (!options.include) {
      const sourceDir = path.join(context.rootDir, 'src');
      options.include = [sourceDir];
    }

    // Default include all files with `.tsx` and `.jsx` extensions.
    if (!options.extensions) {
      options.extensions = ['.tsx', '.jsx'];
    }

    function jsxPlusTransformer(source, id) {
      if (idFilter(options, id)) {
        try {
          const options = Object.assign({
            filename: id,
            sourceFileName: id,
          }, babelTransformOptions);
          if (/\.tsx?$/.test(id)) {
            // When routes file is a typescript file, add ts parser plugins.
            options.parserOpts.plugins.push('typescript');
            options.parserOpts.plugins.push('decorators-legacy'); // allowing decorators by default
          }

          const { code, map } = transformSync(source, options);
          return { code, map };
        } catch (compileError) {
          console.error(compileError);
          return { code: source, map: null };
        }
      }
      return { code: source, map: null };
    }

    onGetConfig((config) => {
      // Add runtime alias.
      if (!config.alias) {
        config.alias = {};
      }
      config.alias[runtimePackage] = runtimePackagePath;

      // Apply babel jsx plus transformer.
      if (!config.transforms) {
        config.transforms = [];
      }
      config.transforms.push(jsxPlusTransformer);
    });
  },
});

export default plugin;
