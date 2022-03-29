import { mkdirSync, writeFileSync } from 'fs';
import { dirname, resolve } from 'path';
import webpack from 'webpack';
import type { Compiler, Compilation } from 'webpack';

const pluginName = 'AssetsManifestPlugin';

function getEntrypointFiles(entrypoint: any): string[] {
  return (
    entrypoint
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
    const bundles = {};

    const entrypoints = compilation.entrypoints.values();

    for (const entrypoint of entrypoints) {
      const entryName = entrypoint.name;
      const mainFiles = getEntrypointFiles(entrypoint);
      bundles[entryName] = {
        isEntry: true,
        files: mainFiles,
      };

      const chunks = entrypoint?.getChildren();
      chunks.forEach((chunk: any) => {
        const chunkName = chunk.name;
        const chunkFiles = chunk.getFiles();
        bundles[chunkName] = {
          isEntry: false,
          files: chunkFiles,
        };
      });
    }

    const manifest = {
      publicPath: compilation.outputOptions?.publicPath,
      bundles,
    };

    const manifestFileName = resolve(this.outputDir, this.fileName);

    const output = JSON.stringify(manifest, null, 2);

    mkdirSync(dirname(manifestFileName), { recursive: true });
    writeFileSync(manifestFileName, output);
    return;
  }

  public apply(compiler: Compiler) {
    compiler.hooks.make.tap(pluginName, (compilation) => {
      compilation.hooks.processAssets.tap(
        {
          name: pluginName,
          stage: webpack.Compilation.PROCESS_ASSETS_STAGE_ADDITIONS,
        },
        () => {
          this.createAssets(compilation);
        },
      );
    });
    return;
  }
}