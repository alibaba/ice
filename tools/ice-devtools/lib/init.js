const inquirer = require('inquirer');
const chalk = require('chalk');
const { checkAliInternal } = require('ice-npm-utils');

const logger = require('../utils/logger');
const checkEmpty = require('../utils/check-empty');
const add = require('./add');

module.exports = async function init(cwd) {
  try {
    // check current directory empty
    const go = await checkEmpty(cwd);
    if (!go) process.exit(1);

    const options = Object.assign({
      cwd,
      type: process.env.TYPE, // --type
      template: process.env.TEMPLATE, // --template
    });

    // get user answers
    const answers = await initAsk(options);
    add(cwd, { ...answers });
  } catch (error) {
    logger.fatal(error);
  }
};


async function initAsk(options = {}) {
  const types = ['material', 'scaffold', 'component', 'block'];
  let type = options.type;

  // confirm init type
  if (!type || !types.includes(type)) {
    const result = await inquirer.prompt([
      {
        type: 'list',
        message: 'please select the material type',
        name: 'type',
        default: types[0],
        choices: types,
      },
    ]);
    type = result.type;
  } else {
    console.log(`you assign the type ${chalk.cyan(type)} by --type`);
  }

  // select template
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
    console.log(`you assign the template ${chalk.cyan(template)} by --template`);
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
