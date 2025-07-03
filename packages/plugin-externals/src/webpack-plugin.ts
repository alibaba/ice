import webpack from 'webpack';
import type { Compiler } from 'webpack';

const ASSET_MANIFEST_JSON_NAME = 'assets-manifest.json';

interface PluginOptions {
  externals: string[];
}

export default class InjectExternalScriptsWebpackPlugin {
  private options: PluginOptions;

  constructor(options: PluginOptions) {
    this.options = options;
  }

  apply(compiler: Compiler) {
    compiler.hooks.make.tap('InjectExternalScriptsWebpackPlugin', (compilation) => {
      compilation.hooks.processAssets.tap(
        {
          name: 'InjectExternalScriptsWebpackPlugin',
          stage: webpack.Compilation.PROCESS_ASSETS_STAGE_ADDITIONS,
        },
        () => {
          const assetsManifest = compilation.assets[ASSET_MANIFEST_JSON_NAME];
          if (assetsManifest) {
            const json = JSON.parse(assetsManifest.source().toString());
            delete compilation.assets[ASSET_MANIFEST_JSON_NAME];
            // Ensure externals array exists and add new externals at the beginning.
            json.externals ||= [];
            json.externals.unshift(...this.options.externals);
            compilation.emitAsset(
              ASSET_MANIFEST_JSON_NAME,
              new webpack.sources.RawSource(JSON.stringify(json)),
            );
          }
        },
      );
    });
  }
}
