const fs = require('fs');
const inquirer = require('inquirer');
const chalk = require('chalk');
const { checkAliInternal } = require('ice-npm-utils');

const logger = require('../utils/logger');
const add = require('./add');

module.exports = async function init(cwd) {
  try {
    // 检查当前目录是否为空
    if (fs.readdirSync(cwd).length) {
      logger.fatal('Workdir %s is not empty.', cwd);
    }

    const options = Object.assign({
      cwd,
      type: process.env.TYPE, // --type --template
      template: process.env.TEMPLATE,
    });

    // 获取用户参数
    const answers = await initAsk(options);

    add(cwd, {
      ...answers,
    });
  } catch (error) {
    logger.fatal(error);
  }
};

/**
 * 初始询问
 */
async function initAsk(options = {}) {
  // 获取物料类型
  const types = ['material', 'scaffold', 'component', 'block'];
  let type = options.type;
  if (!type || !types.includes(type)) {
    const result = await inquirer.prompt([
      {
        type: 'list',
        message: 'please select the material type',
        name: 'type',
        default: types[0],
        require: true,
        choices: types,
      },
    ]);
    type = result.type;
  } else {
    console.log(`you assign the type ${chalk.red(type)} by --type`);
  }

  // 获取模板
  let template = options.template;
  if (!template) {
    const result = await (
      inquirer.prompt([
        {
          type: 'list',
          message: 'please select the initial material template?',
          name: 'template',
          default: '@icedesign/ice-react-material-template',
          choices: [
            {
              name: '@icedesign/ice-react-material-template (React 标准模板)',
              value: '@icedesign/ice-react-material-template',
            },
            {
              name: '@icedesign/ice-vue-material-template (Vue 标准模板)',
              value: '@icedesign/ice-vue-material-template',
            },
            {
              name: '@icedesign/ice-angular-material-template (Angular 标准模板)',
              value: '@icedesign/ice-angular-material-template',
            },
          ],
        },
      ]));
    template = result.template;
  } else {
    console.log(`you assign the template ${chalk.red(template)} by --template`);
  }

  const isInnerNet = await checkAliInternal();
  const { forInnerNet } = await (isInnerNet
    ? inquirer.prompt([
      {
        type: 'confirm',
        message: '当前处于阿里内网环境,生成只在内网可用的物料',
        name: 'forInnerNet',
      },
    ])
    : { forInnerNet: false });

  const { scope } = forInnerNet ? await inquirer.prompt([
    {
      type: 'list',
      message: 'please select the npm scope',
      name: 'scope',
      default: '@ali',
      choices: [
        '@ali',
        '@alife',
      ],
    },
  ]) : await inquirer.prompt([
    {
      type: 'input',
      message: 'npm scope (optional)',
      name: 'scope',
    },
  ]);

  return {
    type,
    scope,
    template,
    forInnerNet,
  };
}
