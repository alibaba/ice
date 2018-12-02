const debug = require('debug')('ice:add:block');
const inquirer = require('inquirer');
const {existsSync: exists} = require('fs');
const path = require('path');
const home = require('user-home');
const {sync:rm} = require('rimraf');
const ora = require('ora');
const logger = require('../../util/logger');
const localPath = require('../../util/local-path');
const download = require('../../util/download');
const generate = require('../../util/generate');

const isLocalPath = localPath.isLocalPath;
const getTemplatePath = localPath.getTemplatePath;

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
 * @param{String} type 类型
 * @param{String} cwd 当前路径
 * @param{Object} opt 参数
 */
module.exports = async function addBlock(type, cwd, opt) {
  const templateName = `ice-${type}-app-template`;
  const answer = await inquirer.prompt([{
    type: 'input',
    name: 'name',
    message: 'scaffold name:',
    validate: (value) => {
      if (!/^[A-Z][a-zA-Z0-9]*$/.test(value)) {
        return 'Name must be a Upper Camel Case word, e.g. ExampleApp.';
      }
      return true;
    },
  }]);
  const scaffold = answer.name;

  const blockPath = path.join(cwd, 'scaffolds', scaffold);
  let templatePath = getTemplatePath(templateName);

  debug('name: %j', {templateName, scaffold, templatePath});
  let p = Promise.resolve();
  if (!isLocalPath(templatePath) || !exists(templatePath)) {
    p = p.then(() => downloadTemplate(templateName));
    templatePath = await p;
  }

  generate(scaffold, templatePath, blockPath, (err, callback) => {
    if (err) {
      console.log(err);
      logger.fatal(err);
    }
    logger.success('Generated "%s".', scaffold);
    callback();
  });
}


