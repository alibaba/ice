import * as path from 'path';
import { build } from 'vite';
import type { InlineConfig, Plugin } from 'vite';
import { all } from 'deepmerge';
import replaceHtmlContent from '../replaceHtmlContent';

interface Options {
  ssrEntry: string;
  ssgEntry: string;
  ssr: string;
}
// simple array merge for config merge
const arrayMerge = (destinationArray: any[], sourceArray: any[]) => {
  return [...(destinationArray || []), ...(sourceArray || [])];
};

const ssrBuild = async (prodConfig: InlineConfig, buildOptions: Options): Promise<void>=> {
  const { ssrEntry, ssr, ssgEntry } = buildOptions;
  const distDir =
    prodConfig.build?.outDir ?? path.resolve(process.cwd(), 'build');
  const entry = ssr === 'static' ? ssgEntry : ssrEntry;
  const buildConfig = all(
    [prodConfig, {
      // No need to copy public files to SSR directory
      publicDir: false,
      define: {
        'process.env.__IS_SERVER__': true,
      },
      build: {
        minify: false,
        outDir: path.resolve(distDir, 'server'),
        ssr: entry,
        emptyOutDir: false,
        rollupOptions: {
          input: {
            index: entry
          },
          output: {
            entryFileNames: '[name].js',
            chunkFileNames: '[name].js',
          },
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
