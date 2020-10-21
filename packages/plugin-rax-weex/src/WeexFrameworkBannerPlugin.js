const { ConcatSource } = require('webpack-sources');

class WeexFrameworkBannerPlugin {
  constructor(options) {
    this.options = Object.assign({
      framework: 'Rax',
    }, options);
  }

  apply(compiler) {
    const frameworkComment = `// {"framework" : "${this.options.framework}"}`;

    // Webpack 4
    if (compiler.hooks && compiler.hooks.compilation && compiler.hooks.compilation.tap) {
      compiler.hooks.compilation.tap('WeexFrameworkBannerPlugin', compilation => {
        // uglify-webpack-plugin will remove javascript's comments in optimizeChunkAssets
        // need use afterOptimizeChunkAssets to add frameworkComment after that.
        // like the else block
        compilation.hooks.afterOptimizeChunkAssets.tap('WeexFrameworkBannerPlugin', chunks => {
          // eslint-disable-next-line no-restricted-syntax
          for (const chunk of chunks) {
            // Entry only
            if (!chunk.canBeInitial()) {
              continue; // eslint-disable-line
            }

            chunk.files.forEach(function(file) {
              compilation.assets[file] = new ConcatSource(
                frameworkComment,
                '\n',
                compilation.assets[file],
              );
            });
          }
        });
      });
    } else {
      compiler.plugin('compilation', (compilation) => {
        // uglify-webpack-plugin will remove javascript's comments in
        // optimize-chunk-assets, add frameworkComment after that.
        compilation.plugin('after-optimize-chunk-assets', function(chunks) {
          chunks.forEach(function(chunk) {
            // Entry only
            try {
              // In webpack2 chunk.initial was removed. Use isInitial()
              if (!chunk.initial) return;
            } catch (e) {
              if (!chunk.isInitial()) return;
            }

            chunk.files.forEach(function(file) {
              compilation.assets[file] = new ConcatSource(
                frameworkComment,
                '\n',
                compilation.assets[file],
              );
            });
          });
        });
      });
    }
  }
}


module.exports = WeexFrameworkBannerPlugin;
