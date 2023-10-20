import { existsSync } from 'fs';
import { resolve } from 'path';
import webpack from '@ice/bundles/compiled/webpack/index.js';
import type { Compiler, Compilation } from 'webpack';

const pluginName = 'AssetsManifestPlugin';

interface Assets {
  getFiles: () => string[];
}

function filterAssets(compilation: Compilation, assets: Assets): string[] {
  return (
    assets
      ?.getFiles()
      .filter((file: string) => {
        const exists = compilation.assets[file];
        // We don't want to include `.hot-update.js` files into the initial page
        const notHotUpdate = exists && /(?<!\.hot-update)\.(js|css)($|\?)/.test(file);
        return exists && notHotUpdate;
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

    const entryFiles = [];
    for (const entrypoint of entrypoints) {
      const entryName = entrypoint.name;

      const entryChunk = entrypoint.getEntrypointChunk();

      // Keep only main chunk as entry files.
      if (entryChunk.runtime !== entryChunk.name) {
        continue;
      }

      const entryFile = [...entryChunk.files].filter((file) => file.endsWith('.js'))?.[0];
      // Temp files may have been deleted.
      if (!compilation.assets[entryFile]) {
        continue;
      }

      const mainFiles = filterAssets(compilation, entrypoint);
      if (!mainFiles.length) {
        continue;
      }

      entryFiles.push(entryFile);
      entries[entryName] = mainFiles;

      const childChunks = entrypoint?.getChildren();
      childChunks.forEach((chunk) => {
        // Dynamic import missing chunk name, but not output solid assets.
        const chunkName = chunk.name;
        if (chunkName) {
          pages[chunkName.replace(/^p_/, '').replace(/^rsc_/, '')] = filterAssets(compilation, chunk);
        }
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
    // Emit asset manifest for server compile.
    compilation.emitAsset(this.fileName, new webpack.sources.RawSource(output));

    // Inject assets manifest to entry file.
    entryFiles.forEach((entryFile) => {
      compilation.assets[entryFile] = new webpack.sources.ConcatSource(
        new webpack.sources.RawSource(String(`window.__ICE_ASSETS_MANIFEST__=${output};\n`)),
        compilation.assets[entryFile],
      );
    });
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
