#!/usr/bin/env node
const program = require('commander');
const exists = require('fs').existsSync;
const path = require('path');
const ora = require('ora');
const home = require('user-home');
const tildify = require('tildify');
const chalk = require('chalk');
const inquirer = require('inquirer');
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

program
  .usage('<template-name> <type>')
  .option('--offline', 'use cached template');

/**
 * Help.
 */

program.on('--help', () => {
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
// function help() {
//   if (program.args.length) return program.help();
// }
// help();

/**
 * Setting
 */

let tmp;
let to;
let name;
let templateName;
let templateType;

if (!program.args.length) {
  const defaultData = getDefaultData();

  let materialType = defaultData.materialType;

  if (materialType.length > 1) {
    inquirer.prompt([
      {
        type: 'list',
        name: 'materialType',
        message: '请选择添加的类型',
        choices: materialType,
        validate: (answers) => {
          if (answer.length < 1) {
            return '必须选择一个分类，请重新选择';
          }
          return true;
          materialType = answers.materials;
        },
      },
    ]);
  } else {
    materialType = materialType[0];
  }

  const templateList = [
    {
      name: '区块',
      value: {
        template: `ice-${materialType}-block-template`,
        type: 'block',
      },
    },
    {
      name: '布局',
      value: {
        template: `ice-${materialType}-layout-template`,
        type: 'layout',
      },
    },
    {
      name: '模板',
      value: {
        template: `ice-${materialType}-app-template`,
        type: 'scaffold',
      },
    },
  ];

  inquirer
    .prompt([
      {
        type: 'list',
        name: 'template',
        message: '选择初始类型',
        choices: templateList,
      },
    ])
    .then((answers) => {
      console.log('answers', answers);
      templateName = answers.template.template;
      templateType = answers.template.type;

      tmp = path.join(home, '.ice-templates', templateName);
      run(templateName, templateType);
    })
    .catch((err) => {
      console.log(err);
    });
} else {
  templateName = program.args[0];
  templateType = program.args[1];
  run(templateName, templateType);
}

/**
 * Check, download and generate the project.
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
      `./${defaultData.materialType}-materials/${templateType}s/${name}`
    );

    if (isLocalPath(templateName)) {
      if (exists(templatePath)) {
        generate(name, templatePath, to, (err) => {
          if (err) {
            console.log(err);
            logger.fatal(err);
          }

          logger.success('Generated "%s".', name);
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
 * Download a generate from a template npm.
 *
 * @param {String} template
 */

function downloadAndGenerate(template) {
  const spinner = ora('downloading template');
  spinner.start();

  // Remove if local template exists
  if (exists(tmp)) rm(tmp);
  download({ template })
    .then(() => {
      spinner.stop();

      generate(name, tmp, to, (err) => {
        if (err) logger.fatal(err);
        logger.success('Generated "%s".', name);
      });
    })
    .catch((err) => {
      spinner.stop();
      logger.fatal(`Failed to download repo ${template} : ${err.message}`);
    });
}

/**
 * get default data
 */

function getDefaultData() {
  const defaultData = {};
  const pkgData = require(path.resolve(process.cwd(), 'package.json'));
  const materials = pkgData.materials;

  let materialType = [];
  Object.keys(materials).forEach((key) => {
    materialType.push(materials[key]['type']);
  });

  return Object.assign({}, defaultData, {
    materialType,
  });
}

/**
 * Ask
 */
function ask() {
  return {
    block: {
      type: 'input',
      name: 'name',
      message: '区块名称',
      default: 'ExampleBlock',
      validate: (value) => {
        if (!/^[A-Z][a-zA-Z0-9]*$/.test(value)) {
          return '区块名称不合法，必须是大驼峰写法(以大写字母开头并且由小写字母数字组成)，请重新输入';
        }
        return true;
      },
    },
    layout: {
      type: 'input',
      name: 'name',
      message: '布局名称',
      default: 'ExampleLayout',
      validate: (value) => {
        if (!/^[A-Z][a-zA-Z0-9]*$/.test(value)) {
          return '布局名称不合法，必须是大驼峰写法(以大写字母开头并且由小写字母数字组成)，请重新输入';
        }
        return true;
      },
    },
    scaffold: {
      type: 'input',
      name: 'name',
      message: '模板名称',
      default: 'ice-template',
      validate: (value) => {
        value = value.trim();
        if (!value) {
          return '模板名称不合法，不能为空! 请重新输入';
        }
        return true;
      },
    },
  };
}
