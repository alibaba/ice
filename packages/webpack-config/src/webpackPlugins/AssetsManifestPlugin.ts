import { existsSync } from 'fs';
import { resolve } from 'path';
import webpack from '@ice/bundles/compiled/webpack/index.js';
import type { Compiler, Compilation } from 'webpack';

const pluginName = 'AssetsManifestPlugin';

interface Assets {
  getFiles: () => string[];
}

function filterAssets(assets: Assets): string[] {
  return (
    assets
      ?.getFiles()
      .filter((file: string) => {
        // We don't want to include `.hot-update.js` files into the initial page
        return /(?<!\.hot-update)\.(js|css)($|\?)/.test(file);
      })
      .map((file: string) => file.replace(/\\/g, '/')) ?? []
  );
}

export default class AssetsManifestPlugin {
  private fileName: string;
  private outputDir: string;

  public constructor(options) {
    this.fileName = options.fileName || 'assets-manifest.json';
    this.outputDir = options.outputDir || './';
  }

  public createAssets(compilation: Compilation) {
    const entries = {};
    const pages = {};
    const assets = {};

    const entrypoints = compilation.entrypoints.values();
    const assetsInfo = compilation.assetsInfo.values();

    for (const asset of assetsInfo) {
      if (asset.sourceFilename) {
        assets[asset.sourceFilename] = asset.contenthash;
      }
    }

    for (const entrypoint of entrypoints) {
      const entryName = entrypoint.name;
      const mainFiles = filterAssets(entrypoint);
      entries[entryName] = mainFiles;

      const chunks = entrypoint?.getChildren();
      chunks.forEach((chunk) => {
        const chunkName = chunk.name;
        const chunkFiles = filterAssets(chunk);
        pages[chunkName] = chunkFiles;
      });
    }

    const manifest = {
      publicPath: compilation.outputOptions?.publicPath,
      entries,
      pages,
      assets,
    };
    // FIXME: append data-loader to the entry by hard code
    // data-loader is built by another webpack task
    const dataLoader = resolve(this.outputDir, './data-loader.ts');
    if (existsSync(dataLoader)) {
      manifest['dataLoader'] = 'js/data-loader.js';
    }

    const output = JSON.stringify(manifest, null, 2);
    compilation.emitAsset(this.fileName, new webpack.sources.RawSource(output));
  }

  public apply(compiler: Compiler) {
    compiler.hooks.make.tap(pluginName, (compilation) => {
      compilation.hooks.processAssets.tap(
        {
          name: pluginName,
          stage: compiler.webpack.Compilation.PROCESS_ASSETS_STAGE_ADDITIONS,
        },
        () => {
          this.createAssets(compilation);
        },
      );
    });
    return;
  }
}