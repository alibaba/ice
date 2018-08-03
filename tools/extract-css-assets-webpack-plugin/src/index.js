// import webpack from 'webpack';
import { RawSource } from 'webpack-sources';
import postcss from 'postcss';

import ProcessAssets from './process-assets';

class ExtractCssAssetsPlugin {
  constructor(options) {
    this.options = Object.assign(
      {
        outputPath: '',
        relativeCssPath: '',
        requsetOptions: {
          timeout: 5000,
        },
      },
      options
    );
  }

  apply(compiler) {
    const options = this.options;
    compiler.hooks.emit.tapPromise('ExtractCssAssetsPlugin', (compilation) => {
      const { outputOptions } = compilation;
      const collectChunks = []; // 收集资源

      if (/(https?:)?\/\//.test(outputOptions.publicPath)) {
        return Promise.resolve();
      }

      return Promise.all(
        Object.keys(compilation.assets)
          .map((filename) => {
            let asset = compilation.assets[filename];
            if (filename.endsWith('.css')) {
              const css = asset.source();
              return new Promise((resolve) => {
                postcss()
                  .use(
                    new ProcessAssets(
                      { outputOptions, compilation, options },
                      {
                        emit: (chunk) => {
                          collectChunks.push(chunk);
                        },
                      }
                    )
                  )
                  .process(css, { from: filename, to: filename })
                  .then((result) => {
                    compilation.assets[filename] = new RawSource(result.css);
                    resolve();
                  });
              });
            }
            return null;
          })
          .filter(Boolean)
      )
        .then(() => {
          if (collectChunks.length > 0) {
            return Promise.all(
              collectChunks.map((chunk) => {
                return new Promise((resolve, reject) => {
                  if (chunk.outputPath) {
                    const file = new RawSource(chunk.contents);
                    compilation.assets[chunk.outputPath] = file;
                    resolve();
                  } else {
                    reject();
                  }
                });
              })
            );
          }
          return Promise.resolve();
        })
        .catch((error) => {
          throw error;
        });
    });
  }
}

export default ExtractCssAssetsPlugin;
