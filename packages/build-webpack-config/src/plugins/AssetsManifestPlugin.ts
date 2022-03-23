import { mkdirSync, writeFileSync } from 'fs';
import { dirname, resolve } from 'path';
import webpack, { type Compiler } from 'webpack';

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

  public constructor(options) {
    this.fileName = options.fileName || 'assets-manifest.json';
  }

  public createAssets(compilation: any, assets: any) {
    const bundles = {};

    const entrypoints = compilation.entrypoints.values();

    for (const entrypoint of entrypoints) {
      const entryName = entrypoint.name;
      const mainFiles = getEntrypointFiles(entrypoint);

      bundles[entryName] = mainFiles;

      const chunks = entrypoint?.getChildren();
      chunks.forEach((chunk: any) => {
        const chunkName = chunk.name;
        const chunkFiles = chunk.getFiles();
        bundles[chunkName] = chunkFiles;
      });
    }

    const manifest = {
      publicPath: compilation.outputOptions?.publicPath,
      bundles,
    };

    const manifestFileName = resolve(compilation.outputOptions?.path || './', this.fileName);

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
        (assets: any) => {
          this.createAssets(compilation, assets);
        },
      );
    });
    return;
  }
}