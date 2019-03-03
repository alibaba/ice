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

  // 在 package.json 中通过 componentConfig 字段标记是否为 ICE 组件，如果是，则自动引入样式
  componentCheck(result) {
    if (
      result &&
      result.resourceResolveData &&
      result.resourceResolveData.descriptionFileData &&
      result.resourceResolveData.descriptionFileData.name ===
        result.rawRequest &&
      result.resourceResolveData.descriptionFileData.componentConfig
    ) {
      return true;
    }
  }

  // eslint-disable-next-line
  libraryCheck(result, opt) {
    if (opt.libraryName instanceof RegExp) {
      return opt.libraryName.test(result.rawRequest);
    }
    if (result.rawRequest.match(opt.libraryName)) {
      return true;
    }
    return false;
  }

  apply(compiler) {
    compiler.hooks.normalModuleFactory.tap(
      'normal-module-factory',
      (NormalModuleFactory) => {
        NormalModuleFactory.hooks.afterResolve.tapPromise(
          'after-resolve',
          (result = {}) => {
            return new Promise((resolve) => {
              if (result.loaders && /\.(ts|js)x?$/i.test(result.resource)) {
                let needAdditionalStyle = false;
                let stylePath = 'style.js';

                const matchedIndex = this.options.findIndex((opt) => {
                  return this.libraryCheck(result, opt);
                });

                if (matchedIndex > -1) {
                  const matchedLibrary = this.options[matchedIndex];
                  if (matchedLibrary.stylePath) {
                    stylePath = matchedLibrary.stylePath;
                  }
                  needAdditionalStyle = true;
                }

                if (!needAdditionalStyle) {
                  needAdditionalStyle = this.componentCheck(result);
                }

                if (needAdditionalStyle) {
                  const modPath = path.join(
                    path.dirname(result.resource),
                    stylePath
                  );

                  if (fileExists(modPath)) {
                    result.loaders.push(
                      `${webpackLoaderRequire}?mod=${modPath}`
                    );
                  }
                }
              }
              resolve(result);
            });
          }
        );
      }
    );
  }
};
