'use strict';

const mkdirp = require('mkdirp');
const fs = require('fs');
const path = require('path');
const iceDepAnalyzer = require('../utils/depAnalyze');

module.exports = class ComponentStyleGenerator {
  constructor(options) {
    options = options || {};
    this.absoulte = options.absoulte || false;
    this.cwd = options.cwd || process.cwd();
    this.destPath = options.destPath || path.join(this.cwd, 'lib/');
    // hack to resolve .jsx file for node
    require.extensions['.jsx'] = require.extensions['.js'];
  }

  mkdirp(p, opts, made) {
    return mkdirp.sync(p, opts, made);
  }

  compileDeps() {
    if (this.deps) {
      return this.deps;
    } else {
      this.deps = iceDepAnalyzer(
        require.resolve(path.join(this.cwd, 'src/index'))
      );
      return this.deps;
    }
  }

  getMainScssAbsPath() {
    return path.join(this.cwd, 'src/main.scss').replace(/\\/g, '/');
  }

  writeStyleJS(dest) {
    dest = dest || path.join(this.destPath, 'style.js');
    this.mkdirp(path.dirname(dest));
    const deps = this.compileDeps();
    const cwd = this.cwd;
    const importSatements = deps
      .map(function(module) {
        if (fs.existsSync(path.join(cwd, 'node_modules', module, 'style.js'))) {
          return `require('${module}/style.js');`;
        } else if (
          fs.existsSync(path.join(cwd, 'node_modules', module, 'lib/style.js'))
        ) {
          return `require('${module}/lib/style.js');`;
        } else {
          return '';
        }
      })
      .join('\n');
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

  writeIndexScss(dest) {
    dest = dest || path.join(this.destPath, 'index.scss');
    this.mkdirp(path.dirname(dest));
    const deps = this.compileDeps();
    const cwd = this.cwd;
    const importSatements = deps
      .map(function(module) {
        if (
          fs.existsSync(path.join(cwd, 'node_modules', module, 'index.scss'))
        ) {
          return `@import '~${module}/index.scss';`;
        } else if (
          fs.existsSync(
            path.join(cwd, 'node_modules', module, 'lib/index.scss')
          )
        ) {
          return `@import '~${module}/lib/index.scss';`;
        } else {
          return '';
        }
      })
      .join('\n');
    const mainScssAbsPath = this.getMainScssAbsPath();
    const content = `// 组件依赖
${importSatements}

// 组件自身样式
@import '${this.absoulte ? mainScssAbsPath : './main.scss'}'
`;
    fs.writeFileSync(dest, content, 'utf-8');
    return dest;
  }
};
