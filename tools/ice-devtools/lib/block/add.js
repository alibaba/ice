const inquirer = require('inquirer');
const path = require('path');
const chalk = require('chalk');
const validateName = require('validate-npm-package-name');

const logger = require('../../utils/logger');
const generate = require('../../utils/generate');
const { generateNpmNameByPrefix } = require('../../utils/npm');
const meta = require('./meta');

/**
 * @param{String} cwd 当前路径
 * @param{Object} opt 参数
 */
module.exports = async function addBlock(cwd, opt = {}) {
  const {
    npmPrefix,
    templatePath : src,
    standalone
  } = opt;

  const questions = defaultQuestion(npmPrefix); 
  const { name } = await inquirer.prompt(questions);
  const npmName = generateNpmNameByPrefix(name, npmPrefix);
  const dest = standalone ? cwd : path.join(cwd, 'blocks', name);

  try {
    await generate({
      src,
      dest,
      name,
      npmName,
      meta,
      skipGitIgnore: !standalone // 物料仓库中，不处理 _gitignore 文件
    });
    completedMessage(name, dest, standalone);
  } catch(e) {
    logger.fatal(e);
  }
};

function defaultQuestion(npmPrefix) {
  return [
    {
      type: 'input',
      name: 'name',
      message: 'block name (e.g. ExampleBlock)',
      validate: (value) => {
        if (!/^[A-Z][a-zA-Z0-9]*$/.test(value)) {
          return 'Name must be a Upper Camel Case word, e.g. ExampleBlock.';
        }
        const npmName = generateNpmNameByPrefix(value, npmPrefix);
        if (!validateName(npmName).validForNewPackages) {
          return `this block name(${npmName}) has already exist. please retry`;
        }
        return true;
      },
    },
  ];
}

/**
 * 区块下载完成后的提示信息
 * @param {string} blockName 区块名称
 * @param {string} blockPath 区块路径
 */
function completedMessage(blockName, blockPath, standalone) {
  console.log();
  console.log(`Success! Created ${blockName} at ${blockPath}`);
  console.log(`Inside ${blockName} directory, you can run several commands:`);
  console.log();
  console.log('  Starts the development server.');
  if (!standalone) {
    console.log(chalk.cyan(`    cd blocks/${blockName}`));
  }
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
