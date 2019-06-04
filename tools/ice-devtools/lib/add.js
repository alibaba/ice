const inquirer = require('inquirer');
const path = require('path');
const { existsSync } = require('fs');
const ora = require('ora');
const home = require('user-home');
const { sync: rm } = require('rimraf');
const debug = require('debug')('ice:add:general');
const logger = require('../utils/logger');
const pkgJSON = require('../utils/pkg-json');
const message = require('../utils/message');
const download = require('../utils/download');
const { isLocalPath } = require('../utils/local-path');

const MATERIAL_TEMPLATE_TYPE = ['block', 'component', 'scaffold'];

const MATERIAL_TEMPLATE_QUESION = [
  {
    type: 'list',
    name: 'type',
    message: 'Please select material type',
    choices: MATERIAL_TEMPLATE_TYPE,
  },
];

module.exports = async function add(cwd, options = {}) {
  debug('cwd: %s', cwd);

  if (options.type) {
    addForStandaloneProject(cwd, {
      ...options,
    });
    return;
  }

  const pkg = pkgJSON.getPkgJSON(cwd);

  if (!pkg) {
    logger.fatal(message.invalid);
  }

  if (pkg.materialConfig) {
    addForMaterialProject(cwd, {
      pkg,
    });
  } else {
    logger.fatal(message.invalid);
  }
};

/**
 * 创建一个独立的组件/区块
 * @param {*} cwd
 * @param {*} options
 */
async function addForStandaloneProject(cwd, options) {
  const { type, template, scope, forInnerNet } = options;
  const npmPrefix = scope ? `${scope}/` : '';

  const templatePath = type === 'material'
    ? await getMaterialTemplatePath(cwd, template) : await getTemplatePath(type, cwd, template);

  /* eslint-disable-next-line import/no-dynamic-require */
  require(`./${type}/add`)(cwd, {
    npmPrefix,
    templatePath,
    forInnerNet,
    standalone: true,
  });
}

/**
 * 在物料仓库中新增一个组件/区块
 */
async function addForMaterialProject(cwd, options) {
  const {
    pkg,
  } = options;

  const npmPrefix = `${pkg.name}-`;

  // block、scaffold、etc...
  const { type } = await inquirer.prompt(MATERIAL_TEMPLATE_QUESION);
  debug('ans: %j', type);

  const templatePath = await getTemplatePath(type, cwd);

  /* eslint-disable-next-line import/no-dynamic-require */
  require(`./${type}/add`)(cwd, {
    npmPrefix,
    templatePath,
  });
}

/**
 * 获取模板路径
 * @param {string} type
 * @param {string} cwd
 */
async function getTemplatePath(templateType, cwd, template) {
  // from local path
  if (template && isLocalPath(template)) {
    const templatePath = path.join(template, `template/${templateType}`);
    if (existsSync(templatePath)) {
      return templatePath;
    }
    logger.fatal(`template is not found in ${templatePath}`);
  }

  // from local .template file
  const templateRoot = path.join(cwd, '.template');

  if (existsSync(templateRoot)) {
    const localTemplate = path.join(templateRoot, templateType);

    if (existsSync(localTemplate)) {
      return localTemplate;
    }
    logger.fatal(`template for ${templateType} is not found in .template`);
  }

  // form npm package
  const tmp = await downloadTemplate(template);

  return path.join(tmp, `template/${templateType}`);
}

/**
 * 获取模板路径 material
 * @param cwd
 * @param template
 * @returns {Promise<string>}
 */
async function getMaterialTemplatePath(cwd, template) {
  let templatePath;
  // 如果是本地模板则从缓存读取，反之从 npm 源下载初始模板
  if (isLocalPath(template)) {
    if (!existsSync(template)) {
      logger.fatal('Local template "%s" not found.', template);
    } else {
      templatePath = template;
    }
  } else {
    templatePath = await downloadTemplate(template);
  }

  return path.join(templatePath, 'template');
}

/**
 * 下载模板
 *
 * @param {String} template
 */
function downloadTemplate(template) {
  const downloadspinner = ora('downloading template');
  downloadspinner.start();

  const tmp = path.join(home, '.ice-templates', template);
  debug('downloadTemplate', template);
  if (existsSync(tmp)) rm(tmp);
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
