import fs from 'fs';
import type { ESBuildPlugin } from '../../typings';

/**
 * ESBuild plugin to transform CSS imports with tilde (~) syntax
 * Converts @import "~@ali/xxx" to @import "@ali/xxx"
 *
 * Note: This plugin only handles CSS files that are not processed by the inline style plugin.
 * For inline styles, the transformation is handled in transform-styles.ts
 */
export const createCSSImportPlugin = (): ESBuildPlugin => {
  return {
    name: 'esbuild-css-import-tilde',
    setup: (build) => {
      // Handle CSS files that are processed by esbuild's default CSS loader
      // (not by our inline style plugin)
      build.onLoad({ filter: /\.css$/ }, async (args) => {
        try {
          const source = await fs.promises.readFile(args.path, 'utf8');

          // Check if this CSS contains tilde imports
          if (!source.includes('@import "~') && !source.includes("@import '~")) {
            // No tilde imports found, let default processing handle it
            return null;
          }

          // Transform @import "~..." to @import "..."
          const transformedContent = source.replace(
            /@import\s+(['"])~([^'"]+)\1/g,
            '@import $1$2$1',
          );

          return {
            contents: transformedContent,
            loader: 'css',
          };
        } catch (error) {
          return {
            errors: [{
              text: `Failed to process CSS imports: ${error.message}`,
              location: { file: args.path },
            }],
          };
        }
      });
    },
  };
};