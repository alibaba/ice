import * as webpack from 'webpack';
import { ConcatSource, RawSource } from 'webpack-sources';
import { get } from 'lodash';
import { getThemesDataStr } from '../../utils/themesUtil';

export interface Options {
  defaultName: string;
}

/**
 * 将主题数据在 optimizeChunkAssets 阶段注入到 window 上
 */
export class DefineVariablePlugin implements webpack.Plugin {
  private readonly pluginName = this.constructor.name;

  private readonly options: Partial<Options> = {};

  constructor(options: Options) {
    this.options = { ...this.options, ...options };
  }

  public apply(compiler: webpack.Compiler): void {
    const { defaultName } = this.options;

    compiler.hooks.compilation.tap(this.pluginName, (compilation) => {
      // webpack 5 get version
      if (get(compiler, 'webpack.version')?.startsWith('5')) {
        (compilation.hooks as any).processAssets.tap(
          {
            name: this.pluginName,
            stage: (webpack as any).Compilation.PROCESS_ASSETS_STAGE_ADDITIONS,
            additionalAssets: true
          },
          (assets: webpack.AssetInfo) => {
            Object.keys(assets).forEach(i => {
              const asset = compilation.getAsset(i);
              const contents = asset.source.source();

              compilation.updateAsset(
                i,
                new RawSource(`window.__themesData__ = ${getThemesDataStr(defaultName)};\n${contents}`),
              );
            });
          }
        );
        return;
      }

      /**
       * @deprecated optimizeChunkAssets API
       */
      compilation.hooks.optimizeChunkAssets.tap(this.pluginName, (chunks) => {
        chunks.forEach((chunk) => {
          chunk.files.forEach((fileName) => {
            if (fileName.includes('.js')) {
              compilation.assets[fileName] = new ConcatSource(
                `window.__themesData__ = ${getThemesDataStr(defaultName)};\n`,
                compilation.assets[fileName],
              );
            }
          });
        });
      });
    });
  }
}