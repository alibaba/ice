/* eslint no-shadow:0, prefer-promise-reject-errors: 0, import/no-dynamic-require: 0 */
const ejs = require('ejs');
const path = require('path');
const fs = require('fs');
const write = require('write');
const glob = require('glob');
const chalk = require('chalk');
const rimraf = require('rimraf');
const ejsLint = require('ejs-lint');
const read = require('fs-readdir-recursive');
const fileMapping = require('./fileMaping');

const cwd = process.cwd();

const sourceDirPath = path.join(cwd, 'templates');

/**
 * 模板生成入口
 * @param {Object} templateConfig
 */
module.exports = function generatorTemplate(templateConfig = {}) {
  return new Promise((resolve, reject) => {
    // 检测目录是否存在
    if (!fs.existsSync(templateConfig.directory)) {
      throw new Error('自定义布局必须指定项目目录');
    }

    // 检测模板名称是否存在，不存在则使用默认
    if (!templateConfig.name) {
      templateConfig.name = 'app';
    }

    // 生成目录
    const destDirPath = path.join(
      templateConfig.directory,
      templateConfig.name
    );

    // 判断新添加的模板名是否已经存在
    if (fs.existsSync(destDirPath)) {
      rimraf.sync(destDirPath);
      console.log(chalk.red('已经删除存在相同名称的项目'));
      // throw chalk.red(new Error('已经存在相同的名称，请重新输入'));
    }

    /**
     * 根据模板文件生成自定义的项目文件
     * @param  {String} sourceDirPath   模板文件路径
     * @param  {String} destDirPath     项目文件生成路径
     * @param  {String} templateConfig  用户自定义模板的配置
     */
    return renderDirFiles(sourceDirPath, destDirPath, templateConfig)
      .then(() => {
        const templateDependencies = getTemplateDependencies();
        resolve(templateDependencies);
      })
      .catch(reject);
  });
};

/**
 * 根据选项组合模板文件
 * @param {string} sourceFile 模板文件
 * @param {Object} data       选项数据
 *
 * data: {
 *   mockModule: true,
 *   reduxModule: true,
 *   authorityModule: false,
 *   registerLoginModule: false,
 *   ...
 * }
 *
 */
function composeTemplateFile(sourceFile, data) {
  return new Promise((resolve, reject) => {
    if (!data || isEmpty(data)) {
      return reject('参数不存在或者参数格式不对');
    }

    // 准备文件
    let moduleFiles = [];

    // 添加 Mock 文件
    if (data.mockModule) {
      moduleFiles = moduleFiles.concat(fileMapping.mockModule);
    }

    if (data.reduxModule) {
      moduleFiles = moduleFiles.concat(fileMapping.reduxModule);
      if (data.registerLoginModule) {
        moduleFiles = moduleFiles.concat(fileMapping.registerLoginModule);
      }
    }

    if (data.authorityModule) {
      moduleFiles = moduleFiles.concat(fileMapping.authorityModule);
    }

    moduleFiles = [].concat(fileMapping.baseFiles, moduleFiles);

    // 根据配置文件将带 * 的文件转换出来，找到该目录下的所有文件
    const moduleNames = moduleFiles.filter((item) => /\/\*$/.test(item));
    const baseFiles = moduleFiles.filter((item) => !/\/\*$/.test(item));

    let transformModuleFiles = [];
    moduleNames.forEach((item) => {
      const moduleArr = item.split('/');
      const moduleName = moduleArr.slice(0, moduleArr.length - 1).join('/');
      const modulePath = path.join(cwd, 'templates', moduleName);
      const moduleFiles = read(modulePath);
      const files = moduleFiles.map((moduleFile) => {
        return `${moduleName}/${moduleFile}`;
      });

      transformModuleFiles = transformModuleFiles.concat(files);
    });

    // TODO: 检查当前文件是否存在，与源文件进行对比
    // 遍历 sourceFile 和 projectFiles，projectFiles 的文件一定需要在 sourceFiles 中

    const projectFiles = [].concat(baseFiles, transformModuleFiles);

    chalk.green(console.log({ projectFiles }));

    resolve(projectFiles);
  });
}

/**
 * 将一个目录下的所有文件遍历渲染
 * @param  {Strign} sourceDirPath  模板所在目录一个临时文件夹
 * @param  {String} destDirPath   目标文件夹
 * @param  {Object} data          数据，使用 ejs 渲染
 * @return {Promise}
 */
function renderDirFiles(sourceDirPath, destDirPath, data) {
  console.log('data =========:', data);
  return new Promise((resolve, reject) => {
    glob(
      '**/*',
      { cwd: sourceDirPath, nodir: true, dot: true },
      (err, files) => {
        if (err) {
          return reject(err);
        }

        // 根据 templateConfig 对 template 文件进行过滤并生成对应的文件
        return composeTemplateFile(files, data).then((res) => {
          const queue = res.map((file) => {
            const sourceFileAbsolutePath = path.resolve(sourceDirPath, file);
            const destFileAbsolutePath = path.resolve(destDirPath, file);

            return renderTemplateFile(
              sourceFileAbsolutePath,
              destFileAbsolutePath,
              data
            );
          });

          Promise.all(queue)
            .then(resolve)
            .catch(reject);
        });
      }
    );
  });
}

/**
 * 将一个文件的模板内容进行渲染
 *
 * @param {String} sourceFile
 * @param {String} filePath
 * @param {Object} data
 * @return {Promise}
 */
function renderTemplateFile(sourceFile, filePath, data) {
  return new Promise((resolve, reject) => {
    fs.readFile(sourceFile, 'utf-8', (err, content) => {
      if (err) {
        return reject(`${sourceFile}:${err}`);
      }

      // 渲染模板内容
      try {
        const extname = path.extname(sourceFile);

        let renderedContent;
        if (/\.(png|jpg|jpeg|gif|svg)$/i.test(extname)) {
          renderedContent = content;
        } else {
          // 检查模板 ejs 预发错误
          const checkResult = ejsLint(content);
          if (checkResult) {
            const err = `${sourceFile}: ${checkResult}`;
            return reject(err);
          }

          renderedContent = ejs.render(content, data);
        }

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

function getTemplateDependencies() {
  const pkgPath = path.join(sourceDirPath, 'package.json');
  const pkgData = require(pkgPath);
  const allDependencies = Object.assign(
    {},
    pkgData.dependencies,
    pkgData.devDependencies
  );
  return allDependencies;
}

function isEmpty(obj) {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
}
