import fs from 'fs';

import styleSheetLoader from '../../lib/transform-styles';

import { checkInlineStyleEnable, checkStyleKind } from '../../utils';

import type { ESBuildPlugin, NormalizedRaxCompatPluginOptions, PluginAPI } from '../../typings';

const ESBuildInlineStylePlugin = (options: NormalizedRaxCompatPluginOptions): ESBuildPlugin => {
  return {
    name: 'esbuild-inline-style',
    setup: (build) => {
      build.onLoad({ filter: /\.(css|sass|scss|less)$/ }, async (args) => {
        if (checkInlineStyleEnable(args.path, options.inlineStyle) === false) {
          return null;
        }

        const cssContent = await fs.promises.readFile(args.path, 'utf8');
        const content = await styleSheetLoader(cssContent, args.path, checkStyleKind(args.path));

        return {
          contents: content,
          loader: 'js',
        };
      });
    },
  };
};

export const applyServerSideStyleProcessor = (api: PluginAPI, options: NormalizedRaxCompatPluginOptions) => {
  const { userConfig } = api.context;

  if (!userConfig.ssr && !userConfig.ssg) {
    return;
  }

  api.onGetConfig((config) => {
    config.server ??= {};
    const previousBuildOptions = config.server.buildOptions;
    config.server.buildOptions = (buildOptions) => {
      const currentOptions = previousBuildOptions?.(buildOptions) ?? buildOptions ?? {};

      // Remove esbuild-empty-css while use inline style.
      currentOptions.plugins = currentOptions.plugins?.filter(({ name }) => name !== 'esbuild-empty-css');

      const cssModuleIndex = currentOptions.plugins?.findIndex(({ name }) => name === 'esbuild-css-modules') as number;

      // Add custom transform for server compile.
      currentOptions.plugins?.splice(
        options.cssModule ? cssModuleIndex + 1 : cssModuleIndex,
        0,
        ESBuildInlineStylePlugin(options),
      );

      currentOptions.treeShaking = true;
      return currentOptions;
    };
  });
};
