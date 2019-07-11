const inquirer = require('inquirer');
const chalk = require('chalk');
const { checkAliInternal } = require('ice-npm-utils');
const rimraf = require('rimraf');
const logger = require('../utils/logger');
const getTemplate = require('../utils/template');
const checkEmpty = require('../utils/check-empty');

const DEFAULT_TYPES = ['material', 'component', 'block', 'scaffold'];

module.exports = async function init(cwd) {
  try {
    // check current directory empty
    const go = await checkEmpty(cwd);
    if (!go) process.exit(1);

    const options = Object.assign({
      cwd,
      template: process.env.TEMPLATE, // --template
    });

    const type = process.env.TYPE || 'material'; // --type

    if (!DEFAULT_TYPES.includes(type)) {
      throw new Error('Invalid type, `type` must be component/block/scaffold.');
    }

    // get user answers
    const { template, scope, forInnerNet } = await initAsk(options);
    const npmPrefix = scope ? `${scope}/` : '';
    const { templatePath, downloadPath, config: materialConfig } = await getTemplate(cwd, type, template);

    if (type === 'material') {
      // init material project
      /* eslint-disable-next-line import/no-dynamic-require */
      await require('./material/init')(cwd, {
        npmPrefix,
        template,
        templatePath,
        forInnerNet,
        standalone: true,
        materialConfig,
      });
    } else {
      // init single component/block/scaffold project
      /* eslint-disable-next-line import/no-dynamic-require */
      await require('./material/add')(cwd, {
        type,
        npmPrefix,
        template,
        templatePath,
        forInnerNet,
        standalone: true,
        materialConfig,
      });
    }

    rimraf.sync(downloadPath);
  } catch (error) {
    logger.fatal(error);
  }
};

async function initAsk(options = {}) {
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
    scope,
    template,
    forInnerNet,
  };
}
