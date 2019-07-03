const inquirer = require('inquirer');
const path = require('path');
const chalk = require('chalk');
const validateName = require('validate-npm-package-name');

const logger = require('../../utils/logger');
const templateRender = require('../../utils/template-render');
const { generateNpmNameByPrefix } = require('../../utils/npm');
const boxenLog = require('../../utils/boxen-log');
const meta = require('./meta');

/**
 * @param{String} cwd 当前路径
 * @param{Object} opt 参数
 */
module.exports = async function addBlock(cwd, opt = {}) {
  const {
    npmPrefix,
    templatePath: src,
    standalone,
    materialConfig,
  } = opt;

  const questions = defaultQuestion(npmPrefix);
  const { name } = await inquirer.prompt(questions);
  const npmName = generateNpmNameByPrefix(name, npmPrefix);
  const dest = standalone ? cwd : path.join(cwd, 'blocks', name);

  try {
    await templateRender({
      src,
      dest,
      name,
      npmName,
      meta,
      materialConfig,
      skipGitIgnore: !standalone, // 物料仓库中，不处理 _gitignore 文件
    });
    completedMessage(name, dest, standalone);
  } catch (e) {
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
 * @param {boolean} standalone
 */
function completedMessage(blockName, blockPath, standalone) {
  boxenLog(`
    Success! Created ${blockName} at ${blockPath}
    Inside ${blockName} directory, you can run several commands:

      Starts the development server.
    ${!standalone ? chalk.cyan(`    cd blocks/${blockName}`) : ''}
    ${chalk.cyan('    npm install')}
    ${chalk.cyan('    npm start')}

      When the development is complete, you need to run npm publish
      Contains screenshots and build, equivalent to npm run build && npm run screenshoy
    ${chalk.cyan('    npm publish')}
  `);
}
