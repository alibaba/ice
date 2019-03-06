const inquirer = require('inquirer');
const path = require('path');
const chalk = require('chalk');
const kebabCase = require('kebab-case');
const validateName = require('validate-npm-package-name');

const logger = require('../../utils/logger');
const generate = require('../../utils/generate');
const meta = require('./meta');

/**
 * @param{String} cwd 当前路径
 * @param{Object} opt 参数
 */
module.exports = async function addBlock(cwd, opt = {}) {
  const {
    npmPrefix,
    templatePath : src
  } = opt;

  const name = await getBlockName(npmPrefix);
  const npmName = getNpmName(name, npmPrefix);
  const dest = path.join(cwd, 'blocks', name);

  generate({
    src,
    dest,
    name,
    npmName,
    ...meta,
    callback: (err) => {
      if (err) {
        logger.fatal(err);
      }
      completedMessage(name, dest);
    }
  });
};

function defaultQuestion(npmPrefix) {
  return [
    {
      type: 'input',
      name: 'blockName',
      message: 'block name (e.g. ExampleBlock)',
      validate: (value) => {
        if (!/^[A-Z][a-zA-Z0-9]*$/.test(value)) {
          return 'Name must be a Upper Camel Case word, e.g. ExampleBlock.';
        }
        const npmName = getNpmName(value, npmPrefix);
        if (!validateName(npmName).validForNewPackages) {
          return `this block name(${npmName}) has already exist. please retry`;
        }
        return true;
      },
    },
  ];
}

/**
 * 获取区块的文件名
 */
async function getBlockName(npmPrefix) {
  const questions = defaultQuestion(npmPrefix); 
  const { blockName } = await inquirer.prompt(questions);
  return blockName;
}

/**
 * 获取区块的 npm 名
 * @param {string} blockName
 */
function getNpmName(blockName, npmPrefix) {
  return npmPrefix + kebabCase(blockName).replace(/^-/, '');
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
