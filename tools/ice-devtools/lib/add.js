const inquirer = require('inquirer');
const path = require('path');
const { existsSync: exists } = require('fs');
const debug = require('debug')('ice:add:general');
const logger = require('../utils/logger');
const pkgJSON = require('../utils/pkg-json');
const message = require('../utils/message');

const MATERIAL_TEMPLATE_TYPE = ['block', 'component', 'scaffold'];

const MATERIAL_TEMPLATE_QUESION = [
  {
    type: 'list',
    name: 'templateType',
    message: 'Please select material type',
    choices: MATERIAL_TEMPLATE_TYPE,
  },
];

const FRAMEWORK_TYPE_QUESION = [
  {
    type: 'list',
    name: 'frameworkType',
    message: 'Please select framework type',
    choices: ['react', 'vue']
  },
]

module.exports = async function add(cwd) {
  debug('cwd: %s', cwd);

  await getAskOptions(cwd);
};

/**
 * 通过询问的形式添加物料
 * @param {string} cwd
 */
async function getAskOptions(cwd) {
  const pkg = pkgJSON.getPkgJSON(cwd);

  if (!pkg) {
    logger.fatal(message.invalid);
  }

  // @vue-materials/xxx or @icedesign/my-materials-xxxx
  let npmPrefix;
  // react、vue...
  let frameworkType;

  // ice 官方仓库
  if (pkg.materials) {
    const reslut = await inquirer.prompt(FRAMEWORK_TYPE_QUESION);
    frameworkType = reslut.frameworkType;
    npmPrefix = (type === 'react' ? '@icedesign' : `@${type}-materials`) + '/';
    cwd = path.join(cwd, `${type}-materials`);
  } else if (pkg.materialConfig) {
    frameworkType = pkg.materialConfig.type;
    npmPrefix = `${pkg.name}-`;
  } else {
    logger.fatal(message.invalid);
  }

  // block、scaffold、etc...
  const { templateType } = await inquirer.prompt(MATERIAL_TEMPLATE_QUESION);
  debug('ans: %j', templateType);

  const templatePath = await getTemplatePath(frameworkType, templateType, cwd);

  require(`./${templateType}/add`)(cwd, {
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
  const localTemplate = path.join(cwd, `.template/${templateType}`);
  if (exists(localTemplate)) {
    return localTemplate;
  };

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