import { existsSync } from 'fs';
import { resolve } from 'path';
import type { Compiler, Compilation, RspackPluginInstance } from '@rspack/core';

export default class AssetManifest implements RspackPluginInstance {
  name = 'AssetManifest';
  private fileName: string;
  private outputDir: string;

  constructor(options) {
    this.fileName = options?.fileName || 'assets-manifest.json';
    this.outputDir = options?.outputDir || './';
  }

  apply(compiler: Compiler) {
    compiler.hooks.thisCompilation.tap(this.name, (compilation) => {
      compilation.hooks.processAssets.tapAsync(
        {
          name: this.name,
          stage: compiler.webpack.Compilation.PROCESS_ASSETS_STAGE_OPTIMIZE_INLINE,
        },
        (_: Compilation['assets'], callback) => {
          const entries = {};
          const pages = {};
          // TODO: get assets info by compilation.assetsInfo (not supported yet).
          const assets = {};
          const entryNames = Array.from(compilation.entrypoints.keys());
          entryNames.forEach((entryName: string) => {
            const entryUnfilteredPointFiles = compilation.entrypoints.get(entryName)?.getFiles();
            const entryPointFiles = entryUnfilteredPointFiles?.filter((chunkFile) => {
              const asset = compilation.getAsset(chunkFile);
              if (!asset) {
                return true;
              }
              const assetMetaInfo = asset.info;
              return !(
                assetMetaInfo.hotModuleReplacement ||
                assetMetaInfo.development
              );
            });
            entries[entryName] = entryPointFiles;
          });
          const stats = compilation.getStats().toJson({
            all: false,
            chunks: true,
          });
          stats.chunks.filter(({ entry, initial }) => !entry && !initial).forEach((chunk) => {
            const chunkName = chunk.id;

            if (chunkName) {
              pages[chunkName.replace(/^p_/, '')] = chunk.files.filter((file: string) => {
                return file.endsWith('.js') || file.endsWith('.css');
              });
            }
          });
          const manifest = {
            publicPath: compilation.outputOptions?.publicPath,
            entries,
            pages,
            assets,
          };

          const dataLoader = resolve(this.outputDir, './data-loader.ts');
          if (existsSync(dataLoader)) {
            manifest['dataLoader'] = 'js/data-loader.js';
          }

          const output = JSON.stringify(manifest, null, 2);
          // Emit asset manifest for server compile.
          compilation.emitAsset(this.fileName, new compiler.webpack.sources.RawSource(output));
          callback();
        },
      );
    });
  }
}
