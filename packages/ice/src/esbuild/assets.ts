import * as path from 'path';
import * as mrmime from 'mrmime';
import fs from 'fs-extra';
import type { PluginBuild } from 'esbuild';
import type { AssetsManifest, ClientManifest, SSRModuleMapping } from '@ice/runtime/types';

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

interface CompilationInfo {
  assetsManifest?: AssetsManifest;
  reactClientManifest?: ClientManifest;
  reactSSRModuleMapping?: SSRModuleMapping;
}

const createAssetsPlugin = (compilationInfo: CompilationInfo | (() => CompilationInfo), rootDir: string) => ({
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
      const manifest = typeof compilationInfo === 'function' ? compilationInfo() : compilationInfo;
      return {
        contents: JSON.stringify(manifest?.assetsManifest || ''),
        loader: 'json',
      };
    });
    build.onResolve({ filter: /react-client-manifest.json$/ }, (args) => {
      if (args.path === 'virtual:react-client-manifest.json') {
        return {
          path: args.path,
          namespace: 'react-client-manifest',
        };
      }
    });
    build.onLoad({ filter: /.*/, namespace: 'react-client-manifest' }, () => {
      const manifest = typeof compilationInfo === 'function' ? compilationInfo() : compilationInfo;
      return {
        contents: JSON.stringify(manifest?.reactClientManifest || ''),
        loader: 'json',
      };
    });
    build.onResolve({ filter: /react-ssr-module-mapping.json$/ }, (args) => {
      if (args.path === 'virtual:react-ssr-module-mapping.json') {
        return {
          path: args.path,
          namespace: 'react-ssr-module-mapping',
        };
      }
    });
    build.onLoad({ filter: /.*/, namespace: 'react-ssr-module-mapping' }, () => {
      const manifest = typeof compilationInfo === 'function' ? compilationInfo() : compilationInfo;
      return {
        contents: JSON.stringify(manifest?.reactSSRModuleMapping || ''),
        loader: 'json',
      };
    });

    build.onLoad({ filter: ASSETS_RE }, async (args) => {
      const manifest = typeof compilationInfo === 'function' ? compilationInfo() : compilationInfo;
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
      const contentHash = manifest?.assetsManifest!.assets[`${relativePath}${args.suffix}`];
      if (contentHash) {
        const basename = path.basename(args.path);
        const extname = path.extname(basename);
        const ext = extname.substring(1);
        const name = basename.slice(0, -extname.length);
        // assets/[name].[hash:8][ext]
        url = `${manifest?.assetsManifest.publicPath}assets/${name}.${contentHash}.${ext}`;
      } else {
        url = `data:${mrmime.lookup(args.path)};base64,${content.toString('base64')}`;
      }
      return {
        contents: `module.exports = ${JSON.stringify(url)}`,
        loader: 'js',
      };
    });
  },
});

export default createAssetsPlugin;
