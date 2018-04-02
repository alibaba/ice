#!/usr/bin/env node

const download = require('download-git-repo');
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

const isLocalPath = localPath.isLocalPath;
const getTemplatePath = localPath.getTemplatePath;

/**
 * Usage.
 */

program
  .usage('<type> <template-name>')
  .option('-c, --clone', 'use git clone')
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
  console.log(
    chalk.gray(
      '    # create a new block/layout/scaffold straight from a github template'
    )
  );
  console.log('    $ ice-devtools type username/repo');
  console.log();
});

/**
 * Setting
 */
program.parse(process.argv);

let tmp;
let to;
let name;
let templateName;
let templateType;

const clone = program.clone || false;

if (!program.args.length) {
  const defaultData = getDefaultData();
  const marterialType = defaultData.marterialType;
  const templateList = [
    {
      name: '区块',
      value: {
        template: `ice-${marterialType}-block-template`,
        type: 'block',
      },
    },
    {
      name: '布局',
      value: {
        template: `ice-${marterialType}-block-template`,
        type: 'layout',
      },
    },
    {
      name: '模板',
      value: {
        template: `ice-${marterialType}-app-template`,
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
      templateName = answers.template.template;
      templateType = answers.template.type;

      tmp = path.join(
        home,
        '.ice-templates',
        templateName.replace(/[\/:]/g, '-')
      );
      run(templateName, templateType);
    })
    .catch((err) => {
      console.log(err);
    });
} else {
  // TODO: localpath support
}

/**
 * Check, download and generate the project.
 */

function run(templateName, templateType) {
  const templateAsk = ask();
  const templatePath = getTemplatePath(templateName);

  inquirer.prompt([templateAsk[templateType]]).then((answers) => {
    name = answers.name;
    to = path.resolve(process.cwd(), `./${templateType}s/${name}`);

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
        // use official templates
        const officialTemplate = 'alibaba/ice#ice-devtools';
        downloadAndGenerate(officialTemplate);
      });
    }
  });
}

/**
 * Download a generate from a template repo.
 *
 * @param {String} template
 */

function downloadAndGenerate(template) {
  const spinner = ora('downloading template');
  spinner.start();

  // Remove if local template exists
  if (exists(tmp)) rm(tmp);
  download(template, tmp, { clone }, (err) => {
    spinner.stop();
    if (err) {
      console.log(err);
      logger.fatal(`Failed to download repo ${template} : err.message.trim()`);
    }
    generate(name, tmp, to, (err) => {
      if (err) logger.fatal(err);
      console.log();
      logger.success('Generated "%s".', name);
    });
  });
}

/**
 * get default data
 */

function getDefaultData() {
  const pkgData = require(path.resolve(process.cwd(), 'package.json'));

  const defaultData = {
    marterialType: 'react',
  };

  return Object.assign({}, defaultData, {
    marterialType: pkgData.marterialsConfig.type,
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
