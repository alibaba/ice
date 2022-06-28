// import webpack from 'webpack';
import { RawSource } from 'webpack-sources';
import * as postcss from 'postcss';

import ProcessAssets from './process-assets';

class ExtractCssAssetsPlugin {
  private options: object;

  constructor(options) {
    this.options = Object.assign(
      {
        outputPath: '',
        relativeCssPath: '',
        forceLocal: false,
        requsetOptions: {
          timeout: 5000,
        },
      },
      options
    );
  }

  // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
  apply(compiler) {
    const options = this.options;
    compiler.hooks.emit.tapPromise('ExtractCssAssetsPlugin', (compilation) => {
      const { outputOptions } = compilation;
      const collectChunks = []; // 收集资源

      return Promise.all(
        Object.keys(compilation.assets)
          .map((filename) => {
            const asset = compilation.assets[filename];
            if (filename.endsWith('.css')) {
              const css = asset.source();
              return new Promise<void>((resolve) => {
                // @ts-ignore
                postcss()
                  .use(
                    // @ts-ignore
                    new ProcessAssets(
                      // @ts-ignore
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
        // @ts-ignore
        .then(() => {
          if (collectChunks.length > 0) {
            return Promise.all(
              collectChunks.map((chunk) => {
                return new Promise<void>((resolve, reject) => {
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
