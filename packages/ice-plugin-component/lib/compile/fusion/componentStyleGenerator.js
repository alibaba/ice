/**
 * 根据代码生成 style.js 和 main.scss
 */

const mkdirp = require('mkdirp');
const fs = require('fs');
const path = require('path');
const iceDepAnalyzer = require('./depAnalyze');

function getPkgJSON(cwd, module) {
  const jsonPath = path.join(cwd, 'node_modules', module, './package.json');

  if (!fs.existsSync(jsonPath)) {
    return {};
  }

  const jsonString = fs.readFileSync(jsonPath, 'utf-8');
  return JSON.parse(jsonString);
}

module.exports = class ComponentStyleGenerator {
  constructor(options) {
    options = options || {};
    this.absoulte = options.absoulte || false;
    this.cwd = options.cwd || process.cwd();
    this.destPath = options.destPath || path.join(this.cwd, 'lib/');
    require.extensions['.jsx'] = require.extensions['.js'];
  }

  // eslint-disable-next-line class-methods-use-this
  mkdirpSync(p, opts, made) {
    return mkdirp.sync(p, opts, made);
  }

  filterDeps(deps) {
    return deps.filter((dep) => {
      // 相对路径
      if (/^\./.test(dep)) {
        return false;
      }

      const internalLibrary = [
        /@icedesign\/.*/,
        /^@icedesign\/base\/lib\/([^/]+)/,
        /@alife\/.*/,
        /^@alife\/next\/lib\/([^/]+)/,
        /@alifd\/.*/,
        /^@alifd\/next\/lib\/([^/]+)/,
        /@ali\/ice-.*/,
      ];
      const isInteranlLibrary = internalLibrary.some((library) => {
        return library.test(dep);
      });

      // 官方组件
      if (isInteranlLibrary) {
        return true;
      }

      const pkgJSON = getPkgJSON(this.cwd, dep);
      if (pkgJSON && (pkgJSON.componentConfig || pkgJSON.stylePath)) {
        return true;
      }

      return false;
    });
  }

  compileDeps() {
    if (this.deps) {
      return this.deps;
    }
    // analyze lib dir
    const deps = iceDepAnalyzer(
      path.join(this.destPath, 'index')
    );

    this.deps = this.filterDeps(deps);
    return this.deps;
  }

  getMainScssAbsPath() {
    return path.join(this.cwd, 'src/main.scss').replace(/\\/g, '/');
  }

  writeStyleJSSync(dest) {
    dest = dest || path.join(this.destPath, 'style.js');
    this.mkdirpSync(path.dirname(dest));
    const deps = this.compileDeps();
    const cwd = this.cwd;
    const importSatements = deps.map((module) => {
      if (fs.existsSync(path.join(cwd, 'node_modules', module, 'style.js'))) {
        return `require('${module}/style.js');`;
      } else if (fs.existsSync(path.join(cwd, 'node_modules', module, 'lib/style.js'))) {
        return `require('${module}/lib/style.js');`;
      }
      return '';
    }).join('\n');
    const mainScssAbsPath = this.getMainScssAbsPath();
    const content = `// 组件依赖样式
${importSatements}

// 组件自身样式
require('${this.absoulte ? mainScssAbsPath : './main.scss'}');
`;
    fs.writeFileSync(dest, content, 'utf-8');

    // 对于老的项目生成了 index.scss 和 style.js, 但是没有 main.scss, 补一个空的以免报错
    const libMainScssPath = path.join(this.destPath, 'main.scss');
    if (!fs.existsSync(libMainScssPath)) {
      fs.writeFileSync(libMainScssPath, '// empty file', 'utf-8');
    }
    return dest;
  }

  writeIndexScssSync(dest) {
    dest = dest || path.join(this.destPath, 'index.scss');
    this.mkdirpSync(path.dirname(dest));
    const deps = this.compileDeps();
    const cwd = this.cwd;
    const importSatements = deps.map((module) => {
      if (fs.existsSync(path.join(cwd, 'node_modules', module, 'index.scss'))) {
        return `@import '~${module}/index.scss';`;
      } else if (fs.existsSync(path.join(cwd, 'node_modules', module, 'lib/index.scss'))) {
        return `@import '~${module}/lib/index.scss';`;
      }
      return '';
    }).join('\n');
    const mainScssAbsPath = this.getMainScssAbsPath();
    const content = `// 组件依赖
${importSatements}

// 组件自身样式
@import '${this.absoulte ? mainScssAbsPath : './main.scss'}';
`;
    fs.writeFileSync(dest, content, 'utf-8');
    return dest;
  }
};
