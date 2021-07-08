import * as webpack from 'webpack';
import { ConcatSource } from 'webpack-sources';
import { getThemesDataStr } from '../../utils/themesUtil';

export interface Options {
  defaultName: string;
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

  private injectData(fileName: string, defaultName: string, compilation: any) {
    if (!fileName.includes('.js')) return;

    const asset = compilation.getAsset(fileName);
    const contents = asset.source.source();

    compilation.updateAsset(
      fileName,
      new ConcatSource(
        `window.__themesData__ = ${getThemesDataStr(defaultName)};\n`,
        String(contents),
      )
    );
  }

  public apply(compiler: webpack.Compiler): void {
    const { defaultName } = this.options;

    compiler.hooks.compilation.tap(this.pluginName, (compilation) => {
      compilation.hooks.processAssets.tap(
        {
          name: this.pluginName,
          stage: webpack.Compilation.PROCESS_ASSETS_STAGE_ADDITIONS,
          additionalAssets: true
        },
        (assets) => {
          Object.keys(assets).forEach(fileName => {
            this.injectData(fileName, defaultName, compilation);
          });
        }
      );
    });
  }
}