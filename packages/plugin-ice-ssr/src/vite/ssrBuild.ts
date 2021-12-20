import * as path from 'path';
import { build } from 'vite';
import type { InlineConfig, Plugin } from 'vite';
import { all } from 'deepmerge';
import replaceHtmlContent from '../replaceHtmlContent';

interface Options {
  ssrEntry: string;
}
// simple array merge for config merge
const arrayMerge = (destinationArray: any[], sourceArray: any[]) => {
  return [...(destinationArray || []), ...(sourceArray || [])];
};

const ssrBuild = async (prodConfig: InlineConfig, buildOptions: Options): Promise<void>=> {
  const { ssrEntry } = buildOptions;
  const distDir =
    prodConfig.build?.outDir ?? path.resolve(process.cwd(), 'build');
  const buildConfig = all(
    [prodConfig, {
      // No need to copy public files to SSR directory
      publicDir: false,
      build: {
        minify: false,
        outDir: path.resolve(distDir, 'server'),
        ssr: ssrEntry,
        emptyOutDir: false,
        rollupOptions: {
          input: {
            index: ssrEntry
          },
          output: {
            entryFileNames: '[name].js',
            chunkFileNames: '[name].js',
          },
          plugins: [
            // eslint-disable-next-line global-require
            require('@rollup/plugin-replace')({
              preventAssignment: true,
              values: {
                'process.env.__IS_SERVER__': true,
              },
            }),
          ],
        },
      },
    }], { arrayMerge }
  ) as InlineConfig;
  // filter vite-plugin-html-index for create html entry
  buildConfig.plugins = buildConfig.plugins.filter((plugin) => {
    const { name } = plugin as Plugin;
    return name !== 'vite-plugin-html-index';
  });
  try {
    await build(buildConfig);
    replaceHtmlContent(path.join(prodConfig.build?.outDir as string, 'index.html'), path.resolve(distDir, 'server', 'index.js'));
  } catch (err) {
    console.error(err);
  }
};

export default ssrBuild;
