const inquirer = require('inquirer');
const chalk = require('chalk');
const { checkAliInternal } = require('ice-npm-utils');
const path = require('path');
const { existsSync } = require('fs');
const ora = require('ora');
const home = require('user-home');
const { sync: rm } = require('rimraf');
const debug = require('debug')('ice:add:general');

const logger = require('../utils/logger');
const download = require('../utils/download');
const { isLocalPath } = require('../utils/local-path');
const checkEmpty = require('../utils/check-empty');

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
    const { type, template, scope, forInnerNet } = await initAsk(options);
    const npmPrefix = scope ? `${scope}/` : '';
    const templatePath = await getTemplatePath(type, template);

    if (type === 'material') {
      // init material project
      /* eslint-disable-next-line import/no-dynamic-require */
      require('./material/init')(cwd, {
        npmPrefix,
        template,
        templatePath,
        forInnerNet,
        standalone: true,
      });
    } else {
      // init single component/block/scaffold project
      /* eslint-disable-next-line import/no-dynamic-require */
      require(`./${type}/add`)(cwd, {
        npmPrefix,
        templatePath,
        forInnerNet,
        standalone: true,
      });
    }
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

/**
 * 获取模板路径
 *
 * @param {string} type
 * @param {string} template
 */
async function getTemplatePath(type, template) {
  // from local path
  if (template && isLocalPath(template)) {
    const templatePath = path.join(template, type === 'material' ? 'template' : `template/${type}`);
    if (existsSync(templatePath)) {
      return templatePath;
    }
    logger.fatal(`template is not found in ${templatePath}`);
  }

  // form npm package
  const tmp = await downloadTemplate(template);
  return path.join(tmp, type === 'material' ? 'template' : `template/${type}`);
}

/**
 * 下载模板
 *
 * @param {String} template
 */
function downloadTemplate(template) {
  const downloadspinner = ora('downloading template');
  downloadspinner.start();

  const tmp = path.join(home, '.ice-templates', template);
  debug('downloadTemplate', template);
  if (existsSync(tmp)) rm(tmp);
  return download({ template })
    .then(() => {
      downloadspinner.stop();
      return tmp;
    })
    .catch((err) => {
      downloadspinner.stop();
      logger.fatal(`Failed to download repo ${template} : ${err.message}`);
    });
}
