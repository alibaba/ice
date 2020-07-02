/* eslint class-methods-use-this:0, @typescript-eslint/explicit-member-accessibility:0 */
import * as ModuleFilenameHelpers from 'webpack/lib/ModuleFilenameHelpers';
import { ConcatSource } from 'webpack-sources';

const PluginName = 'WrapChunkPlugin';

class WrapChunkPlugin {

  public options: any;

  apply(compiler) {
    // Execute when compilation created
    compiler.hooks.compilation.tap(PluginName, (compilation) => {
      // Optimize chunk assets
      compilation.hooks.optimizeChunkAssets.tapAsync(
        PluginName,
        (chunks, callback) => {
          chunks.forEach(chunk => {
            chunk.files.forEach(fileName => {
              if (ModuleFilenameHelpers.matchObject({ test: /\.js$/ }, fileName)) {
                const headerContent = 'module.exports = function(window, document) {const App = function(options) {window.appOptions = options};const HTMLElement = window["HTMLElement"];';

                const footerContent = '}';

                compilation.assets[fileName] = new ConcatSource(
                  headerContent,
                  compilation.assets[fileName],
                  footerContent
                );
              }
            });
          });
          callback();
        }
      );
    });
  }
}

export default WrapChunkPlugin;
