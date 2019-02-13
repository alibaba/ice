const exists = require('fs').existsSync;
const path = require('path');
const fs = require('fs');
const ora = require('ora');
const home = require('user-home');
const inquirer = require('inquirer');
const chalk = require('chalk');
const tildify = require('tildify');
const rm = require('rimraf').sync;
const spawn = require('cross-spawn');
const validateName = require('validate-npm-package-name');

const logger = require('../utils/logger');
const generate = require('../utils/generate');
const localPath = require('../utils/local-path');
const download = require('../utils/download');
const innerNet = require('../utils/inner-net');
const addComponent = require('./component/add');

const isLocalPath = localPath.isLocalPath;
const getTemplatePath = localPath.getTemplatePath;

module.exports = async function init(cwd, ...args) {
  try {
    // 检查当前目录是否为空
    if (fs.readdirSync(cwd).length) {
      logger.fatal('Workdir %s is not empty.', cwd);
    }

    const options = Object.assign({ cwd }, { args: [...args] });
    const answers = await initAsk(options);

    if (answers.type === 'component') {
      addComponent('react', cwd, {
        standalone: true,
        scope: answers.scope
      });
      return;
    }

    run(answers, options);
  } catch (error) {
    logger.fatal(error);
  }
};

/**
 * 初始询问
 */
async function initAsk(options = {}) {
  const { type } = await inquirer.prompt([
    {
      type: 'list',
      message: 'please select the project type',
      name: 'type',
      default: 'material',
      choices: [
        'material',
        'component'
      ],
    },
  ]);

  const isInnerNet = await innerNet.isInnerNet();

  const { forInnerNet } = await (isInnerNet
    ? inquirer.prompt([
        {
          type: 'confirm',
          message: '当前处于阿里内网环境,生成只在内网可用的物料仓库',
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
        '@alife'
      ],
    },
  ]) : await inquirer.prompt([
    {
      type: 'input',
      message: 'npm scope (optional)',
      name: 'scope',
    },
  ]);

  if (type === 'component') {
    return {
      type: 'component',
      scope: scope
    };
  }

  const projectName = path.basename(options.cwd);
  const { name } = await inquirer.prompt([
    {
      type: 'input',
      message: 'materials name',
      name: 'name',
      default: projectName,
      require: true,
      validate: (value) => {
        if (!value) {
          return 'cannot be empty, please enter again';
        }
        const name = scope ? `${scope}/${value}` : value;
        if (forInnerNet && !validateName(name).validForNewPackages) {
          return `this material name(${name}) has already exist. please enter again`;
        }
        return true;
      },
    },
  ]);

  const templatePath = getLocalTemplatePath(options.args);

  const { template } = await (!templatePath
    ? inquirer.prompt([
        {
          type: 'list',
          message: 'please select the initial material template?',
          name: 'template',
          choices: [
            {
              name: '@icedesign/ice-react-materials-template (React 标准模板)',
              value: '@icedesign/ice-react-materials-template'
            },
            // TODO
            // '@icedesign/ice-vue-materials-template',
            // '@icedesign/universal-materials-template',
          ],
        },
      ])
    : { template: templatePath });

  return {
    name: scope ? `${scope}/${name}` : name,
    template,
  };
}

/**
 * 初始入口
 * @param {object} opt
 * @param {object} argsOpt
 */
function run(opt, argsOpt) {
  let { template, name } = opt;
  const { offline, cwd } = argsOpt;
  const tmp = path.join(home, '.ice-templates', template);

  // 检查是否离线模式
  if (offline) {
    console.log(`> Use cached template at ${chalk.yellow(tildify(tmp))}`);
    template = tmp;
  }

  // 如果是本地模板则从缓存读取，反之从 npm 源下载初始模板
  if (isLocalPath(template)) {
    const templatePath = getTemplatePath(template);
    const npmName = name;
    if (exists(templatePath)) {
      generate(name, npmName, templatePath, cwd, (err, cb) => {
        if (err) logger.fatal(err);
        initCompletedMessage(cwd, name);
      });
    } else {
      logger.fatal('Local template "%s" not found.', template);
    }
  } else {
    downloadAndGenerate({ template, tmp, to: cwd, name });
  }
}

/**
 * 从 npm 下载初始模板进行生成
 * @param {string} template  初始模板
 * @param {string} tmp       缓存路径
 * @param {string} to        写入路径
 * @param {string} name      项目名称
 */
function downloadAndGenerate({ template, tmp, to, name }) {
  const spinner = ora('downloading template');
  spinner.start();

  // Remove if local template exists
  if (exists(tmp)) rm(tmp);
  download({ template })
    .then(() => {
      spinner.stop();

      const npmName = name;
      generate(name, npmName, tmp, to, (err, cb) => {
        if (err) logger.fatal(err);
        initCompletedMessage(to, name);
      });
    })
    .catch((err) => {
      spinner.stop();
      logger.fatal(`Failed to download repo ${template} : ${err.stack}`);
    });
}

/**
 * TODO: 不够优雅，需要重构
 * 依赖安装
 * @param {string} to     项目名称
 * @param {string} cb     用来显性控制从 meta.js 里面读取的 message 展现时机
 */
function tryNPMInstall({ to, cb }) {
  inquirer
    .prompt([
      {
        type: 'confirm',
        name: 'needNPMInstall',
        message: 'Do you need run `npm install` right now?',
      },
    ])
    .then((answers) => {
      if (answers.needNPMInstall) {
        // todo 日志没有高亮
        const npm = spawn('npm', ['install'], { cwd: to });

        npm.stdout.on('data', (data) => {
          console.log(`${data}`);
        });

        npm.stderr.on('data', (data) => {
          console.log(`${data}`);
        });

        npm.on('close', (code) => {
          console.log('npm install finished.');
          cb();
        });
      }
    });
}

/**
 * 获取本地模板路径
 * @param {array} options
 */
function getLocalTemplatePath(options = []) {
  const [, template] = options;
  if (!template) {
    return null;
  }

  if (!isLocalPath(template)) {
    logger.fatal('Local path "%s" is invalid.', template);
  }

  const templatePath = getTemplatePath(template);
  if (!exists(templatePath)) {
    logger.fatal('Local template "%s" not found.', template);
  }

  return template;
}

function initCompletedMessage(appPath, appName) {
  console.log();
  console.log(`Success! Created ${appName} at ${appPath}`);
  console.log('Inside that directory, you can run several commands:');
  console.log();
  console.log('  Install dependencies');
  console.log(chalk.cyan('    npm install'));
  console.log();
  console.log('  Starts the block development server.');
  console.log(chalk.cyan('    cd blocks/Greeting'));
  console.log(chalk.cyan('    npm install'));
  console.log(chalk.cyan('    npm start'));
  console.log();
  console.log('  Starts the scaffold development server.');
  console.log(chalk.cyan('    cd scaffolds/lite'));
  console.log(chalk.cyan('    npm install'));
  console.log(chalk.cyan('    npm start'));
  console.log();
  console.log('  Generate materials json.');
  console.log(chalk.cyan('    npm run generate'));
  console.log();
  console.log(
    '  You can upload the JSON file to a static web server and put the URL at Iceworks settings panel.'
  );
  console.log('  You will see your materials in Iceworks');
  console.log();
  console.log('  We suggest that you can sync the materials json to fusion or unpkg by run: ');
  console.log(chalk.cyan('    npm run sync') + '  or  ' + chalk.cyan('npm run sync-unpkg'));
  console.log();
  console.log('Happy hacking!');
}
