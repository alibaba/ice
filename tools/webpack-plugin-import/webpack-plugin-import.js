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

  // needAdditionalStyle(result, option) {
  //   // 包含基础组件和业务组件

  //   if (/@icedesign\/([\w|-]*)\/lib\/index\.js/i.test(result.rawRequest)) {
  //     return true;
  //   }

  //   if (/@alife\/([\w|-]*)\/lib\/index\.js/i.test(result.rawRequest)) {
  //     return true;
  //   }

  //   if (/@ali\/ice\-/i.test(result.rawRequest)) {
  //     return true;
  //   }

  //   // 这种不在 node_modules 里的依赖一般是 link 过来的
  //   // 直接检测 style.js 文件是否存在
  //   if (
  //     !/^\./.test(result.rawRequest) &&
  //     !/node_modules/.test(result.resource) &&
  //     /\.js$/i.test(result.resource)
  //   ) {
  //     if (/style\.js$/i.test(result.resource)) {
  //       return false;
  //     }

  //     return fileExists(path.join(result.resource, '../style.js'));
  //   }

  //   // check peerDep or dep
  //   const resourceSplit = result.resource.split('node_modules');
  //   const resourceRelativePath = resourceSplit[resourceSplit.length - 1];
  //   const sliceDeep = /^\/_?\@/.test(resourceRelativePath) ? 3 : 2;
  //   // 带 @ 的是 spaced module, 需要多取一层路径
  //   const moduleName = resourceRelativePath
  //     .split('/')
  //     .slice(0, sliceDeep)
  //     .concat(['package.json'])
  //     .join('/');
  //   resourceSplit[resourceSplit.length - 1] = moduleName;

  //   const pkgJSONPath = resourceSplit.join('node_modules');

  //   try {
  //     const pkg = require(pkgJSONPath);
  //     if (
  //       (pkg.dependencies && '@alife/next' in pkg.dependencies) ||
  //       '@icedesign/base' in pkg.dependencies ||
  //       ((pkg.peerDependencies && '@alife/next' in pkg.peerDependencies) ||
  //         '@icedesign/base' in pkg.peerDependencies)
  //     ) {
  //       return true;
  //     }
  //   } catch (err) {
  //     // ignore err
  //   }

  //   return false;
  // }

  needAdditionalStyle(result, opt) {
    // todo 需要处理一下
    return true;
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
                'style.js'
              );

              if (fileExists(modPath)) {
                result.loaders.push(
                  `${webpackLoaderRequire}?mod=${modPath}`
                );
              }
            }
          });
        }

        return callback(null, result);
      });
    });
  }
};
