
const exists = require('fs').existsSync;
const path = require('path');
const fs = require('fs');
const ora = require('ora');
const home = require('user-home');
// const tildify = require('tildify');
// const chalk = require('chalk');
const inquirer = require('inquirer');
const rm = require('rimraf').sync;
const spawn = require('cross-spawn');
const logger = require('../../util/logger');
const generate = require('../../util/generate');
const localPath = require('../../util/local-path');
const download = require('../../util/download');
const validateName = require('validate-npm-package-name');
const isLocalPath = localPath.isLocalPath;
const getTemplatePath = localPath.getTemplatePath;


function run(opt, argOpt) {
  let {template, name} = opt;
  const {offline, cwd} = argOpt;
  if (fs.readdirSync(cwd).length) {
    logger.fatal('Workdir %s is not empty.', cwd);
    return;
  }

  const tmp = path.join(home, '.ice-templates', template);
  if (offline) {
    template = tmp;
  }
  console.log('template', template, isLocalPath(template));
  // check if template is local
  if (isLocalPath(template)) {
    const templatePath = getTemplatePath(template);
    console.log('templatePath', templatePath);
    if (exists(templatePath)) {
      generate(name, templatePath, cwd, (err, callback) => {
        if (err) logger.fatal(err);
        console.log();
        logger.success('Generated "%s".', name);
        tryNPMInstall({ to: cwd, callback });
      });
    } else {
      logger.fatal('Local template "%s" not found.', template);
    }
  } else {
    downloadAndGenerate({template, tmp, to:cwd, name});
  }
}

/**
 * Download a generate from a template npm.
 *
 * @param {String} template
 */

function downloadAndGenerate({template, tmp, to, name}) {
  const spinner = ora('downloading template');
  spinner.start();

  // Remove if local template exists
  if (exists(tmp)) rm(tmp);
  download({ template })
    .then(() => {
      spinner.stop();

      generate(name, tmp, to, (err, callback) => {
        if (err) logger.fatal(err);
        logger.success('Generated "%s".', name);
        tryNPMInstall({ to, callback });
      });
    })
    .catch((err) => {
      spinner.stop();
      logger.fatal(`Failed to download repo ${template} : ${err.stack}`);

    });
}

// callback 参数是用来显性控制从 meta.js 里面读取的 message 展现时机
function tryNPMInstall({ to, callback }) {
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
          console.log(`npm install finished.`);
          callback();
        });
      }
    });
}


module.exports = function init(cwd, opt) {
  inquirer
    .prompt([
      {
        type: 'input',
        message: 'what is your project name?',
        name: 'name',
        validate: function(input) {
          return validateName(input).validForNewPackages;
        },
      },
      {
        type: 'list',
        message: 'Which template do you wanna use?',
        name: 'template',
        choices: ['ice-materials-template', 'vue', 'universal'],
      },
    ])
    .then((answers) => {
      if (answers.template !== 'universal') {
        // react/ vue 跳过第三问
        return answers;
      }
      return inquirer.prompt([{
        type: 'input',
        message: 'what is your template name?',
        name: 'template',
      },]).then(ans => Object.assign(answers, ans));
    }).then(answers => {
      run(answers, Object.assign({cwd}, opt));
    }).catch(logger.fatal);
}
