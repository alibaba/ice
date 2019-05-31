const inquirer = require('inquirer');
const path = require('path');
const fse = require('fs-extra');
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
module.exports = async function addComponent(cwd, opt = {}) {
  const {
    npmPrefix,
    templatePath: src,
    standalone,
  } = opt;

  const questions = defaultQuestion(npmPrefix);
  const { name, adaptor } = await inquirer.prompt(questions);
  const npmName = generateNpmNameByPrefix(name, npmPrefix);
  const dest = standalone ? cwd : path.join(cwd, 'components', name);

  if (adaptor) {
    // copy template adaptor to src
    const adaptorDir = path.join(__dirname, '../../template/component');
    fse.copySync(adaptorDir, src);
  }

  try {
    await generate({
      src,
      dest,
      name,
      npmName,
      adaptor,
      meta,
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
      type: 'confirm',
      name: 'adaptor',
      message: '组件是否需要接入 Fusion Cool & 设计板块？',
      default: false,
    },
    {
      type: 'input',
      name: 'name',
      message: 'component name (e.g. ExampleComponent)',
      validate: (value) => {
        if (!/^[A-Z][a-zA-Z0-9]*$/.test(value)) {
          return 'Name must be a Upper Camel Case word, e.g. ExampleComponent.';
        }
        const npmName = generateNpmNameByPrefix(value, npmPrefix);
        if (!validateName(npmName).validForNewPackages) {
          return `this component name(${npmName}) has already exist. please retry`;
        }
        return true;
      },
    },
  ];
}

/**
 * 下载完成后的提示信息
 * @param {string} name 组件名称
 * @param {string} filepath 组件路径
 */
function completedMessage(name, filepath, standalone) {
  console.log();
  console.log(`Success! Created ${name} at ${filepath}`);
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
