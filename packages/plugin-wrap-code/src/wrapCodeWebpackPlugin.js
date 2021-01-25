const assert = require('assert');
const ConcatSource = require('webpack-sources').ConcatSource;

module.exports = class WrapCodePlugin {
  constructor(options) {
    assert(
      Object.prototype.toString.call(options) === '[object Object]',
      'Argument of WrapEntryPlugin must be an object',
    );

    const { addCodeBefore = '', addCodeAfter = '', fileMatch } = options;
    this.addCodeBefore = addCodeBefore;
    this.addCodeAfter = addCodeAfter;
    this.fileMatch = fileMatch instanceof RegExp ? (chunkName) => fileMatch.test(chunkName) : fileMatch;
  }

  apply(compiler) {
    const { addCodeBefore, addCodeAfter } = this;
    const entry = compiler.options.entry;
    const wrapFile = (compilation, fileName) => {
      // set compilation as param, you can get compilation of webpack
      const codeBefore = typeof addCodeBefore === 'function' ?
        addCodeBefore(fileName, entry, compilation) : addCodeBefore;
      const codeAfter = typeof addCodeAfter === 'function' ?
        addCodeAfter(fileName, entry, compilation) : addCodeAfter;
      compilation.assets[fileName] = new ConcatSource(
        String(codeBefore),
        compilation.assets[fileName],
        String(codeAfter),
      );
    };

    const wrapChunks = (compilation, chunks) => {
      chunks.forEach((chunk) => {
        chunk.files.forEach((fileName) => {
          // only wrap code when file is match
          if (this.fileMatch(fileName, entry, compilation)) {
            wrapFile(compilation, fileName);
          }
        });
      });
    };

    compiler.hooks.compilation.tap('WrapCodePlugin', (compilation) => {
      // compatible with webpack 5
      if (typeof compilation.hooks.processAssets !== 'undefined') {
        // eslint-disable-next-line global-require
        const { Compilation } = require('webpack');
        compilation.hooks.processAssets.tap({
          name: 'WrapCodePlugin',
          stage: Compilation.PROCESS_ASSETS_STAGE_OPTIMIZE
        }, (chunks) => {
          wrapChunks(compilation, chunks);
        });
      } else {
        compilation.hooks.optimizeChunkAssets.tap('WrapCodePlugin', (chunks) => {
          wrapChunks(compilation, chunks);
        });
      }
    });
  }
};
