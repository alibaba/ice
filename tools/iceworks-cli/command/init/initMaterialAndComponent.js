/**
 * download template and init material&component
 *
 * material:
 *  1. download npm
 *  2. ask and generate pkg/readme/lint files
 *  3. add component&block(include ask)
 *
 * component:
 *  1. download npm
 *  2. add component(include ask)
 */
const fse = require('fs-extra');
const path = require('path');
const inquirer = require('inquirer');
const { checkAliInternal } = require('ice-npm-utils');
const addSingleMaterial = require('./addSingleMaterial');
const downloadMaterialTemplate = require('./downloadMaterialTemplate');
const ejsRenderDir = require('./ejsRenderDir');
const generateNpmName = require('./generateNpmName');
const log = require('../../lib/log');

module.exports = async function({
  cwd, projectType, template,
}) {
  log.verbose('initMaterialAndComponent', projectType, template);

  const materialDir = await downloadMaterialTemplate(template);
  const templatePkg = await fse.readJson(path.join(materialDir, 'package.json'));

  if (projectType === 'material') {
    // 生成根目录文件 package.json/README/lint 等
    const { npmScope, projectName, description } = await initMaterialAsk(cwd);
    const npmName = generateNpmName(projectName, npmScope);

    const templatePath = path.join(__dirname, '../../template/initMaterial');
    await fse.copy(templatePath, cwd);
    await ejsRenderDir(cwd, {
      npmName, description, template,
      version: '0.1.0',
      materialConfig: templatePkg.materialConfig,
    });

    // add block&component
    await Promise.all(['block', 'component'].map((item) => {
      return addSingleMaterial({
        materialDir,
        cwd,
        useDefaultOptions: true,
        npmScope,
        materialType: item,
        projectType,
      });
    }));
  }

  if (projectType === 'component') {
    // add component
    await addSingleMaterial({
      materialDir,
      cwd,
      useDefaultOptions: false,
      npmScope: '',
      materialType: 'component',
      projectType: 'component',
    });
    // XXX: add adapter
  }

  // remove temp dir
  await fse.remove(materialDir);
}

async function initMaterialAsk(cwd) {
  const isInnerNet = await checkAliInternal();

  const { forInnerNet } = await (isInnerNet
    ? inquirer.prompt([
      {
        type: 'confirm',
        message: '当前处于阿里内网环境，生成只在内网可用的物料',
        name: 'forInnerNet',
      },
    ])
    : { forInnerNet: false });

  const { npmScope } = forInnerNet ? await inquirer.prompt([
    {
      type: 'list',
      message: 'please select the npm scope',
      name: 'npmScope',
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
      name: 'npmScope',
    },
  ]);

  const { projectName, description } = await inquirer.prompt([
    {
      type: 'input',
      message: 'materials name',
      name: 'projectName',
      default: path.basename(cwd),
      require: true,
    },
    {
      name: 'description',
      type: 'string',
      label: 'description',
      message: 'description',
      default: 'This is a ice material project',
    },
  ]);

  return { npmScope, projectName, description };
}
