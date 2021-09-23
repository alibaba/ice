import { Options, transform, transformSync } from '@builder/swc';
import webpack from 'webpack';
import { RawSource, SourceMapSource } from 'webpack-sources';

const { version } = require('../package.json');

export interface MinifyPluginOptions extends Options {
  sync?: boolean;
}

const isWebpack5 = (compilation: webpack.Compilation) => 'processAssets' in compilation.hooks;

const isJsFile = /\.[cm]?js(\?.*)?$/i;
const pluginName = 'swc-minify';

export class SWCMinifyPlugin {
  private readonly sync: boolean;

  private readonly options: Options;

  constructor(options: MinifyPluginOptions = {}) {
    const { sync, ...restOptions } = options;

    this.sync = sync;
    this.options = restOptions;

    if (typeof options.minify === 'undefined') {
      this.options.minify = true;
    }
  }

  // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
  apply(compiler: webpack.Compiler) {
    const meta = JSON.stringify({ name: pluginName, version, options: this.options });

    compiler.hooks.compilation.tap(pluginName, compilation => {
      compilation.hooks.chunkHash.tap(pluginName, (_, hash) => hash.update(meta));

      const tapMethod = this.sync ? 'tap' : 'tapPromise';

      if (isWebpack5(compilation)) {
        compilation.hooks.processAssets[tapMethod](
          {
            name: pluginName,
            stage: (compilation.constructor as any).PROCESS_ASSETS_STAGE_OPTIMIZE_SIZE,
            additionalAssets: true,
          },
          () => this.transformAssets(compilation),
        );

        compilation.hooks.statsPrinter.tap(pluginName, statsPrinter => {
          statsPrinter.hooks.print
            .for('asset.info.minimized')
            .tap(pluginName, (minimized, { green, formatFlag }) =>
              minimized ? green(formatFlag('minimized')) : undefined,
            );
        });
      } else {
        compilation.hooks.optimizeChunkAssets[tapMethod](pluginName, () => this.transformAssets(compilation));
      }
    });
  }

  private async transformAssets(compilation: webpack.Compilation) {
    const {
      options: { devtool },
    } = compilation.compiler;
    const sourcemap = !!devtool;
    const assets = compilation.getAssets().filter(asset => !asset.info.minimized && isJsFile.test(asset.name));
    if (this.sync) {
      return this.processAssetsSync(assets, sourcemap, compilation);
    } else {
      return this.processAssets(assets, sourcemap, compilation);
    }
  }

  private processAssetsSync(assets: webpack.Asset[], sourcemap: boolean, compilation: webpack.Compilation) {
    assets.forEach(asset => {
      const { source, map } = asset.source.sourceAndMap();
      const sourceAsString = source.toString();
      const result = transformSync(sourceAsString, {
        ...this.options,
        sourceMaps: sourcemap,
        sourceFileName: asset.name,
      });
      compilation.updateAsset(
        asset.name,
        sourcemap
          ? new SourceMapSource(result.code, asset.name, result.map as any, sourceAsString, map as any, true)
          : new RawSource(result.code),
        {
          ...asset.info,
          minimized: true,
        },
      );
    });
  }

  private async processAssets(
    assets: webpack.Asset[],
    sourcemap: boolean,
    compilation: webpack.Compilation,
  ) {
    await Promise.all(
      assets.map(async asset => {
        const { source, map } = asset.source.sourceAndMap();
        const sourceAsString = source.toString();
        const result = await transform(sourceAsString, {
          ...this.options,
          sourceMaps: sourcemap,
          sourceFileName: asset.name,
        });

        compilation.updateAsset(
          asset.name,
          sourcemap
            ? new SourceMapSource(result.code, asset.name, result.map as any, sourceAsString, map as any, true)
            : new RawSource(result.code),
          {
            ...asset.info,
            minimized: true,
          },
        );
      }),
    );
  }
}
