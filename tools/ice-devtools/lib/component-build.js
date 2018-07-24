const { join, extname, dirname } = require('path');
const { createReadStream, createWriteStream, writeFileSync } = require('fs');
const rimraf = require('rimraf');
const mkdirp = require('mkdirp');
const colors = require('colors');
const chokidar = require('chokidar');
const glob = require('glob');
const babel = require('babel-core');
const propsSchemaGenerator = require('props-schema-generator');
const dtsGenerator = require('typescript-definition-generator');
const getBabelConfig = require('./config/getBabelConfig');
const ComponentStyleGenerator = require('../shared/ComponentStyleGenerator');

const GLOB_PATTERN = '**/*';
const babelOpt = getBabelConfig();

/**
 * 构建项目
 */
module.exports = function componentBuild(workDir, opts) {
  opts = opts || {};

  const srcDir = join(workDir, 'src');
  const libDir = join(workDir, 'lib');
  console.log('clean', libDir);
  rimraf.sync(libDir);

  if (opts.watch) {
    const watcher = chokidar.watch(GLOB_PATTERN, {
      persistent: true,
      cwd: srcDir
    });
    console.log(colors.bgGreen('Enable Watch Compile...'));
    watcher
      .on('change', (path) => {
        switch (extname(path)) {
          case '.js':
          case '.jsx':
            compileJS(path); break;
          default:
            copyTask(path); break;
        }
      });
  }

  /* compile and copy */
  const globOpt = {
    dot: true,
    nodir: true,
    cwd: srcDir,
  };
  const files = glob.sync(GLOB_PATTERN, globOpt);

  for (let i = 0, l = files.length; i < l; i++) {
    switch (extname(files[i])) {
      case '.js':
      case '.jsx':
        compileJS(files[i]); break;
      default:
        copyTask(files[i]); break;
    }
  }

  /* style generate */
  const styleGenerator = new ComponentStyleGenerator({
    destPath: libDir,
    absoulte: false
  });
  const styleJSPath = styleGenerator.writeStyleJS();
  console.log(colors.green('Write style.js'));
  const indexScssPath = styleGenerator.writeIndexScss();
  console.log(colors.green('Write index.scss'));

  /* propsSchema and d.ts */
  const propsSchema = propsSchemaGenerator('./src');
  const propsSchemaDist = join(libDir, 'propsSchema.json');
  if (propsSchema) {
    writeFileSync(propsSchemaDist, JSON.stringify(propsSchema, null, 2) + '\n');
    console.log(colors.green('Write propsSchema.json'));
    dtsGenerator(propsSchema)
      .then((dts) => {
        // 生成 d.ts
        const dtsDist = join(libDir, 'index.d.ts');
        if (dts !== null) {
          writeFileSync(dtsDist, dts.message);
          console.log(colors.green('Write index.d.ts'));
        }
      });
  }

  function compileJS(file) {
    const source = join(srcDir, file);
    const dest = join(libDir, file);
    // make sure dir exists
    mkdirp.sync(dirname(dest));

    const { code, map } = babel.transformFileSync(source, babelOpt);
    writeFileSync(dest, code, 'utf-8');
    console.log(colors.green(`Compile ${file}`));
  }

  function copyTask(file) {
    const source = join(srcDir, file);
    const dest = join(libDir, file);
    // make sure dir exists
    mkdirp.sync(dirname(dest));

    createReadStream(source)
      .pipe(createWriteStream(dest))
      .on('close', () => {
        console.log(colors.green(`Copy ${file}`));
      });
  }
}

