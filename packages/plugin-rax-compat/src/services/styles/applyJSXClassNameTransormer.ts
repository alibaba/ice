import { createRequire } from 'module';

import { transformSync } from '@babel/core';

import { checkInlineStyleEnable } from '../../utils';

import type { NormalizedRaxCompatPluginOptions, PluginAPI, Transformer } from '../../typings';

const require = createRequire(import.meta.url);

const JSXClassNameToStyleTransformer = (api: PluginAPI, options: NormalizedRaxCompatPluginOptions): Transformer => {
  const { exportDefaultFrom } = api.context?.userConfig?.syntaxFeatures ?? {};

  const plugins: (string | [string, object])[] = [
    [
      require.resolve('babel-plugin-transform-jsx-stylesheet'),
      {
        retainClassName: true,
        forceEnableCSS: true,
      },
    ],
  ];

  if (exportDefaultFrom) {
    plugins.push(require.resolve('@babel/plugin-proposal-export-default-from'));
  }

  return async (sourceCode, id) => {
    // js file transform with rax-platform-loader and babel-plugin-transform-jsx-stylesheet
    if (id.includes('node_modules') || id.includes('react')) {
      return;
    }

    if (/\.(jsx?|tsx?|mjs)$/.test(id) === false) {
      return;
    }

    if (checkInlineStyleEnable(id, options.inlineStyle) === false) return;

    const parserPlugins = ['jsx', 'importMeta', 'topLevelAwait', 'classProperties', 'classPrivateMethods'];

    if (/\.tsx?$/.test(id)) {
      // when routes file is a typescript file,
      // add ts parser plugins
      parserPlugins.push('typescript');
      parserPlugins.push('decorators-legacy');
    }

    const { code, map } = transformSync(sourceCode, {
      babelrc: false,
      configFile: false,
      filename: id,
      parserOpts: {
        sourceType: 'module',
        allowAwaitOutsideFunction: true,
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
  };
};

export const applyJSXClassNameTransformer = (api: PluginAPI, options: NormalizedRaxCompatPluginOptions) => {
  api.onGetConfig((config) => {
    config.transforms ??= [];
    config.transforms.push(JSXClassNameToStyleTransformer(api, options));
  });
};
