#!/usr/bin/env node
const program = require('commander');
const exists = require('fs').existsSync;
const path = require('path');
const ora = require('ora');
const home = require('user-home');
const chalk = require('chalk');
const inquirer = require('inquirer');
const spawn = require('cross-spawn');
const rm = require('rimraf').sync;
const logger = require('../lib/logger');
const generate = require('../lib/generate');
const checkVersion = require('../lib/check-version');
const localPath = require('../lib/local-path');
const download = require('../lib/download');

const isLocalPath = localPath.isLocalPath;
const getTemplatePath = localPath.getTemplatePath;

/**
 * Usage.
 */

// program
//   .usage('<template-name> <type>')
//   .option('--offline', 'use cached template');

/**
 * Help.
 */

program.on('--help', () => {
  console.log();
  console.log('  Examples:');
  console.log();
  console.log(
    chalk.gray(
      '    # add a new block/layout/scaffold with an official template'
    )
  );
  console.log('    $ ice-devtools add');
  console.log();
});

program.parse(process.argv);
function help() {
  if (program.args.length) return program.help();
}
help();

/**
 * Setting
 */

/**
 * 添加物料：block、layout、scaffold
 */

let name;
let to;
let templateName;
let templateType;
let materialType;

const materialCate = [
  {
    type: 'list',
    name: 'template',
    message: 'Please select material type',
    choices: [
      {
        name: '区块(block)',
        value: {
          type: 'block',
        },
      },
      {
        name: '布局(layout)',
        value: {
          type: 'layout',
        },
      },
      {
        name: '模板(scaffold)',
        value: {
          type: 'scaffold',
        },
      },
    ],
  },
];

/**
 * 选择添加的初始类型：区块、布局、模板
 */
function initAdd() {
  if (!program.args.length) {
    const defaultData = getDefaultData();

    if (defaultData.materialType.length > 1) {
      materialCate.push({
        type: 'list',
        name: 'materialType',
        message: 'Please a libary',
        choices: defaultData.materialType,
        validate: (answers) => {
          if (answers.length < 1) {
            return 'It must be at least one';
          }
          return true;
        },
      });
    }

    inquirer
      .prompt(materialCate)
      .then((answers) => {
        templateType = answers.template.type;
        materialType = answers.materialType || defaultData.materialType[0];

        if (templateType === 'scaffold') {
          templateName = `ice-${materialType}-app-template`;
        } else {
          templateName = `ice-${materialType}-${templateType}-template`;
        }

        run(templateName, templateType);
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    // 支持本地路径
    templateName = program.args[0];
    templateType = program.args[1];
    materialType = program.args[2];
    run(templateName, templateType);
  }
}

/**
 * 初始化 & 检查模板类型
 *
 * @param {String} templateName
 * @param {String} templateType
 */
function run(templateName, templateType) {
  const templateAsk = ask();
  const templatePath = getTemplatePath(templateName);
  const defaultData = getDefaultData();

  inquirer.prompt([templateAsk[templateType]]).then((answers) => {
    name = answers.name;

    // similar react-materials/blocks/ExampleBlock
    to = path.resolve(
      process.cwd(),
      `./${materialType}-materials/${templateType}s/${name}`
    );

    if (isLocalPath(templateName)) {
      if (exists(templatePath)) {
        generate(name, templatePath, to, (err, callback) => {
          if (err) {
            console.log(err);
            logger.fatal(err);
          }

          logger.success('Generated "%s".', name);
          callback();
        });
      } else {
        logger.fatal('Local template "%s" not found.', templateName);
      }
    } else {
      checkVersion(() => {
        downloadAndGenerate(templateName);
      });
    }
  });
}

/**
 * 获取物料项目定义的默认配置
 */
function getDefaultData() {
  const defaultData = {};
  const pkgData = require(path.resolve(process.cwd(), 'package.json'));
  const materials = pkgData.materials;

  // material type
  let type = [];
  Object.keys(materials).forEach((key) => {
    type.push(materials[key]['type']);
  });

  return Object.assign({}, defaultData, {
    materialType: type,
  });
}

/**
 * 下载生成模板
 *
 * @param {String} template
 */
function downloadAndGenerate(template) {
  const downloadspinner = ora('downloading template');
  downloadspinner.start();

  const tmp = path.join(home, '.ice-templates', templateName);

  if (exists(tmp)) rm(tmp);
  download({ template })
    .then(() => {
      downloadspinner.stop();
      setTimeout(() => {
        generate(name, tmp, to, (err, callback) => {
          if (err) logger.fatal(err);
          logger.success('Generated "%s".', name);

          const installSpinner = ora('npm install');
          installSpinner.start();

          const npm = spawn('npm', ['install'], { cwd: to });
          npm.stdout.on('data', (data) => {
            chalk.gray(`${data} \n`)
          });

          npm.stderr.on('data', (data) => {
            installSpinner.stop();
            console.log(
              chalk.red(`${data} \n`)
            );
          });

          npm.on('close', (code) => {
            installSpinner.stop();
            console.log(
              chalk.white('   npm install finished \n')
            );
            callback();
          });

          callback();
        });
      }, 1000);
    })
    .catch((err) => {
      spinner.stop();
      logger.fatal(`Failed to download repo ${template} : ${err.message}`);
    });
}

/**
 * 初始物料时的名称询问
 */
function ask() {
  return {
    block: {
      type: 'input',
      name: 'name',
      message: '名称(name)',
      default: 'ExampleBlock',
      validate: (value) => {
        if (!/^[A-Z][a-zA-Z0-9]*$/.test(value)) {
          return 'Name must be a Upper Camel Case word, e.g. ExampleBlock.';
        }
        return true;
      },
    },
    layout: {
      type: 'input',
      name: 'name',
      message: '名称(name)',
      default: 'ExampleLayout',
      validate: (value) => {
        if (!/^[A-Z][a-zA-Z0-9]*$/.test(value)) {
          return 'Name must be a Upper Camel Case word, e.g. ExampleLayout.';
        }
        return true;
      },
    },
    scaffold: {
      type: 'input',
      name: 'name',
      message: '名称(name)',
      default: 'ice-admin',
      validate: (value) => {
        value = value.trim();
        if (!value) {
          return 'Name cannot be empty';
        }
        return true;
      },
    },
  };
}

initAdd();
