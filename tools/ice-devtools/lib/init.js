const path = require('path');
const fs = require('fs');
const ora = require('ora');
const home = require('user-home');
const inquirer = require('inquirer');
const chalk = require('chalk');
const rm = require('rimraf').sync;
const validateName = require('validate-npm-package-name');
const easyfile = require('easyfile');
const { checkAliInternal } = require('ice-npm-utils');
const uppercamelcase = require('uppercamelcase');

const logger = require('../utils/logger');
const generate = require('../utils/generate');
const localPath = require('../utils/local-path');
const download = require('../utils/download');
const pkgJSON = require('../utils/pkg-json');
const add = require('./add');

const isLocalPath = localPath.isLocalPath;

module.exports = async function init(cwd) {
  try {
    const type = process.env.TYPE || 'material';
    const template = process.env.TEMPLATE;

    // 检查当前目录是否为空
    if (fs.readdirSync(cwd).length) {
      logger.fatal('Workdir %s is not empty.', cwd);
    }

    const options = Object.assign({
      cwd,
      type,
      template,
    });

    const answers = await initAsk(options);

    if (options.type === 'material') {
      run(answers, options);
    } else {
      add(cwd, {
        template,
        ...answers,
      });
    }
  } catch (error) {
    logger.fatal(error);
  }
};

/**
 * 初始询问
 */
async function initAsk(options = {}) {
  const isInnerNet = await checkAliInternal();
  const { forInnerNet } = await (isInnerNet
    ? inquirer.prompt([
      {
        type: 'confirm',
        message: '当前处于阿里内网环境,生成只在内网可用的物料',
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
        '@alife',
      ],
    },
  ]) : await inquirer.prompt([
    {
      type: 'input',
      message: 'npm scope (optional)',
      name: 'scope',
    },
  ]);

  if (options.type !== 'material') {
    return {
      type: options.type,
      scope,
    };
  }

  const projectName = path.basename(options.cwd);
  const { name, description } = await inquirer.prompt([
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
        const materialsName = scope ? `${scope}/${value}` : value;
        if (forInnerNet && !validateName(materialsName).validForNewPackages) {
          return `this material name(${materialsName}) has already exist. please enter again`;
        }
        return true;
      },
    },
    {
      name: 'description',
      type: 'string',
      label: 'description',
      message: 'description',
      default: 'This is a material project',
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
            name: '@icedesign/ice-react-material-template (React 标准模板)',
            value: '@icedesign/ice-react-material-template',
          },
          {
            name: '@icedesign/ice-vue-material-template (Vue 标准模板)',
            value: '@icedesign/ice-vue-material-template',
          },
          {
            name: '@icedesign/ice-angular-material-template (Angular 标准模板)',
            value: '@icedesign/ice-angular-material-template',
          },
        ],
      },
    ])
    : { template: options.template });

  return {
    name: scope ? `${scope}/${name}` : name,
    template,
    description,
  };
}

/**
 * 初始入口
 * @param {object} opt
 * @param {object} argsOpt
 */
async function run(opt, argsOpt) {
  const { template, name, description } = opt;
  const { cwd: dest } = argsOpt;

  // init material project
  await generate({
    name,
    version: '1.0.0',
    description,
    src: path.join(__dirname, '../template/init'),
    dest,
  });

  let templatePath;

  // 如果是本地模板则从缓存读取，反之从 npm 源下载初始模板
  if (isLocalPath(template)) {
    if (!fs.existsSync(template)) {
      logger.fatal('Local template "%s" not found.', template);
    } else {
      templatePath = template;
    }
  } else {
    templatePath = await downloadTemplate(template);
  }

  // clone template
  easyfile.copy(path.join(templatePath, 'template'), path.join(dest, '.template'));

  // generate demo
  await generateMaterialsDemo(dest);

  initCompletedMessage(dest, name);
}

/**
 * generate demo for material project
 */
async function generateMaterialsDemo(appPath) {
  const pkg = pkgJSON.getPkgJSON(appPath);

  // block component ...
  const types = fs.readdirSync(path.join(appPath, '.template')).filter((file) =>
    fs.statSync(path.join(appPath, '.template', file)).isDirectory()
  );

  for (let i = 0; i < types.length; i++) {
    const type = types[i];
    /* eslint-disable-next-line no-await-in-loop */
    await generate({
      src: path.join(appPath, `.template/${type}`),
      dest: path.join(appPath, `${type}s/Example${uppercamelcase(type)}`),
      name: `example-${type}`,
      npmName: `${pkg.name}-example-${type}`,
      version: '1.0.0',
      title: `demo ${type}`,
      description: '示例',
      skipGitIgnore: true,
    });
  }
}

/**
 * 从 npm 下载初始模板进行生成
 * @param {string} template  初始模板
 * @param {string} tmp       缓存路径
 * @param {string} to        写入路径
 * @param {string} name      项目名称
 */
function downloadTemplate(template) {
  const spinner = ora('downloading template');
  spinner.start();

  const tmp = path.join(home, '.ice-templates', template);
  // Remove if local template exists
  if (fs.existsSync(tmp)) rm(tmp);

  return download({ template })
    .then(async () => {
      spinner.stop();
      return tmp;
    })
    .catch((err) => {
      spinner.stop();
      logger.fatal(`Failed to download repo ${template} : ${err.stack}`);
    });
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
  console.log(`${chalk.cyan('    npm run sync')}  or  ${chalk.cyan('npm run sync-unpkg')}`);
  console.log();
  console.log('Happy hacking!');
}
