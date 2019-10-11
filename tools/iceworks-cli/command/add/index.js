const path = require('path');
const fse = require('fs-extra');
const inquirer = require('inquirer');
const goldlog = require('../../lib/goldlog');
const log = require('../../lib/log');
const addBlockToProject = require('./addBlockToProject');
const downloadMaterialTemplate = require('../init/downloadMaterialTemplate');
const addSingleMaterial = require('../init/addSingleMaterial');

module.exports = async (options) => {
  const destDir = process.cwd();
  // eslint-disable-next-line prefer-const
  let { materialType, npmName } = options;

  goldlog('add', { materialType, npmName });

  if (!materialType && npmName) {
    await addBlockToProject(options, destDir);
    return;
  }

  const materialPkg = await fse.readJson(path.join(destDir, 'package.json'));
  const { materialConfig, name = '' } = materialPkg;
  const nameParts = name.split('/');
  const npmScope = nameParts[1] ? nameParts[0] : null;

  log.verbose('iceworks add', options, npmScope);

  if (!materialConfig) {
    throw new Error('Invalid ice materials project, Missing `materialConfig` property in package.json file.');
  }
  if (!materialConfig.template) {
    throw new Error('Missing `materialConfig.template` property in package.json file.');
  }

  const { template } = materialConfig;
  const materialDir = await downloadMaterialTemplate(template, materialConfig);

  if (!materialType) {
    const answers = await inquirer.prompt([{
      type: 'list',
      name: 'materialType',
      message: 'Please select material type',
      choices: ['block', 'component', 'scaffold'],
    }]);
    materialType = answers.materialType;
  }

  await addSingleMaterial({
    materialDir,
    cwd: destDir,
    useDefaultOptions: false,
    npmScope,
    materialType,
    projectType: 'material',
  });

  // remove temp dir
  await fse.remove(materialDir);
};
