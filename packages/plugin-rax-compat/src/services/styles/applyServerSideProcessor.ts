import fs from 'fs';
import { createRequire } from 'module';

import styleSheetLoader from '../../lib/transform-styles.js';

import { checkInlineStyleEnable, checkStyleKind } from '../../utils.js';
import type { ESBuildPlugin, NormalizedRaxCompatPluginOptions, PluginAPI } from '../../typings';
import { createCSSImportPlugin } from './esbuildCSSImportPlugin.js';


const ESBuildInlineStylePlugin = (options: NormalizedRaxCompatPluginOptions): ESBuildPlugin => {
  return {
    name: 'esbuild-inline-style',
    setup: (build) => {
      build.onResolve({ filter: /\.(css|sass|scss|less)$/ }, async (args) => {
        if (args.path.startsWith('~')) {
          const cleanPath = args.path.slice(1);

          try {
            // Try to resolve as absolute path
            const require = createRequire(args.importer || import.meta.url);
            const resolvedPath = require.resolve(cleanPath);
            return {
              path: resolvedPath,
              namespace: args.namespace,
            };
          } catch (resolveError) {
            // If unable to resolve, mark as external dependency
            return {
              path: cleanPath,
              external: true,
            };
          }
        }
        return null;
      });

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

      // Add CSS import tilde transform plugin first
      currentOptions.plugins?.splice(
        cssModuleIndex >= 0 ? cssModuleIndex : 0,
        0,
        createCSSImportPlugin(),
      );

      // Add custom transform for server compile.
      currentOptions.plugins?.splice(
        options.cssModule ? cssModuleIndex + 2 : cssModuleIndex + 1,
        0,
        ESBuildInlineStylePlugin(options),
      );

      currentOptions.treeShaking = true;
      return currentOptions;
    };
  });
};
