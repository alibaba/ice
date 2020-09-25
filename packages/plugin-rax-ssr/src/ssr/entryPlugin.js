const qs = require('qs');

/**
 * An entry plugin which will set loader for entry before compile.
 *
 * Entry Loader for SSR need `publicPath` for assets path.
 * `publicPath` may be changed by other plugin after SSR plugin.
 * So the real `publicPath` can only get after all plugins have registed.
 */
class EntryPlugin {
  constructor(options) {
    this.options = options;
  }

  /**
   * @param {Compiler} compiler the compiler instance
   * @returns {void}
   */
  apply(compiler) {
    const {
      loader,
      entries,
      isMultiPages,
      isInlineStyle,
      absoluteDocumentPath,
      absoluteShellPath,
      assetsProcessor
    } = this.options;

    const publicPath = compiler.options.output.publicPath;

    const entryConfig = {};

    entries.forEach((entry) => {
      const {
        name,
        sourcePath,
        pagePath,
      } = entry;

      const query = {
        pagePath,
        styles: isMultiPages && !isInlineStyle ? [`${publicPath}${name}.css`] : [],
        scripts: isMultiPages ? [`${publicPath}${name}.js`] : [`${publicPath}index.js`],
        absoluteDocumentPath,
        absoluteShellPath,
        assetsProcessor
      };

      entryConfig[name] = `${loader}?${qs.stringify(query)}!${sourcePath}`;
    });

    compiler.options.entry = entryConfig;
  }
}

module.exports = EntryPlugin;
