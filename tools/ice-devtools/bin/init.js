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
const { spawn } = require('child_process');

const isLocalPath = localPath.isLocalPath;
const getTemplatePath = localPath.getTemplatePath;
/**
 * Usage.
 */

program
  .usage('<template-name> [project-name]')
  .option('--offline', 'use cached template');

/**
 * Help.
 */

program.on('--help', () => {
  console.log('  Examples:');
  console.log();
  console.log(
    chalk.gray('    # create a new project with an official template')
  );
  console.log('    $ ice-devtools init ice-materials-template app');
  console.log();
});

function help() {
  program.parse(process.argv);
  if (program.args.length < 1) return program.help();
}
help();

/**
 * Settings.
 */
program.parse(process.argv);
let template = program.args[0];
const rawName = program.args[1];
const inPlace = !rawName || rawName === '.';
const name = inPlace ? path.relative('../', process.cwd()) : rawName;
const to = path.resolve(rawName || '.');
const tmp = path.join(home, '.ice-templates', template);
if (program.offline) {
  console.log(`> Use cached template at ${chalk.yellow(tildify(tmp))}`);
  template = tmp;
}

/**
 * Padding.
 */

process.on('exit', () => {
  console.log();
});

if (inPlace || exists(to)) {
  inquirer
    .prompt([
      {
        type: 'confirm',
        message: inPlace
          ? 'Generate project in current directory?'
          : 'Target directory exists. Continue?',
        name: 'ok',
      },
    ])
    .then((answers) => {
      if (answers.ok) {
        run();
      }
    })
    .catch(logger.fatal);
} else {
  run();
}

/**
 * Check, download and generate the project.
 */

function run() {
  // check if template is local
  if (isLocalPath(template)) {
    const templatePath = getTemplatePath(template);
    if (exists(templatePath)) {
      generate(name, templatePath, to, (err) => {
        if (err) logger.fatal(err);
        console.log();
        logger.success('Generated "%s".', name);
        tryNPMInstall();
      });
    } else {
      logger.fatal('Local template "%s" not found.', template);
    }
  } else {
    checkVersion(() => {
      downloadAndGenerate(template);
    });
  }
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
        tryNPMInstall();
      });
    })
    .catch((err) => {
      spinner.stop();
      logger.fatal(`Failed to download repo ${template} : ${err.message}`);
    });
}

function tryNPMInstall() {
  inquirer
    .prompt([
      {
        type: 'confirm',
        name: 'needNPMInstall',
        message: 'Do you need run `npm install` right now?',
        choices: ['yes', 'no'],
      },
    ])
    .then((answers) => {
      if (answers.needNPMInstall) {
        // todo 日志没有高亮
        const npm = spawn('npm', ['install']);

        npm.stdout.on('data', (data) => {
          console.log(`${data}`);
        });

        npm.stderr.on('data', (data) => {
          console.log(`${data}`);
        });

        npm.on('close', (code) => {
          console.log(`npm install finished.`);
        });
      }
    });
}
