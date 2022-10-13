import webpack from '@ice/bundles/compiled/webpack/index.js';
import type { MiniappComponent } from '../../../types.js';
import { getChunkEntryModule, addRequireToSource, getChunkIdOrName } from '../utils/webpack.js';
import { META_TYPE } from '../../../constant.js';
import type NormalModule from './NormalModule.js';

const { ConcatSource } = webpack.sources;
const PLUGIN_NAME = 'LoadChunksPlugin';

interface IOptions {
  commonChunks: string[];
  pages: Set<MiniappComponent>;
  needAddCommon?: string[];
  isIndependentPackages?: boolean;
}

export default class LoadChunksPlugin {
  commonChunks: string[];
  pages: Set<MiniappComponent>;
  isCompDepsFound: boolean;
  needAddCommon: string[];
  isIndependentPackages: boolean;

  constructor(options: IOptions) {
    this.commonChunks = options.commonChunks;
    this.pages = options.pages;
    this.needAddCommon = options.needAddCommon || [];
    this.isIndependentPackages = options.isIndependentPackages || false;
  }

  apply(compiler: webpack.Compiler) {
    compiler.hooks.thisCompilation.tap(PLUGIN_NAME, (compilation: webpack.Compilation) => {
      let commonChunks;
      const fileChunks = new Map<string, { name: string }[]>();

      compilation.hooks.afterOptimizeChunks.tap(PLUGIN_NAME, (chunks: webpack.Chunk[]) => {
        // TODO:原先用于收集用到的组件，以减少 template 体积。ICE 中无法收集，需要提供可让用户手动配置的方法
        const chunksArray = Array.from(chunks);
        commonChunks = chunksArray.filter(
          chunk => this.commonChunks.includes(chunk.name) && chunkHasJs(chunk, compilation.chunkGraph),
        ).reverse();
      });

      webpack.javascript.JavascriptModulesPlugin.getCompilationHooks(compilation).render.tap(PLUGIN_NAME,
        (modules: webpack.sources.ConcatSource, { chunk }) => {
          const chunkEntryModule = getChunkEntryModule(compilation, chunk) as any;
          if (chunkEntryModule) {
            const entryModule: NormalModule = chunkEntryModule.rootModule ?? chunkEntryModule;
            if (entryModule.miniType === META_TYPE.EXPORTS) {
              const source = new ConcatSource();
              source.add('module.exports=');
              source.add(modules);
              return source;
            } else {
              return modules;
            }
          } else {
            return modules;
          }
        });

      /**
       * 在每个 chunk 文本刚生成后，按判断条件在文本头部插入 require 语句
       */
      webpack.javascript.JavascriptModulesPlugin.getCompilationHooks(compilation).render.tap(PLUGIN_NAME,
        (modules: webpack.sources.ConcatSource, { chunk }) => {
          const chunkEntryModule = getChunkEntryModule(compilation, chunk) as any;
          if (chunkEntryModule) {
            const entryModule: NormalModule = chunkEntryModule.rootModule ?? chunkEntryModule;
            const { miniType } = entryModule;
            if (this.needAddCommon.length) {
              for (const item of this.needAddCommon) {
                if (getChunkIdOrName(chunk) === item) {
                  return addRequireToSource(item, modules, commonChunks);
                }
              }
            }

            if (miniType === META_TYPE.ENTRY) {
              return addRequireToSource(getChunkIdOrName(chunk), modules, commonChunks);
            }

            // addChunkPages
            if (fileChunks.size &&
              (miniType === META_TYPE.PAGE || miniType === META_TYPE.COMPONENT)
            ) {
              let source;
              const id = getChunkIdOrName(chunk);
              fileChunks.forEach((v, k) => {
                if (k === id) {
                  source = addRequireToSource(id, modules, v);
                }
              });
              return source;
            }
          } else {
            return modules;
          }
        });
    });
  }
}

function chunkHasJs(chunk: webpack.Chunk, chunkGraph: webpack.ChunkGraph) {
  if (chunk.name === chunk.runtime) return true;
  if (chunkGraph.getNumberOfEntryModules(chunk) > 0) return true;

  return Boolean(chunkGraph.getChunkModulesIterableBySourceType(chunk, 'javascript'));
}
