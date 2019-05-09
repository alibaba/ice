/* eslint no-shadow:0, array-callback-return: 0 */
const ejs = require('ejs');
const path = require('path');
const fs = require('fs');
const write = require('write');
const glob = require('glob');
const prettierFormat = require('./prettierFormat');

const sourceDirPath = path.join(__dirname, '..', 'templates');

/**
 * Layout 生成入口
 * @param {Object} layoutConfig
 */
module.exports = function generatorLayout(layoutConfig = {}) {
  return new Promise((resolve, reject) => {
    // 用户选择的布局组件
    const layoutComponents = [];
    Object.keys(layoutConfig).forEach((key) => {
      if (['header', 'aside', 'footer'].indexOf(key) !== -1) {
        if (!layoutConfig[key].enabled) {
          layoutConfig[key] = null; // 将未选择的元素的值设置为 null
        } else {
          layoutComponents.push(upperCase(key));
        }
      }
    });

    // 包含 Header 和 Footer 组件时需要生成 Logo 组件
    if (
      layoutComponents.includes('Header') ||
      layoutComponents.includes('Footer')
    ) {
      layoutComponents.push('Logo');
    }

    // 字段补充合并用于查找对应的组件
    layoutConfig = Object.assign({}, layoutConfig, { layoutComponents });

    // 检测目录是否存在
    if (!fs.existsSync(layoutConfig.directory)) {
      throw new Error('自定义布局必须指定项目目录');
    }

    // 检测布局名称是否存在，不存在则使用默认
    if (!layoutConfig.name) {
      layoutConfig.name = 'BasicLayout';
    }

    // 生成目录
    const destDirPath = path.join(
      layoutConfig.directory,
      'src/layouts',
      layoutConfig.name
    );

    // 判断新添加的布局名是否已经存在
    if (fs.existsSync(destDirPath)) {
      throw new Error('已经存在相同的名称，请重新输入');
    }

    return renderDirFiles(sourceDirPath, destDirPath, layoutConfig)
      .then(() => {
        const layoutDependencies = getLayoutDependencies();
        resolve(layoutDependencies);
      })
      .catch(reject);
  });
};

/**
 * 将一个目录下的所有文件遍历渲染
 * @param  {Strign} sourceDirPath  模板所在目录一个临时文件夹
 * @param  {String} destDirPath   目标文件夹
 * @param  {Object} data          数据，使用 ejs 渲染
 * @return {Promise}
 */
function renderDirFiles(sourceDirPath, destDirPath, data) {
  const destFiles = data.layoutComponents.concat(['layouts']);

  return new Promise((resolve, reject) => {
    glob(
      '**/*',
      { cwd: sourceDirPath, nodir: true, dot: true },
      (err, files) => {
        if (err) {
          return reject(err);
        }

        const queue = [];
        files.map((file) => {
          const sourceFile = file.split('/');
          destFiles.forEach((destFile) => {
            if (sourceFile.indexOf(destFile) === -1) return;

            const sourceFileAbsolutePath = path.resolve(sourceDirPath, file);
            // component 下载到对应项目的 src/layout/xxxLayout 目录下
            // layout 下载到对应项目的 src/layout/xxxLayout 目录下
            let destFileAbsolutePath;
            if (file.startsWith('components')) {
              destFileAbsolutePath = path.join(destDirPath, file);
            } else if (file.startsWith('layouts')) {
              let basename = path.basename(file);
              if (basename.endsWith('.js') || basename.endsWith('.jsx')) {
                if (basename.endsWith('.jsx')) {
                  basename = basename.replace(basename, `${data.name}.jsx`);
                }
                destFileAbsolutePath = path.resolve(destDirPath, basename);
              } else {
                destFileAbsolutePath = path.resolve(
                  destDirPath,
                  `scss/${basename}`
                );
              }
            }

            queue.push(
              renderTemplateFile(
                sourceFileAbsolutePath,
                destFileAbsolutePath,
                data
              )
            );
          });
        });

        Promise.all(queue)
          .then(resolve)
          .catch(reject);
      }
    );
  });
}

/**
 * 将一个文件的模板内容进行渲染
 *
 * @param {String} sourceFile
 * @param {String} filePath
 * @param {Object} data 模板对应数据
 * @return {Promise}
 */
function renderTemplateFile(sourceFile, filePath, data) {
  return new Promise((resolve, reject) => {
    fs.readFile(sourceFile, 'utf-8', (err, content) => {
      if (err) {
        return reject(err);
      }

      try {
        let renderedContent = ejs.render(content, data);
        const extname = path.extname(sourceFile);
        renderedContent = prettierFormat(renderedContent, {
          parser: /\.jsx?/i.test(extname) ? 'babylon' : 'scss',
        });

        write(filePath, renderedContent, (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      } catch (e) {
        reject(e);
      }
    });
  });
}

function upperCase(str) {
  return str.toLowerCase().replace(/( |^)[a-z]/g, (L) => {
    return L.toUpperCase();
  });
}

function getLayoutDependencies() {
  return [
    '@icedesign/base',
    '@icedesign/form-binder',
    '@icedesign/img',
    '@icedesign/layout',
    '@icedesign/menu',
    '@icedesign/skin',
    'classnames',
    'foundation-symbol',
    'react',
    'react-dom',
  ];
}
