// import webpack from 'webpack';
import { RawSource } from 'webpack-sources';
import postcss from 'postcss';
import request from 'request-promise';

import generatorFilename from './generator-filename';
import ProcessAssets from './process-assets';
import { rejects } from 'assert';

class ExtractCssAssetsPlugin {
  constructor(options) {
    this.options = options || {
      outputPath: '',
    };
  }

  apply(compiler) {
    const options = this.options;
    compiler.hooks.emit.tapPromise('ExtractCssAssetsPlugin', (compilation) => {
      const { outputOptions } = compilation;

      const collectAssets = []; // 收集资源
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
                        emit: (asset) => {
                          collectAssets.push(asset);
                        },
                      }
                    )
                  )
                  .process(css, { from: filename, to: filename })
                  .then(function(result) {
                    compilation.assets[filename] = new RawSource(result.css);
                    resolve();
                  });
              });
            } else {
              return null;
            }
          })
          .filter(Boolean)
      )
        .then(() => {
          if (collectAssets.length > 0) {
            return Promise.all(
              collectAssets.map((asset) => {
                return new Promise((resolve) => {
                  if (asset.path) {
                    const chunk = new RawSource(asset.contents);
                    compilation.assets[asset.path] = chunk;
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
