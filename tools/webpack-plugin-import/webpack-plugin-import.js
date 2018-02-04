const fs = require('fs');
const path = require('path');

const webpackLoaderRequire = require.resolve('./webpack-loader-require');
const fileExistsCache = {};

function fileExists(id) {
  if (fileExistsCache[id]) {
    return fileExistsCache[id];
  }
  fileExistsCache[id] = fs.existsSync(id);
  return fileExistsCache[id];
}

// 在 resolve 阶段, 修改上下文中的 loaders 属性, 让 next 包的 index.js 经过以下 loader 加工
// see https://webpack.js.org/plugins/normal-module-replacement-plugin/
module.exports = class WebpackPluginImport {
  constructor(options) {
    if (Array.isArray(options)) {
      this.options = options;
    } else if (typeof options === 'object') {
      this.options = [options];
    } else {
      this.options = [];
    }
  }

  // eslint-disable-next-line
  needAdditionalStyle(result, opt) {
    if (opt.libraryName instanceof RegExp) {
      return opt.libraryName.test(result.rawRequest);
    }

    if (result.rawRequest.match(opt.libraryName)) {
      return true;
    }

    return false;
  }

  apply(compiler) {
    compiler.plugin('normal-module-factory', (nmf) => {
      nmf.plugin('after-resolve', (result, callback) => {
        if (!result) {
          return callback();
        }

        // only enable for .js or .jsx
        if (result.loaders && /\.jsx?$/i.test(result.resource)) {
          this.options.forEach((opt) => {
            if (this.needAdditionalStyle(result, opt)) {
              const modPath = path.join(
                path.dirname(result.resource),
                opt.stylePath || 'style.js',
              );

              if (fileExists(modPath)) {
                result.loaders.push(`${webpackLoaderRequire}?mod=${modPath}`);
              }
            }
          });
        }

        return callback(null, result);
      });
    });
  }
};
