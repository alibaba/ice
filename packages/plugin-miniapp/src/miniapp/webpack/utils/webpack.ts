import path from 'path';
import webpack from '@ice/bundles/compiled/webpack/index.js';
import { promoteRelativePath } from './index.js';

const { ConcatSource } = webpack.sources;

export function getChunkEntryModule(compilation: webpack.Compilation, chunk: webpack.Chunk) {
  const { chunkGraph } = compilation;
  const entryModules = Array.from(chunkGraph.getChunkEntryModulesIterable(chunk));
  if (entryModules.length) {
    return entryModules[0];
  }
}

/**
 * 在文本头部加入一些 require 语句
 */
 export function addRequireToSource(
  id: string,
  modules: any,
  commonChunks: (webpack.Chunk | { name: string })[],
): webpack.sources.ConcatSource {
  const source = new ConcatSource();
  commonChunks.forEach(chunkItem => {
    source.add(`require(${JSON.stringify(promoteRelativePath(path.relative(id, chunkItem.name)))});\n`);
  });
  source.add('\n');
  source.add(modules);
  source.add(';');
  return source;
}

export function getChunkIdOrName(chunk: webpack.Chunk) {
  if (typeof chunk.id === 'string') {
    return chunk.id;
  }
  return chunk.name;
}
