const inquirer = require('inquirer');
const path = require('path');
const { existsSync: exists } = require('fs');
const ora = require('ora');
const home = require('user-home');
const { sync: rm } = require('rimraf');
const debug = require('debug')('ice:add:general');
const logger = require('../utils/logger');
const pkgJSON = require('../utils/pkg-json');
const message = require('../utils/message');
const download = require('../utils/download');

const MATERIAL_TEMPLATE_TYPE = ['block', 'component', 'scaffold'];

const MATERIAL_TEMPLATE_QUESION = [
  {
    type: 'list',
    name: 'type',
    message: 'Please select material type',
    choices: MATERIAL_TEMPLATE_TYPE,
  },
];

const FRAMEWORK_TYPE_QUESION = [
  {
    type: 'list',
    name: 'framework',
    message: 'Please select framework type',
    choices: ['react', 'vue']
  },
]

module.exports = async function add(cwd, options = {}) {
  debug('cwd: %s', cwd);

  const type = process.env.TYPE || options.type;

  if (type) {
    addForStandaloneProject(cwd, {
      type,
      ...options
    });
    return;
  }

  const pkg = pkgJSON.getPkgJSON(cwd);
  
  if (!pkg) {
    logger.fatal(message.invalid);
  }

  if (pkg.materials) {
    addForIceProject(cwd);
    return;
  }

  if (pkg.materialConfig) {
    addForDefaultProject(cwd, {
      pkg
    });
  } else {
    logger.fatal(message.invalid);
  }
};

/**
 * 独立的组件添加链路
 * @param {*} cwd 
 * @param {*} options 
 */
async function addForStandaloneProject(cwd, options) {
  const { type } = options;

  const framework = process.env.FRAMEWORK || 'react';
  const npmPrefix = options.scope ? `${options.scope}/` : '';

  const templatePath = await getTemplatePath( framework, type, cwd);

  require(`./${type}/add`)(cwd, {
    npmPrefix,
    templatePath,
    standalone: true,
  });
}

/**
 * 标准物料仓库
 */
async function addForDefaultProject(cwd, options) {
  const {
    pkg
  } = options;

  const framework = pkg.materialConfig.type;
  const npmPrefix = `${pkg.name}-`;

  // block、scaffold、etc...
  const { type } = await inquirer.prompt(MATERIAL_TEMPLATE_QUESION);
  debug('ans: %j', type);

  const templatePath = await getTemplatePath(framework, type, cwd);

  require(`./${type}/add`)(cwd, {
    npmPrefix,
    templatePath
  });
}

/**
 * ice 官方仓库
 * @param {*} cwd 
 */
async function addForIceProject(cwd) {
  const { framework } = await inquirer.prompt(FRAMEWORK_TYPE_QUESION);
  const { type } = await inquirer.prompt(MATERIAL_TEMPLATE_QUESION);

  const npmPrefix = (framework === 'react' ? '@icedesign' : `@${framework}-materials`) + '/';
  const templatePath = path.join(cwd, `templates/ice-${framework}-materials-template/template/.template/${type}`);

  cwd = path.join(cwd, `${framework}-materials`);

  require(`./${type}/add`)(cwd, {
    npmPrefix,
    templatePath
  });
}

/**
 * 获取模板路径
 * @param {string} type 
 * @param {string} cwd 
 */
async function getTemplatePath(frameworkType, templateType, cwd) {
  const templateRoot = path.join(cwd, `.template`);

  if (exists(templateRoot)) {
    const localTemplate = path.join(templateRoot, templateType);

    if (exists(localTemplate)) {
      return localTemplate;
    } else {
      logger.fatal(`template for ${templateType} is not found in .template` );
    }
  }

  // HACK: 兼容 ice-react-app-template
  if (templateType === 'scaffold') {
    templateType = 'app';
  }

  const templateName = `@icedesign/ice-${frameworkType}-${templateType}-template`;
  const templatePath = await downloadTemplate(templateName);

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