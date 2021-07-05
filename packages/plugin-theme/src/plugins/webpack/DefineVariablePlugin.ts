import { Compiler, Plugin } from 'webpack';
import { ConcatSource } from 'webpack-sources';
import { getThemesDataStr } from '../../utils/themesUtil';

export interface Options {
  defaultName: string;
}

/**
 * 将主题数据在 optimizeChunkAssets 阶段注入到 window 上
 */
export class DefineVariablePlugin implements Plugin {
  private readonly pluginName = this.constructor.name;

  private readonly options: Partial<Options> = {};

  constructor(options: Options) {
    this.options = { ...this.options, ...options };
  }

  public apply(compiler: Compiler): void {
    const { defaultName } = this.options;

    compiler.hooks.compilation.tap(this.pluginName, (compilation) => {
      compilation.hooks.optimizeChunkAssets.tap(this.pluginName, (chunks) => {
        chunks.forEach((chunk) => {
          chunk.files.forEach((fileName) => {
            compilation.assets[fileName] = new ConcatSource(
              `window.__themesData__ = ${getThemesDataStr(defaultName)};\n`,
              compilation.assets[fileName],
            );
          });
        });
      });
    });
  }
}