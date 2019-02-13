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
module.exports = async function addBlock(type, cwd, opt, ...argvOpts) {
  if (opt.hasArgvOpts) {
    await execArgv(cwd, opt, ...argvOpts);
  } else {
    await execAsk(type, cwd, opt, ...argvOpts);
  }
};

async function execArgv(cwd, opt, ...argvOpts) {
  const blockName = await getBlockName();
  const blockNpmName = await getBlockNpmName(blockName);
  const blockSource = opt.templateSource;
  const blockDest = path.join(cwd, blockName);

  if (exists(blockDest)) {
    logger.fatal(`${blockName} already exists`);
  }

  generateTemplate({ blockName, blockNpmName, blockSource, blockDest });
}

function defaultQuestion(opt) {
  return [
    {
      type: 'input',
      name: 'blockName',
      message: 'block name (e.g. ExampleBlock)',
      validate: (value) => {
        if (!/^[A-Z][a-zA-Z0-9]*$/.test(value)) {
          return 'Name must be a Upper Camel Case word, e.g. ExampleBlock.';
        }
        const npmName = getBlockNpmName(value, opt);
        if (!validateName(npmName).validForNewPackages) {
          return `this block name(${npmName}) has already exist. please retry`;
        }
        return true;
      },
    },
  ];
}

async function execAsk(type, cwd, opt, argvOpts) {
  const templateName = `@icedesign/ice-${type}-block-template`;
  const blockSource = await downloadTemplate(templateName);
  const blockName = await getBlockName(opt);
  const blockNpmName = getBlockNpmName(blockName, opt);
  const blockDest = path.join(cwd, 'blocks', blockName);

  generateTemplate({ blockName, blockNpmName, blockSource, blockDest });
}

/**
 * 获取区块的文件名
 */
async function getBlockName(opt = {}) {
  const questions = defaultQuestion(opt); 
  const { blockName } = await inquirer.prompt(questions);
  return blockName;
}

/**
 * 获取区块的 npm 名
 * @param {string} blockName
 */
function getBlockNpmName(blockName, opt = {}) {
  const blockKebabCase = kebabCase(blockName).replace(/^-/, '');

  let npmName;

  if (opt.scope) {
    npmName = opt.scope + '/' + blockKebabCase;
  } else if (opt.pkg && opt.pkg.name) {
    npmName = `${opt.pkg.name}-${blockKebabCase}`;
  } else {
    npmName = blockKebabCase;
  }
  return npmName;
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
 * @param {string} blockName
 * @param {string} blockNpmName
 * @param {string} blockSource
 * @param {string} blockDest
 */
function generateTemplate({ blockName, blockNpmName, blockSource, blockDest }) {
  generate(blockName, blockNpmName, blockSource, blockDest, (err, callback) => {
    if (err) {
      logger.fatal(err);
    }
    completedMessage(blockName, blockDest);
    callback();
  });
}

/**
 * 区块下载完成后的提示信息
 * @param {string} blockName 区块名称
 * @param {string} blockPath 区块路径
 */
function completedMessage(blockName, blockPath) {
  console.log();
  console.log(`Success! Created ${blockName} at ${blockPath}`);
  console.log(`Inside ${blockName} directory, you can run several commands:`);
  console.log();
  console.log('  Starts the development server.');
  console.log(chalk.cyan(`    cd blocks/${blockName}`));
  console.log(chalk.cyan('    npm install'));
  console.log(chalk.cyan('    npm start'));
  console.log();
  console.log(
    '  When the development is complete, you need to run npm publish'
  );
  console.log(
    '  Contains screenshots and build, equivalent to npm run build && npm run screenshoy'
  );
  console.log(chalk.cyan('    npm publish'));
  console.log();
}
