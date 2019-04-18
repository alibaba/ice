/**
 * 根据物料模板 npm 包名初始化部分物料：区块、业务组件
 */
const path = require('path');
const fse = require('fs-extra');
const fs = require('fs');
const { promisify } = require('util');
const Handlebars = require('handlebars');
const camelCase = require('camelcase');
const inquirer = require('inquirer');
const log = require('../utils/log');
const download = require('./download');

module.exports = ({ template, projectDir, type }) => {
  const tempDir = path.resolve(projectDir, '.temp');
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
          return promisify(fs.readFile)(filePath).then((data) => {
            let newData;
            try {
              newData = Handlebars.compile(data.toString())(answerOptions);
            } catch (err) {
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
  return inquirer.prompt({
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
  }).then((answer) => {
    const { npmName } = answer;
    // @icedesign/example-block | example-block
    const name = npmName.split('/')[1] || npmName.split('/')[0];
    const className = camelCase(name, { pascalCase: true });

    return {
      npmName,
      name,
      className,
      author: '',
      title: `Example ${type}`,
      description: `Example ${type}`,
      version: '1.0.0',
      categories: ['其他'],
    };
  });
}
