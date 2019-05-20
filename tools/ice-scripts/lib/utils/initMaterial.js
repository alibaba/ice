/**
 * 根据物料模板 npm 包名初始化部分物料：区块、业务组件
 */
const path = require('path');
const fse = require('fs-extra');
const fs = require('fs');
const { promisify } = require('util');
const ejs = require('ejs');
const camelCase = require('camelcase');
const inquirer = require('inquirer');
const { getNpmRegistry } = require('ice-npm-utils');
const log = require('./log');
const download = require('./download');

module.exports = ({ template, projectDir, type }) => {
  const tempDir = path.resolve(projectDir, '.ice_scripts_temp');
  let answerOptions;

  return getAnswerOptions(type)
    .then((options) => {
      answerOptions = options;
      return fse.ensureDir(tempDir);
    })
    .then(() => {
      return download({
        npmName: template,
        projectDir: tempDir,
        formatFile: (filePath) => {
          if (/\.png$/.test(filePath)) {
            return Promise.resolve();
          }

          return promisify(fs.readFile)(filePath).then((data) => {
            let newData;
            try {
              newData = ejs.render(data.toString(), answerOptions);
            } catch (err) {
              log.warn('模板编译出错', filePath);
              console.log(err);
              newData = data.toString();
            }
            return promisify(fs.writeFile)(filePath, newData);
          });
        },
      });
    })
    .then(() => {
      // copy block/scaffold/component
      log.info('start copy material file');
      const materialDir = path.resolve(tempDir, 'template', type);
      return fse.copy(materialDir, projectDir);
    })
    .then(() => {
      if (answerOptions.adaptor) {
        log.info('start copy adaptor folder');
        const adaptorDir = path.join(__dirname, '../template/component');
        return fse.copy(adaptorDir, projectDir);
      }
      return Promise.resolve();
    })
    .then(() => {
      log.info('start remove temp dir');
      return fse.remove(tempDir);
    });
};

/**
 * 交互式询问相关信息，这些字段在生成文件时需要替换文件里的 hb 变量
 *
 * 依赖字段：
 *  - npmName(@icedesign/example-block), name(example-block), className(ExampleBlok),
 *  - author, title, version, description, categories(scaffold 没有)
 */
function getAnswerOptions(type) {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'npmName',
      dafault: 'test-npm-package',
      transformer: (value) => {
        return value.trim();
      },
      validate: (value) => {
        if (!(value.trim())) {
          return '必填字段';
        }
        return true;
      },
      message: '请输入 npm 包名，如（@icedesign/test）',
    },
    type === 'component' ? {
      type: 'confirm',
      name: 'adaptor',
      message: '组件是否需要接入Fusion Cool & 设计板块 ？',
      default: false,
    } : false,
  ].filter((v) => v)).then((answer) => {
    const { npmName, adaptor } = answer;
    // @icedesign/example-block | example-block
    const name = npmName.split('/')[1] || npmName.split('/')[0];
    const className = camelCase(name, { pascalCase: true });

    return {
      npmName,
      adaptor,
      name,
      className,
      author: '',
      title: `Example ${type}`,
      description: `Example ${type}`,
      version: '1.0.0',
      categories: {
        其他: true,
      },
      registry: getNpmRegistry(npmName),
    };
  });
}
