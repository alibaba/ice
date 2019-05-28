/**
 * 构建 src
 *  - src -> lib
 *    - es6 编译
 *    - 生成 style.js 和 index.scss
 */

const { createReadStream, createWriteStream, writeFileSync } = require('fs');
const babel = require('@babel/core');
const glob = require('glob');
const mkdirp = require('mkdirp');
const path = require('path');
const rimraf = require('rimraf');

module.exports = function componentBuild({ babelConfig, rootDir, log }) {
  const srcDir = path.join(rootDir, 'src');
  const libDir = path.join(rootDir, 'lib');

  rimraf.sync(libDir);
  log.info('Cleaned lib');

  const files = glob.sync('**/*', {
    dot: true,
    nodir: true,
    cwd: srcDir,
  });

  for (let i = 0, l = files.length; i < l; i++) {
    switch (path.extname(files[i])) {
      case '.js':
      case '.jsx':
      case '.ts':
      case '.tsx':
        compileSource(files[i]);
        break;
      default:
        copyTask(files[i]);
        break;
    }
  }

  function compileSource(file) {
    const source = path.join(srcDir, file);
    const dest = path.join(libDir, file);
    const destData = path.parse(dest);

    delete destData.base;
    destData.ext = '.js';

    // make sure dir exists
    mkdirp.sync(destData.dir);
    // filename need to expose to @babel/preset-typescript
    const { code } = babel.transformFileSync(source, Object.assign(babelConfig, {
      filename: file,
    }));
    writeFileSync(path.format(destData), code, 'utf-8');
    log.info(`Compile ${file}`);
  }

  function copyTask(file) {
    const source = path.join(srcDir, file);
    const dest = path.join(libDir, file);
    // make sure dir exists
    mkdirp.sync(path.dirname(dest));

    createReadStream(source)
      .pipe(createWriteStream(dest))
      .on('close', () => {
        log.info(`Copy ${file}`);
      });
  }
};
