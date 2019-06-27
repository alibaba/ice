const inquirer = require('inquirer');
const path = require('path');
const chalk = require('chalk');
const validateName = require('validate-npm-package-name');
const boxenLog = require('../../utils/boxen-log');

const logger = require('../../utils/logger');
const templateRender = require('../../utils/template-render');
const { generateNpmNameByPrefix } = require('../../utils/npm');
const meta = require('./meta');

/**
 * @param{String} cwd 当前路径
 * @param{Object} opt 参数
 */
module.exports = async function addScaffold(cwd, opt = {}) {
  const {
    npmPrefix,
    templatePath: src,
    standalone,
  } = opt;

  const questions = defaultQuestion(npmPrefix);
  const { name } = await inquirer.prompt(questions);
  const npmName = generateNpmNameByPrefix(name, npmPrefix);
  const dest = standalone ? cwd : path.join(cwd, 'scaffolds', name);

  try {
    await templateRender({
      src,
      dest,
      name,
      npmName,
      meta,
      skipGitIgnore: !standalone, // 物料仓库中，不处理 _gitignore 文件
    });
    completedMessage(name, dest, standalone);
  } catch (err) {
    logger.fatal(err);
  }
};

function defaultQuestion(npmPrefix) {
  return [
    {
      type: 'input',
      name: 'name',
      message: 'scaffold name',
      validate: (value) => {
        value = value.trim();
        if (!value) {
          return 'scaffold name cannot be empty';
        }
        const name = generateNpmNameByPrefix(value, npmPrefix);
        if (!validateName(name).validForNewPackages) {
          return `this scaffold name(${name}) has already exist. please retry`;
        }
        return true;
      },
    },
  ];
}

/**
 * 脚手架下载完成后的引导提示信息
 * @param {string} scaffoldName 脚手架模板名称
 * @param {string} scaffoldPath 脚手架模板路径
 * @param {string} standalone   独立脚手架模式
 */
function completedMessage(scaffoldName, scaffoldPath, standalone) {
  boxenLog(`
    Success! Created ${scaffoldName} at ${scaffoldPath}
    Inside ${scaffoldName} directory, you can run several commands:

      Starts the development server.
    ${!standalone ? chalk.cyan(`    cd scaffolds/${scaffoldName}`) : ''}
    ${chalk.cyan('    npm install')}
    ${chalk.cyan('    npm start')}

      When the development is complete, you need to run npm publish
      Contains screenshots and build, equivalent to npm run build && npm run screenshoy
    ${chalk.cyan('    npm publish')}
  `);
}
