/**
 * 检测 ICE 组件的依赖问题
 *  - 部分代码直接借鉴了 duplicate-package-checker-webpack-plugin
 */
const path = require('path');
const findRoot = require('find-root');
const colors = require('chalk');
const semver = require('semver');
const bizComponentsVersion = require('./bizComponentsVersion');
const deprecatedComponents = require('./deprecatedComponents');

const depModules = {};

module.exports = class CheckDepsPlugin {

  constructor(options) {
    this.pkg = options.pkg || {};
  }

  apply(compiler) {
    compiler.hooks.emit.tapAsync('CheckDepsPlugin', (compilation, callback) => {
      const projectPath = compilation.compiler.context;
      const npmInfos = [];

      compilation.modules.forEach((module) => {

        if (!module.resource) {
          return;
        }

        const closestPackage = getClosestPackage(module.resource);

        // Skip module if no closest package is found
        if (!closestPackage) {
          return;
        }

        const pkg = closestPackage.package;
        const packagePath = closestPackage.path;

        if (!depModules[pkg.name]) {
          depModules[pkg.name] = [pkg.version];
        } else if (depModules[pkg.name].indexOf(pkg.version) === -1) {
          depModules[pkg.name].push(pkg.version);
        }
      });

      console.log('\n----项目依赖健康检查-----');

      // 1. 多版本
      Object.keys(depModules).forEach((moduleName) => {
        const versions = depModules[moduleName];
        if (versions.length > 1) {
          console.log(colors.yellow('Warning: '), `项目依赖了 ${moduleName} 的两个版本，`, colors.green(versions));
        }
      });

      // 2. 多份基础组件
      const baseComponentDeps = ['@icedesign/base', '@alife/next', '@ali/ice'].filter(name => depModules[name]);
      if (baseComponentDeps.length > 1) {
        console.log(colors.red('Error: '), `项目依赖了多份基础组件 ${baseComponentDeps}，建议通过配置 buildConfig.uniteBaseComponent 优化`);
      }

      // 3. 业务组件与基础组件的版本对应关系
      const pkgDirectDeps = this.pkg.dependencies || {};
      const depFdNext = pkgDirectDeps['@alifd/next'];
      const depFeNext = pkgDirectDeps['@ali/ice'] || pkgDirectDeps['@icedesign/base'] || pkgDirectDeps['@alife/next'];

      if (depFeNext && !depFdNext) {
        // 只依赖了 0.x 的项目应该使用 0.x 的业务组件
        Object.keys(depModules).forEach((moduleName) => {
          checkBizComponentVersion(moduleName, depModules[moduleName][0], '0.x')
        });
      }

      if (depFdNext && !depFeNext) {
        // 只依赖了 1.x 的项目应该使用 1.x 的业务组件
        Object.keys(depModules).forEach((moduleName) => {
          checkBizComponentVersion(moduleName, depModules[moduleName][0], '1.x')
        });
      }

      // 4. 不维护的业务组件
      Object.keys(depModules).forEach((moduleName) => {
        const deprecatedMsg = deprecatedComponents[moduleName];
        if (deprecatedMsg) {
          consolw.log(colors.yellow('Warning: '),deprecatedMsg);
        }
      });

      callback();
    });
  }

}

// Get closest package definition from path
function getClosestPackage(modulePath) {
  let root;
  let pkg;

  // Catch findRoot or require errors
  try {
    root = findRoot(modulePath);
    pkg = require(path.join(root, "package.json"));
  } catch (e) {
    return null;
  }

  // If the package.json does not have a name property, try again from
  // one level higher.
  // https://github.com/jsdnxx/find-root/issues/2
  // https://github.com/date-fns/date-fns/issues/264#issuecomment-265128399
  if (!pkg.name) {
    return getClosestPackage(path.resolve(root, ".."));
  }

  return {
    package: pkg,
    path: root
  };
}

function checkBizComponentVersion(npmName, npmVersion, baseVersion) {
  if (!bizComponentsVersion[npmName]) {
    // 未统计到或者 0.x&1.x 兼容的业务组件
    return;
  }

  const version = npmVersion;
  const semverVersion = bizComponentsVersion[npmName][baseVersion];

  if (!semverVersion) {
    // 没有对应的（未升级）
    console.log(colors.yellow('Warning: '), `${npmName} 暂时没有符合基础组件 ${baseVersion} 的版本，建议联系 ICE 团队协助升级`);
  }

  if (!semver.satisfies(npmVersion, semverVersion)) {
    // 不符合版本
    console.log(colors.red('Error: '), `项目使用的基础组件版本是 ${baseVersion}，业务组件 ${npmName}@${npmVersion} 不符合版本要求 ${semverVersion}，建议选择正确的组件版本`);
  }
}

