/* eslint-disable no-restricted-syntax */
import { transform as swcTransform, Config } from '@swc/core';
import { ModuleFilenameHelpers, Compiler, compilation as webpackCompilation } from 'webpack';
import { RawSource, SourceMapSource } from 'webpack-sources';

const PLUGIN_NAME = 'SwcPlugin';

export type SwcPluginOptions = Omit<Config, 'minify' | 'sourceMaps'>;

export default class SwcPlugin {
  private readonly options: SwcPluginOptions;

  constructor(options: SwcPluginOptions = {}) {
    this.options = options;
  }

  public apply(compiler: Compiler): void {
    const matchObject = ModuleFilenameHelpers.matchObject.bind(undefined, {});
    const { devtool } = compiler.options;

    compiler.hooks.compilation.tap(
      PLUGIN_NAME,
      (compilation: webpackCompilation.Compilation) => {
        compilation.hooks.optimizeChunkAssets.tapPromise(
          PLUGIN_NAME,
          async (chunks: webpackCompilation.Chunk[]) => {
            for (const chunk of chunks) {
              for (const file of chunk.files) {
                if (matchObject(file) && /\.m?js(\?.*)?$/i.test(file)) {
                  const assetSource = compilation.assets[file];
                  const { source, map } = assetSource.sourceAndMap();
                  // eslint-disable-next-line no-await-in-loop
                  const result = await swcTransform(source, {
                    ...this.options,
                    minify: true,
                    sourceMaps: !!devtool,
                  });

                  compilation.updateAsset(file, () => {
                    if (devtool) {
                      return new SourceMapSource(
                        result.code || '',
                        file,
                        result.map as any,
                        source,
                        map,
                        true,
                      );
                    } else {
                      return new RawSource(result.code || '');
                    }
                  });
                }
              }
            }
          },
        );
      },
    );
  }
}
