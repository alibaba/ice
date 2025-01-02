import path from 'path';
import fs from 'fs';
import * as mrmime from 'mrmime';
import { type AssetsManifest } from '@ice/runtime/types';
import NormalModule from 'webpack/lib/NormalModule.js';
import { type Compiler } from '@ice/bundles/compiled/webpack';

interface CompilationInfo {
  assetsManifest?: AssetsManifest;
}

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
const PLUGIN_NAME = 'VirtualManifestPlugin';
class VirtualManifestPlugin {
  private rootDir: string;
  private compilationInfo: CompilationInfo | (() => CompilationInfo);

  constructor(options) {
    this.rootDir = options.rootDir;
    this.compilationInfo = options.compilationInfo;
  }

  apply(compiler: Compiler) {
    compiler.hooks.compilation.tap(PLUGIN_NAME, (compilation, { normalModuleFactory }) => {
      NormalModule.getCompilationHooks(compilation)
        .readResource.for('virtual')
        .tap(PLUGIN_NAME, () => {
          const manifest = this.generateManifestContent() || '';
          return JSON.stringify(manifest);
        });
      normalModuleFactory.hooks.beforeResolve.tap(PLUGIN_NAME, (resolveData) => {
        if (resolveData.request === 'virtual:assets-manifest.json') {
          resolveData.assertions = {
            type: 'json',
          };
        }
      });
    });
  }

  generateManifestContent() {
    return typeof this.compilationInfo === 'function' ? this.compilationInfo() : this.compilationInfo;
  }

  async handleOtherAssets(args: { path: string; suffix: string }) {
    const manifest = this.generateManifestContent();

    const relativePath = path.relative(this.rootDir, args.path);
    let content = await fs.promises.readFile(args.path);
    let url = '';
    // Suffix `?url` will generate content hash in assets manifest,
    // keep the same file rule with client side.
    const contentHash = manifest?.assetsManifest?.assets?.[`${relativePath}${args.suffix}`];
    if (contentHash) {
      const basename = path.basename(args.path);
      const extname = path.extname(basename);
      const ext = extname.substring(1);
      const name = basename.slice(0, -extname.length);
      // In case of rspack bundler it will return full hash even it is set to [hash:8].
      const hash = contentHash.length > 8 ? contentHash.slice(0, 8) : contentHash;
      // assets/[name].[hash:8][ext]
      url = `${manifest?.assetsManifest.publicPath}assets/${name}.${hash}.${ext}`;
    } else {
      url = `data:${mrmime.lookup(args.path)};base64,${content.toString('base64')}`;
    }
    return `module.exports = ${JSON.stringify(url)}`;
  }
}

export default VirtualManifestPlugin;
