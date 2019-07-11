const inquirer = require('inquirer');
const rimraf = require('rimraf');
const debug = require('debug')('ice:add:general');
const logger = require('../utils/logger');
const pkgJSON = require('../utils/pkg-json');
const message = require('../utils/message');
const getTemplate = require('../utils/template');
const addMaterial = require('./material/add');

const MATERIAL_TEMPLATE_TYPE = ['block', 'component', 'scaffold'];

const MATERIAL_TEMPLATE_QUESION = [
  {
    type: 'list',
    name: 'type',
    message: 'Please select material type',
    choices: MATERIAL_TEMPLATE_TYPE,
  },
];

module.exports = async function add(cwd) {
  try {
    debug('cwd: %s', cwd);

    const pkg = pkgJSON.getPkgJSON(cwd);

    if (!pkg || !pkg.materialConfig || !pkg.materialConfig.template) {
      throw new Error(message.missingTemplate);
    }

    const templateName = pkg.materialConfig.template;
    const npmPrefix = `${pkg.name}-`;

    // block、scaffold、etc...
    const { type } = await inquirer.prompt(MATERIAL_TEMPLATE_QUESION);
    debug('ans: %j', type);

    const { templatePath, downloadPath, config: materialConfig } = await getTemplate(cwd, type, templateName);

    await addMaterial(cwd, {
      type,
      npmPrefix,
      templatePath,
      materialConfig,
    });

    rimraf.sync(downloadPath);
  } catch (err) {
    logger.fatal(err);
  }
};
