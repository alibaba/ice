'use strict';

/**
 * init block
 */
const path = require('path');
const inquirer = require('inquirer');
const kebabCase = require('kebab-case');
const generator = require('../generator');
const { BLOCK_CATEGORIES } = require('../config/dict');

const INIT_BLOCK_QUESTIONS = [
  {
    type: 'input',
    name: 'className',
    message: 'Block 名称',
    default: 'ExampleBlock',
    validate: function(value) {
      if (!/^[A-Z][a-zA-Z0-9]*$/.test(value)) {
        return 'Block 名不合法，必须是大驼峰写法(以大写字母开头并且由小写字母数字组成)! 请重新输入';
      }
      return true;
    },
  },
  {
    type: 'input',
    name: 'title',
    message: 'Block 中文名',
    default: null,
    validate: function(value) {
      value = value.trim();
      if (!value) {
        return '组件中文名不合法，不能为空! 请重新输入';
      }
      return true;
    },
  },
  {
    type: 'checkbox',
    name: 'categories',
    message: '请选择一种所属的类型',
    choices: BLOCK_CATEGORIES,
    validate: (answer) => {
      if (answer.length < 1) {
        return '必须选择一种类型';
      }
      return true;
    },
    filter: (answer) => {
      return answer;
    },
  },
  {
    type: 'input',
    name: 'description',
    message: 'Block 简介, 可为空',
    default: '',
  },
  {
    type: 'input',
    name: 'authorName',
    message: '作者',
    default: '',
    validate: function(input) {
      if (!input) {
        return '输入不合法，不能未空! 请输入';
      }
      return true;
    },
  },
  {
    type: 'input',
    name: 'authorEmail',
    message: '作者邮箱',
    default: '',
  },
];

const initBlock = (template, callback) => {
  inquirer.prompt(INIT_BLOCK_QUESTIONS).then((answers) => {
    const destDir = path.resolve(process.cwd(), './');
    answers.npmName = kebabCase(answers.className).replace(/^-/, '');

    generator({
      type: 'block',
      destDir: destDir,
      abcPath: destDir,
      template: template,
      templateOptions: answers,
    })
      .then(() => {
        console.log('\n  Block 初始化完成，执行 npm start 开始开发吧~  \n');
        return callback && callback(null, destDir);
      })
      .catch((err) => {
        return callback && callback(err);
      });
  });
};

module.exports = initBlock;
