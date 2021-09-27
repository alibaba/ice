import * as webpack from 'webpack';
import type { WebpackPluginInstance, Compiler } from 'webpack';
import { ConcatSource } from 'webpack-sources';

export interface Options {
  getCode: () => string
}

/**
 * loader 结束后注入代码
 * 
 * only webpack5
 */
export class DefineVariablePlugin implements WebpackPluginInstance {
  private readonly pluginName = this.constructor.name;

  private readonly options: Partial<Options> = {};

  constructor(options: Options) {
    this.options = { ...this.options, ...options };
  }

  private injectData(getCode: () => string, filename: string, compilation: any) {
    if (!filename.includes('.js')) return;

    const asset = compilation.getAsset(filename);
    const contents = asset.source.source();

    compilation.updateAsset(
      filename,
      new ConcatSource(
        getCode(),
        String(contents),
      )
    );
  }

  public apply(compiler: Compiler): void {
    const { getCode } = this.options;

    compiler.hooks.compilation.tap(this.pluginName, (compilation) => {
      compilation.hooks.processAssets.tap(
        {
          name: this.pluginName,
          stage: webpack.Compilation.PROCESS_ASSETS_STAGE_ADDITIONS,
          additionalAssets: true
        },
        (assets) => {
          Object.keys(assets).forEach(fileName => {
            this.injectData(getCode, fileName, compilation);
          });
        }
      );
    });
  }
}