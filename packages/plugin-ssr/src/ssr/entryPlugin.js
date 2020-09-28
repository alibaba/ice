const qs = require('qs');
const path = require('path');

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
      absoluteAppConfigPath,
      absoluteAppPath,
      assetsProcessor,
    } = this.options;

    const publicPath = compiler.options.output.publicPath;

    const entryConfig = {};

    entries.forEach((entry) => {
      const {
        name,
        sourcePath
      } = entry;

      let absolutePagePath;
      const appRegexp = /^app\.(t|j)sx?$/;
      const entryBasename = path.basename(sourcePath);
      const entryDirname = path.dirname(sourcePath);
      if (appRegexp.test(entryBasename)) {
        absolutePagePath = path.join(entryDirname, 'index.tsx');
      }

      const query = {
        styles: isMultiPages && !isInlineStyle ? [`${publicPath}${name}.css`] : [],
        scripts: isMultiPages ? [`${publicPath}${name}.js`] : [`${publicPath}index.js`],
        absoluteDocumentPath,
        absoluteAppPath,
        absoluteAppConfigPath,
        absolutePagePath,
        assetsProcessor,
      };

      entryConfig[name] = `${loader}?${qs.stringify(query)}!${sourcePath}`;
    });

    compiler.options.entry = entryConfig;
  }
}

module.exports = EntryPlugin;
