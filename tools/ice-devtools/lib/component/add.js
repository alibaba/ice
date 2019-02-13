const debug = require('debug')('ice:add:block');
const inquirer = require('inquirer');
const { existsSync: exists } = require('fs');
const path = require('path');
const chalk = require('chalk');
const home = require('user-home');
const { sync: rm } = require('rimraf');
const ora = require('ora');
const kebabCase = require('kebab-case');
const validateName = require('validate-npm-package-name');

const logger = require('../../utils/logger');
const download = require('../../utils/download');
const generate = require('../../utils/generate');

/**
 * @param{String} type 类型
 * @param{String} cwd 当前路径
 * @param{Object} opt 参数
 */
module.exports = async function addComponent(type, cwd, opt, ...argvOpts) {
  if (opt.hasArgvOpts) {
    await execArgv(cwd, ...argvOpts);
  } else {
    await execAsk(type, cwd, opt, ...argvOpts);
  }
};

async function execArgv(cwd, ...argvOpts) {
  const prefix = getPrefix(cwd, argvOpts);
  const name = await getName(prefix);
  const npmName = await getNpmName(name, prefix);
  const source = argvOpts[1];
  const dest = path.join(cwd, name);

  if (exists(dest)) {
    logger.fatal(`${name} already exists`);
  }

  generateTemplate({ name, npmName, source, dest });
}

function defaultQuestion(prefix) {
  return [
    {
      type: 'input',
      name: 'componentName',
      message: 'block name (e.g. ExampleComponent)',
      validate: (value) => {
        if (!/^[A-Z][a-zA-Z0-9]*$/.test(value)) {
          return 'Name must be a Upper Camel Case word, e.g. ExampleComponent.';
        }
        const npmName = getNpmName(value, prefix);
        if (!validateName(npmName).validForNewPackages) {
          return `this block name(${npmName}) has already exist. please retry`;
        }
        return true;
      },
    },
  ];
}

async function execAsk(type, cwd, opt = {}, argvOpts) {
  const templateName = `@icedesign/ice-${type}-component-template`;
  const source = await downloadTemplate(templateName);

  const prefix = getPrefix(opt);
  const name = await getName(prefix);
  const npmName = getNpmName(name, prefix);
  const dest = opt.standalone ? cwd : path.join(cwd, 'components', name);

  generateTemplate({ name, npmName, source, dest, standalone : opt.standalone });
}

/**
 * 获取组件的文件名
 */
async function getName(prefix) {
  const questions = defaultQuestion(prefix);
  const { componentName } = await inquirer.prompt(questions);
  return componentName;
}

/**
 * 获取包名前缀
 */
function getPrefix(opt = {}) {
  let prefix = '';

  // 独立开发组件
  if (opt.scope) {
    prefix = `${opt.scope}/`;
  } else if (opt.pkg) {
    prefix = `${opt.pkg.name}-`;
  }

  return prefix;
}

/**
 * 获取组件的 npm 名
 * @param {string} name
 */
function getNpmName(name, prefix) {
  const kebabCaseName = kebabCase(name).replace(/^-/, '');

  return prefix + kebabCaseName;
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
  if (exists(tmp)) rm(tmp);
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

/**
 * 生成模板
 * @param {string} name
 * @param {string} npmName
 * @param {string} source
 * @param {string} dest
 */
function generateTemplate({ name, npmName, source, dest, standalone }) {
  generate(name, npmName, source, dest, (err, callback) => {
    if (err) {
      logger.fatal(err);
    }
    completedMessage(name, dest, standalone);
    callback();
  });
}

/**
 * 区块下载完成后的提示信息
 * @param {string} name 组件名称
 * @param {string} path 组件路径
 */
function completedMessage(name, path, standalone) {
  console.log();
  console.log(`Success! Created ${name} at ${path}`);
  console.log(`Inside ${name} directory, you can run several commands:`);
  console.log();
  console.log('  Starts the development server.');
  if (!standalone) {
    console.log(chalk.cyan(`    cd components/${name}`));
  }
  console.log(chalk.cyan('    npm install'));
  console.log(chalk.cyan('    npm start'));
  console.log();
  console.log(
    '  When the development is complete, you need to run npm publish'
  );
  console.log(chalk.cyan('    npm publish'));
  console.log();
}
