import * as path from 'path';
import * as mrmime from 'mrmime';
import fs from 'fs-extra';
import type { PluginBuild } from 'esbuild';

export const ASSET_TYPES = [
  // images
  'png',
  'jpe?g',
  'gif',
  'svg',
  'ico',
  'webp',
  'avif',

  // media
  'mp4',
  'webm',
  'ogg',
  'mp3',
  'wav',
  'flac',
  'aac',

  // fonts
  'woff2?',
  'eot',
  'ttf',
  'otf',

  // other
  'wasm',
  'webmanifest',
  'pdf',
  'txt',
];

const ASSETS_RE = new RegExp(`\\.(${ASSET_TYPES.join('|')})(\\?.*)?$`);

interface AssetsManifest {
  publicPath: string;
  assets?: {
    [assetPath: string]: string;
  };
}

const createAssetsPlugin = (assetsManifest: AssetsManifest, rootDir: string) => ({
  name: 'esbuild-assets',
  setup(build: PluginBuild) {
    build.onResolve({ filter: /assets-manifest.json$/ }, (args) => {
      if (args.path === 'virtual:assets-manifest.json') {
        return {
          path: args.path,
          namespace: 'asset-manifest',
        };
      }
    });
    build.onLoad({ filter: /.*/, namespace: 'asset-manifest' }, () => {
      return {
        contents: JSON.stringify(assetsManifest),
        loader: 'json',
      };
    });
    build.onLoad({ filter: ASSETS_RE }, async (args) => {
      if (args.suffix == '?raw') {
        return {
          loader: 'text',
        };
      }
      const relativePath = path.relative(rootDir, args.path);
      let content = await fs.promises.readFile(args.path);
      let url = '';
      // Suffix `?url` will generate content hash in assets manifest,
      // keep the same file rule with client side.
      const contentHash = assetsManifest!.assets[`${relativePath}${args.suffix}`];
      if (contentHash) {
        const basename = path.basename(args.path);
        const extname = path.extname(basename);
        const ext = extname.substring(1);
        const name = basename.slice(0, -extname.length);
        // assets/[name].[hash:8][ext]
        url = `${assetsManifest.publicPath}assets/${name}.${contentHash}.${ext}`;
      } else {
        url = `data:${mrmime.lookup(args.path)};base64,${content.toString('base64')}`;
      }
      return {
        contents: `export default ${JSON.stringify(url)}`,
        loader: 'js',
      };
    });
  },
});

export default createAssetsPlugin;