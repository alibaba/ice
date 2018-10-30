/* eslint class-methods-use-this: 0 */
const path = require('path');
const fs = require('fs');
const assert = require('assert');
const chalk = require('chalk');

const cssPrefixLoader = require.resolve('./css-prefix-loader');
const fileExistsCache = {};

function fileExists(id) {
  if (fileExistsCache[id]) {
    return fileExistsCache[id];
  }
  fileExistsCache[id] = fs.existsSync(id);
  return fileExistsCache[id];
}

class CssPrefixPlugin {
  constructor(options) {
    assert.ok(
      Object.prototype.toString.call(options) === '[object Object]',
      chalk.red(
        '\n First arg: "options" in constructor of CssPrefixPlugin should be an object.'
      )
    );

    this.options = options || {};
    this.prefix = options['$css-prefix'] || '';
    this.matchFile = options.matchFile || /@alifd\/next\/lib\/(.+).scss$/;
  }

  apply(compiler) {
    compiler.hooks.normalModuleFactory.tap(
      'normal-module-factory',
      (NormalModuleFactory) => {
        NormalModuleFactory.hooks.afterResolve.tapPromise(
          'after-resolve',
          (result = {}) => {
            return new Promise((resolve) => {
              if (
                result.loaders &&
                this.prefix &&
                this.matchFile.test(result.resource)
              ) {
                const modPath = path.join(result.resource);
                if (fileExists(modPath)) {
                  result.loaders.push({
                    loader: cssPrefixLoader,
                    options: {
                      mod: modPath,
                      prefix: this.prefix,
                    },
                  });
                }
              }
              resolve(result);
            });
          }
        );
      }
    );
  }
}

module.exports = CssPrefixPlugin;
