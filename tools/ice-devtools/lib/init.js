const exists = require('fs').existsSync;
const path = require('path');
const fs = require('fs');
const ora = require('ora');
const home = require('user-home');
const inquirer = require('inquirer');
const chalk = require('chalk');
const rm = require('rimraf').sync;
const validateName = require('validate-npm-package-name');

const logger = require('../utils/logger');
const generate = require('../utils/generate');
const localPath = require('../utils/local-path');
const download = require('../utils/download');
const innerNet = require('../utils/inner-net');
const getOptions = require('../utils/options');
const addComponent = require('./add');
const generateDemo = require('../utils/generate-marterials-demo');

const isLocalPath = localPath.isLocalPath;
const getTemplatePath = localPath.getTemplatePath;

module.exports = async function init(cwd) {
  try {
    // 检查当前目录是否为空
    if (fs.readdirSync(cwd).length) {
      logger.fatal('Workdir %s is not empty.', cwd);
    }

    const options = Object.assign({ 
      cwd, 
      template: process.env.TEMPLATE,
    });

    const answers = await initAsk(options);

    if (answers.type === 'component') {
      addComponent(cwd, {
        type: 'component',
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
          message: '当前处于阿里内网环境,生成只在内网可用的' + (type === 'component' ? '物料仓库' : '组件'),
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

  const { template } = await (!options.template
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
            {
              name: '@icedesign/ice-vue-materials-template (Vue 标准模板)',
              value: '@icedesign/ice-vue-materials-template'
            }
          ],
        },
      ])
    : { template: options.template });

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
async function run(opt, argsOpt) {
  let { template, name } = opt;
  const { cwd } = argsOpt;
  const tmp = path.join(home, '.ice-templates', template);

  // 如果是本地模板则从缓存读取，反之从 npm 源下载初始模板
  if (isLocalPath(template)) {
    const templatePath = getTemplatePath(template);

    if (exists(templatePath)) {
      const src = path.join(templatePath, 'template');
      const meta = getOptions(name, templatePath);
      await generateProject(name, src, cwd, meta);
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
    .then(async () => {
      spinner.stop();

      const src = path.join(tmp, 'template');
      const meta = getOptions(name, tmp);
      await generateProject(name, src, to, meta);
    })
    .catch((err) => {
      spinner.stop();
      logger.fatal(`Failed to download repo ${template} : ${err.stack}`);
    });
}

async function generateProject(name, src, dest, meta) {
  try {
    await generate({
      name,
      src,
      dest,
      meta
    });
    await generateDemo(src, dest);
    initCompletedMessage(src, dest, name);
  } catch(e) {
    logger.fatal(e);
  }
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
  console.log(chalk.cyan('    cd blocks/ExampleBlock'));
  console.log(chalk.cyan('    npm install'));
  console.log(chalk.cyan('    npm start'));
  console.log();
  console.log('  Starts the scaffold development server.');
  console.log(chalk.cyan('    cd scaffolds/ExampleScaffold'));
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
