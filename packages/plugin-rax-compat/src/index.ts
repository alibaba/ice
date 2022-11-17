import fs from 'fs';
import path from 'path';
import { createRequire } from 'module';
import type { Plugin } from '@ice/app/esm/types';
import type { RuleSetRule } from 'webpack';
import consola from 'consola';
import merge from 'lodash.merge';
import { transformSync } from '@babel/core';
import styleSheetLoader from './transform-styles.js';

const require = createRequire(import.meta.url);

const jsRegex = /\.(jsx?|tsx?|mjs)$/;

const alias = {
  // Add rax compat packages.
  rax: require.resolve('rax-compat'),
  'rax-children': require.resolve('rax-compat/children'),
  'rax-clone-element': require.resolve('rax-compat/clone-element'),
  'rax-create-class': require.resolve('rax-compat/create-class'),
  'rax-create-factory': require.resolve('rax-compat/create-factory'),
  'rax-create-portal': require.resolve('rax-compat/create-portal'),
  'rax-find-dom-node': require.resolve('rax-compat/find-dom-node'),
  'rax-is-valid-element': require.resolve('rax-compat/is-valid-element'),
  'rax-unmount-component-at-node': require.resolve('rax-compat/unmount-component-at-node'),
};

const ruleSetStylesheet = {
  test: /\.css$/i,
  use: [
    {
      loader: require.resolve('stylesheet-loader'),
      options: {},
    },
  ],
};

const ruleSetStylesheetForLess = {
  test: /\.less$/i,
  use: [
    {
      loader: require.resolve('stylesheet-loader'),
      options: {},
    },
    {
      loader: require.resolve('@ice/bundles/compiled/less-loader'),
      options: {
        lessOptions: { javascriptEnabled: true },
      },
    },
  ],
};

let warnOnce = false;

export interface CompatRaxOptions {
  inlineStyle?: boolean;
}

const plugin: Plugin<CompatRaxOptions> = (options = {}) => ({
  name: '@ice/plugin-rax-compat',
  setup: ({ onGetConfig, context }) => {
    const { userConfig } = context;

    onGetConfig((config) => {
      // Reset jsc.transform.react.runtime to classic.
      config.swcOptions = merge(config.swcOptions || {}, {
        compilationConfig: {
          jsc: {
            transform: {
              react: {
                runtime: 'classic',
                pragma: 'createElement',
                pragmaFrag: 'Fragment',
              },
            },
          },
        },
      });

      if (!config.server) {
        config.server = {};
      }
      const originalOptions = config.server.buildOptions;
      config.server.buildOptions = (options) => ({
        ...(originalOptions ? originalOptions(options) : options),
        jsx: 'transform',
        jsxFactory: 'createElement',
        jsxFragment: 'Fragment',
      });

      Object.assign(config.alias, alias);

      if (options.inlineStyle) {
        if (!warnOnce) {
          consola.warn('Enabling inline style is not recommended.\n       It is recommended to use CSS modules (as default). Only allow old projects to migrate and use.');
          warnOnce = true;
        }

        if (userConfig.ssr || userConfig.ssg) {
          config.server.buildOptions = applyStylesheetLoaderForServer(config.server.buildOptions);
        }

        config.configureWebpack ??= [];
        config.configureWebpack.unshift(styleSheetLoaderForClient);
        config.transforms = [
          ...(config.transforms || []),
          getClassNameToStyleTransformer(userConfig.syntaxFeatures || {}),
        ];
      }
    });
  },
});

/**
 * Transform StyleSheet selector to style in JSX Elements.
 * <div className="header" /> => <div style={styleSheet.header} />
 * @param config
 */
function getClassNameToStyleTransformer(syntaxFeatures) {
  const { exportDefaultFrom } = syntaxFeatures;

  const plugins: (string | Array<string | object>)[] = [
    [require.resolve('babel-plugin-transform-jsx-stylesheet'), {
      retainClassName: true,
    }],
  ];

  if (exportDefaultFrom) {
    plugins.push(require.resolve('@babel/plugin-proposal-export-default-from'));
  }

  return async (sourceCode, id) => {
    // js file transform with rax-platform-loader and babel-plugin-transform-jsx-stylesheet
    if (id.includes('node_modules') && id.includes('react')) {
      return;
    }

    if (jsRegex.test(id)) {
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
        parserPlugins.push('decorators-legacy'); // allowing decorators by default
      }

      const { code, map } = transformSync(sourceCode, {
        babelrc: false,
        configFile: false,
        filename: id,
        parserOpts: {
          sourceType: 'module',
          allowAwaitOutsideFunction: true,
          // ts syntax had already been transformed by swc plugin.
          plugins: parserPlugins,
        },
        generatorOpts: {
          decoratorsBeforeExport: true,
        },
        sourceFileName: id,
        plugins,
      });

      return {
        code,
        map,
      };
    }
  };
}

/**
 * StyleSheet Loader for CSR.
 * Transform css files to inline style by webpack loader.
 */
const styleSheetLoaderForClient = (config) => {
  const { rules } = config.module || {};
  if (Array.isArray(rules)) {
    for (let i = 0, l = rules.length; i < l; i++) {
      const rule: RuleSetRule | any = rules[i];
      // Find the css rule, that default to CSS Modules.
      if (rule.test && rule.test instanceof RegExp && rule.test.source.indexOf('.css') > -1) {
        rules[i] = {
          test: /\.css$/i,
          oneOf: [
            ruleSetStylesheet,
          ],
        };
      }

      // Find and replace the less rule
      if (rule.test && rule.test instanceof RegExp && rule.test.source.indexOf('.less') > -1) {
        rules[i] = {
          test: /\.less$/i,
          oneOf: [
            ruleSetStylesheetForLess,
          ],
        };
      }
    }
  }
  return config;
};

/**
 * StyleSheet Loader for Server.
 * @param config
 */
function applyStylesheetLoaderForServer(preBuildOptions) {
  return (buildOptions) => {
    const currentOptions = preBuildOptions?.(buildOptions) || buildOptions;

    // Remove esbuild-empty-css while use inline style.
    currentOptions.plugins = currentOptions.plugins?.filter(({ name }) => name !== 'esbuild-empty-css');
    const cssModuleIndex = currentOptions.plugins?.findIndex(({ name }) => name === 'esbuild-css-modules');

    // Add custom transform for server compile.
    currentOptions.plugins?.splice(cssModuleIndex as number, 0, inlineStylePlugin());

    currentOptions.treeShaking = true;
    return currentOptions;
  };
}

/**
 * Transform css files to inline style by esbuild.
 * @returns
 */
const inlineStylePlugin = () => {
  return {
    name: 'esbuild-inline-style',
    setup: (build) => {
      build.onResolve({ filter: /\.(css|sass|scss|less)$/ }, (args) => {
        const absolutePath = path.resolve(args.resolveDir, args.path);
        return {
          path: absolutePath,
          namespace: 'css-content',
        };
      });

      build.onLoad({ filter: /.*/, namespace: 'css-content' }, async (args) => {
        const cssContent = fs.readFileSync(args.path, 'utf8');
        const content = await styleSheetLoader(cssContent, args.path.includes('.less') ? 'less' : 'css');

        return {
          contents: content,
          loader: 'js',
        };
      });
    },
  };
};

export default plugin;
