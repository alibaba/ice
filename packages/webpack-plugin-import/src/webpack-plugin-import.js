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

// 历史业务组件，package.json 中不包含 stylePath 字段，但会生成 style.js 并且需要自动引入
const packagesNeedImportStyle = [
  '@ali/ice-url-changer',
  '@ali/ice-pop-iframe',
  '@ali/ice-media',
  '@ali/ice-loading',
  '@ali/ice-img-space',
  '@ali/ice-box-selector',
  '@ali/ice-anchor-image',
  '@ali/ice-add-tag',
  '@ali/ice-add-item',
  '@ali/ice-add-image',
  '@icedesign/title',
  '@icedesign/qrcode',
  '@icedesign/img',
  '@icedesign/foundation-symbol',
  '@icedesign/dynamic-icon',
  '@icedesign/container',
  '@icedesign/balloon-confirm',
  '@icedesign/ellipsis',
  '@ice/form',
  '@icedesign/label',
  '@icedesign/layout',
  '@icedesign/list',
  '@icedesign/notification',
  '@icedesign/panel',
  '@icedesign/styled-menu',
];

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

  getStylePath(result) {
    if (
      result &&
      result.resourceResolveData &&
      result.resourceResolveData.descriptionFileData &&
      result.resourceResolveData.descriptionFileData.name === result.rawRequest
    ) {
      // 在 package.json 中通过 stylePath 字段标记是否需要自动引入样式，如果配置 style path，则自动引入对应样式
      return result.resourceResolveData.descriptionFileData.stylePath;
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
        NormalModuleFactory.hooks.afterResolve.tap(
          'after-resolve',
          (resolveData = {}) => {
            const result = resolveData.createData || resolveData;
            if (result.loaders && /\.(ts|js)x?$/i.test(result.resource)) {
              let needAdditionalStyle = false;
              let stylePath = 'style.js';
              const matchedPackage = packagesNeedImportStyle.find((pageName) => result.rawRequest === pageName);
              if (matchedPackage) {
                needAdditionalStyle = true;
              } else {
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
              }

              if (!needAdditionalStyle) {
                const customStylePath = this.getStylePath(result);
                if (customStylePath) {
                  stylePath = customStylePath;
                  needAdditionalStyle = true;
                }
              }

              if (needAdditionalStyle) {
                const modPath = path.join(
                  path.dirname(result.resource),
                  stylePath
                );

                if (fileExists(modPath)) {
                  result.loaders.push({
                    loader: webpackLoaderRequire,
                    options: {
                      mod: modPath
                    }
                  });
                }
              }
            }
          }
        );
      }
    );
  }
};
