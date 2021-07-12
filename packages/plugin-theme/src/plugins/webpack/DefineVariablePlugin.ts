import * as webpack from 'webpack';
import { ConcatSource } from 'webpack-sources';

export interface Options {
  codeGen: () => string
}

/**
 * 将主题数据在 optimizeChunkAssets 阶段注入到 window 上
 */
export class DefineVariablePlugin implements webpack.WebpackPluginInstance {
  private readonly pluginName = this.constructor.name;

  private readonly options: Partial<Options> = {};

  constructor(options: Options) {
    this.options = { ...this.options, ...options };
  }

  private injectData(codeGen: () => string,filename: string, compilation: any) {
    if (!filename.includes('.js')) return;

    const asset = compilation.getAsset(filename);
    const contents = asset.source.source();

    compilation.updateAsset(
      filename,
      new ConcatSource(
        codeGen(),
        String(contents),
      )
    );
  }

  public apply(compiler: webpack.Compiler): void {
    const { codeGen } = this.options;

    compiler.hooks.compilation.tap(this.pluginName, (compilation) => {
      compilation.hooks.processAssets.tap(
        {
          name: this.pluginName,
          stage: webpack.Compilation.PROCESS_ASSETS_STAGE_ADDITIONS,
          additionalAssets: true
        },
        (assets) => {
          Object.keys(assets).forEach(fileName => {
            this.injectData(codeGen, fileName, compilation);
          });
        }
      );
    });
  }
}