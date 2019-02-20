const { createReadStream, createWriteStream, writeFileSync } = require('fs');
const babel = require('@babel/core');
const chokidar = require('chokidar');
const colors = require('colors');
const dtsGenerator = require('@alifd/dts-generator');
const glob = require('glob');
const mkdirp = require('mkdirp');
const path = require('path');
const propsSchemaGenerator = require('props-schema-generator');
const rimraf = require('rimraf');

const getBabelConfig = require('../../config/getBabelConfig');
const ComponentStyleGenerator = require('../../utils/component-style-generator');

const GLOB_PATTERN = '**/*';
const babelOpt = getBabelConfig();

/**
 * 构建项目
 */
module.exports = function componentBuild(workDir, opts) {
  opts = opts || {};

  const srcDir = path.join(workDir, 'src');
  const libDir = path.join(workDir, 'lib');
  console.log('clean', libDir);
  rimraf.sync(libDir);

  if (opts.watch) {
    const watcher = chokidar.watch(GLOB_PATTERN, {
      persistent: true,
      cwd: srcDir,
    });
    console.log(colors.bgGreen('Enable Watch Compile...'));
    watcher.on('change', (filePath) => {
      switch (path.extname(filePath)) {
        case '.js':
        case '.jsx':
          compileJS(filePath);
          break;
        default:
          copyTask(filePath);
          break;
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
    switch (path.extname(files[i])) {
      case '.js':
      case '.jsx':
        compileJS(files[i]);
        break;
      default:
        copyTask(files[i]);
        break;
    }
  }

  /* style generate */
  const styleGenerator = new ComponentStyleGenerator({
    destPath: libDir,
    absoulte: false,
  });
  const styleJSPath = styleGenerator.writeStyleJS();
  console.log(colors.green('Write style.js'));
  const indexScssPath = styleGenerator.writeIndexScss();
  console.log(colors.green('Write index.scss'));

  /* propsSchema and d.ts */
  const propsSchema = propsSchemaGenerator('./src');
  const propsSchemaDist = path.join(libDir, 'propsSchema.json');
  if (propsSchema) {
    writeFileSync(propsSchemaDist, JSON.stringify(propsSchema, null, 2) + '\n');
    console.log(colors.green('Write propsSchema.json'));
    dtsGenerator(propsSchema).then((dts) => {
      // 生成 d.ts
      const dtsDist = path.join(libDir, 'index.d.ts');
      if (dts !== null) {
        writeFileSync(dtsDist, dts.message);
        console.log(colors.green('Write index.d.ts'));
      }
    }).catch((err) => {
      console.log(colors.yellow('生成 d.ts 失败'), err);
    });
  }

  function compileJS(file) {
    const source = path.join(srcDir, file);
    const dest = path.join(libDir, file);
    const destData = path.parse(dest);

    delete destData.base;
    destData.ext = '.js';

    // make sure dir exists
    mkdirp.sync(destData.dir);
    const { code } = babel.transformFileSync(source, babelOpt);
    writeFileSync(path.format(destData), code, 'utf-8');
    console.log(colors.green(`Compile ${file}`));
  }

  function copyTask(file) {
    const source = path.join(srcDir, file);
    const dest = path.join(libDir, file);
    // make sure dir exists
    mkdirp.sync(path.dirname(dest));

    createReadStream(source)
      .pipe(createWriteStream(dest))
      .on('close', () => {
        console.log(colors.green(`Copy ${file}`));
      });
  }
};
