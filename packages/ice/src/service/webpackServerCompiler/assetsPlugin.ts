import * as path from 'path';
import * as mrmime from 'mrmime';
import type { Compiler, Compilation } from 'webpack';
import type { AssetsManifest } from '@ice/runtime/types';

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

interface CompilationInfo {
  assetsManifest?: AssetsManifest;
}
class VirualAssetPlugin {
  private compilationInfo: CompilationInfo | (() => AssetsManifest);
  private rootDir: string;

  constructor(compilationInfo, rootDir) {
    this.compilationInfo = compilationInfo;
    this.rootDir = rootDir;
  }

  apply(compiler: Compiler) {
    compiler.hooks.compilation.tap('VirtualAssetsPlugin', (compilation) => {
      // Handle loading the virtual asset
      compilation.hooks.buildModule.tap('VirtualAssetsPlugin', (module) => {
        // console.log('module.buildInfo', module.buildInfo);
        // if (module.resource === 'virtual:assets-manifest.json') {
        //   const jsonContent = JSON.stringify(this.compilationInfo.assetsManifest || {});
        //   module._source = {
        //     source: () => jsonContent,
        //     size: () => jsonContent.length,
        //   };
        // }
      });
    });
  }
}

// Usage
export default VirualAssetPlugin;
