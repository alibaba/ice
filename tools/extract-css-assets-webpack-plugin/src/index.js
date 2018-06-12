// import webpack from 'webpack';
import { RawSource } from 'webpack-sources';
import postcss from 'postcss';
import request from 'request-promise';

import generatorFilename from './generator-filename';
import ProcessAssets from './process-assets';

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
                      { outputOptions, options },
                      {
                        emit: (url) => {
                          collectAssets.push(url);
                        },
                      },
                    ),
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
          .filter(Boolean),
      )
        .then(() => {
          if (collectAssets.length > 0) {
            return Promise.all(
              collectAssets.map((url) => {
                url = url.indexOf('http') == 0 ? url : 'http:' + url;
                return new Promise((resolve, reject) => {
                  const filename = generatorFilename(url);
                  request
                    .get({
                      url,
                      encoding: null,
                    })
                    .then(function(res) {
                      const buffer = Buffer.from(res, 'utf-8');
                      const chunk = new RawSource(buffer);

                      compilation.assets[
                        outputOptions.publicPath + options.outputPath + filename
                      ] = chunk;

                      resolve();
                    })
                    .catch(reject);
                });
              }),
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
