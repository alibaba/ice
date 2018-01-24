/**
 * 构建组件 从 src 生成 lib
 * @icedesign scope 下的组件自动处理样式依赖
 * @param {String} cwd 项目目录
 * @param {Object} options 命令行参数
 */

process.env.NODE_ENV = 'production';
const gulp = require('gulp');
const glob = require('glob');
const matchRequire = require('match-require');
const mkdirp = require('mkdirp');
const rimraf = require('rimraf');
const colors = require('chalk');
const babel = require('babel-core');
const fs = require('fs');
const path = require('path');
const propsSchemaGenerator = require('../dependencies/props-schema-generator');
const dtsGenerator = require('../dependencies/typescript-definition-generator');
const ComponentStyleGenerator = require('./utils/ComponentStyleGenerator');
const getBabelConfig = require('./config/getBabelConfig');

const cwd = process.cwd();

// eslint-diable-next-line
module.exports = function (args = {}) {
  const pkgPath = path.join(cwd, 'package.json');
  const pkg = JSON.parse(fs.readFileSync(pkgPath));
  const babelConfig = getBabelConfig(pkg.buildConfig || {});
  gulp.task('clean', () => {
    const lib = path.join(cwd, 'lib');
    return new Promise((resolve) => {
      rimraf.sync(lib);
      console.log(`清理 ${lib} 完成`);
      resolve();
    });
  });

  /**
   * 生成 style.js
   */
  gulp.task('generate-style', () => {
    if (!args.generateStyle) {
      console.log(colors.green('跳过 style.js 生成'));
      return;
    }

    return new Promise((resolve) => {
      // 构建 index.scss 和 style.js
      const styleGenerator = new ComponentStyleGenerator({
        destPath: path.join(cwd, 'lib/'),
        absoulte: false,
      });
      const styleJSPath = styleGenerator.writeStyleJS();
      console.log(colors.green('style.js 生成完毕'));
      resolve(styleJSPath);
    });
  });

  gulp.task('generate-dts', () => {
    if (!args.propsSchema) {
      console.log(colors.green('跳过 PropsSchema 生成'));
      return;
    }

    return new Promise((resolve) => {
      // 生成 propsSchema && d.ts
      const propsSchema = propsSchemaGenerator('./src');
      const propsSchemaDist = path.join(cwd, 'lib/propsSchema.json');
      if (propsSchema) {
        // 确保文件夹存在
        mkdirp.sync(path.dirname(propsSchemaDist));
        fs.writeFileSync(
          propsSchemaDist,
          `${JSON.stringify(propsSchema, null, 2)}\n`
        );
        console.log(colors.green('propsSchema 生成完毕'));
        return dtsGenerator(propsSchema).then((dts) => {
          const dtsDist = path.join(cwd, 'lib/index.d.ts');
          if (dts !== null) {
            fs.writeFileSync(dtsDist, dts.message);
            console.log(colors.green('index.d.ts 生成完毕'));
          }
        });
      } else {
        resolve();
      }
    });
  });

  gulp.task('build', () => {
    console.log('启动编译, 当前目录:');
    console.log(cwd);

    const pkg = JSON.parse(fs.readFileSync(path.join(cwd, 'package.json')));
    const dependencies = pkg.dependencies || {};
    return new Promise((resolve, reject) => {
      glob(
        '**/*',
        {
          nodir: true,
          cwd: path.join(cwd, 'src'),
        },
        (err, files) => {
          if (err) {
            reject(err);
          } else {
            const result = [];
            files.forEach((file) => {
              const from = path.resolve(cwd, 'src', file);
              const to = path.resolve(cwd, 'lib', file);
              result.push(to);

              mkdirp.sync(path.dirname(to));
              switch (path.extname(file)) {
                case '.jsx':
                case '.js':
                  // 检测依赖 start
                  const depsInContents = matchRequire.findAll(
                    fs.readFileSync(from, 'utf-8')
                  );
                  (depsInContents || []).forEach((dep) => {
                    // 本地依赖 忽略
                    if (/^\./.test(dep)) {
                      return;
                    }
                    // external 忽略
                    if (['react', 'react-dom'].indexOf(dep) > -1) {
                      return;
                    }
                    // normal module
                    const modulePath = path.join(cwd, 'node_modules', dep, 'package.json');
                    if (!fs.existsSync(modulePath)) {
                      throw new Error('依赖检测错误: ' + dep);
                    }
                    if (!dep in dependencies) {
                      throw new Error('依赖检测错误, dep 未添加: ' + dep);
                    }
                  });
                  const transformed = babel.transformFileSync(
                    from,
                    babelConfig
                  );
                  fs.writeFileSync(
                    to.replace(/\.jsx/, '.js'),
                    transformed.code,
                    'utf-8'
                  );
                  console.log(
                    `${path.relative(cwd, from)} ${colors.green(
                      '-babel->'
                    )} ${path.relative(cwd, to)}`
                  );
                  // todo .map file
                  break;
                default:
                  console.log(
                    `${path.relative(cwd, from)} ${colors.green(
                      '-copy->'
                    )} ${path.relative(cwd, to)}`
                  );
                  copy(from, to);
              }
            });
            resolve(result);
          }
        }
      );
    });
  });

  gulp.start('build', ['clean', 'generate-dts', 'generate-style'], () => {
    console.log('编译完成');
  });
};

function copy(from, to) {
  fs.writeFileSync(to, fs.readFileSync(from));
}
