const debug = require('debug')('ice:add:block');
const inquirer = require('inquirer');
const { existsSync: exists } = require('fs');
const path = require('path');
const chalk = require('chalk');
const home = require('user-home');
const { sync: rm } = require('rimraf');
const ora = require('ora');
const kebabCase = require('kebab-case');
const logger = require('../../utils/logger');
const localPath = require('../../utils/local-path');
const download = require('../../utils/download');
const generate = require('../../utils/generate');
const pkgJSON = require('../../utils/pkg-json');
const validateName = require('validate-npm-package-name');

const isLocalPath = localPath.isLocalPath;
const getTemplatePath = localPath.getTemplatePath;

/**
 * @param{String} type 类型
 * @param{String} cwd 当前路径
 * @param{Object} opt 参数
 */
module.exports = async function addScaffold(type, cwd, opt, argvOpt) {
  const templateName = `@icedesign/ice-${type}-app-template`;
  const answer = await inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'scaffold name',
      validate: (value) => {
        value = value.trim();
        if (!value) {
          return 'scaffold name cannot be empty';
        }
        const name = generateNpmName(value, opt);
        if (!validateName(name).validForNewPackages) {
          return `this scaffold name(${name}) has already exist. please retry`;
        }
        return true;
      },
    },
  ]);
  const scaffoldName = answer.name;
  const name = generateNpmName(scaffoldName, opt);

  const scaffoldPath = path.join(cwd, 'scaffolds', scaffoldName);
  let templatePath = getTemplatePath(templateName);

  debug('name: %j', { templateName, scaffoldName, templatePath });
  let p = Promise.resolve();
  if (!isLocalPath(templatePath) || !exists(templatePath)) {
    p = p.then(() => downloadTemplate(templateName));
    templatePath = await p;
  }
  const npmName = name;
  generate(name, npmName, templatePath, scaffoldPath, (err, callback) => {
    if (err) {
      console.log(err);
      logger.fatal(err);
    }
    completedMessage(scaffoldName, scaffoldPath);
    callback();
  });
};

function generateNpmName(name, opt) {
  const kebabCaseName = kebabCase(name).replace(/^-/, '');

  let npmName;

  if (opt.scope) {
    npmName = opt.scope + '/' + kebabCaseName;
  } else if (opt.pkg && opt.pkg.name) {
    npmName = `${opt.pkg.name}-${kebabCaseName}`;
  } else {
    npmName = kebabCaseName;
  }

  return npmName;
}

/**
 * 下载生成模板
 * @param {String} template
 */
function downloadTemplate(template) {
  const downloadspinner = ora('downloading template');
  downloadspinner.start();

  const tmp = path.join(home, '.ice-templates', template);

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
 * 区块下载完成后的引导提示信息
 * @param {string} scaffoldName 脚手架模板名称
 * @param {string} scaffoldPath 脚手架模板路径
 */
function completedMessage(scaffoldName, scaffoldPath) {
  console.log();
  console.log(`Success! Created ${scaffoldName} at ${scaffoldPath}`);
  console.log(
    `Inside ${scaffoldName} directory, you can run several commands:`
  );
  console.log();
  console.log('  Starts the development server.');
  console.log(chalk.cyan(`    cd scaffolds/${scaffoldName}`));
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
