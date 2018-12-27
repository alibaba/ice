const inquirer = require('inquirer');
const debug = require('debug')('ice:add:general');
const logger = require('../utils/logger');
const pkgJSON = require('../utils/pkg-json');
const message = require('../utils/message');
const { getLocalTemplate } = require('../utils/local-path');

const MATERIAL_TEMPLATE_TYPE = ['block', 'scaffold'];
const MATERIAL_TEMPLATE_QUESION = [
  {
    type: 'list',
    name: 'templateType',
    message: 'Please select material type',
    choices: MATERIAL_TEMPLATE_TYPE,
  },
];

module.exports = async function add(cwd, ...options) {
  debug('cwd: %s', cwd);

  const [templateName, templateType] = options;
  if (templateName && templateType) {
    await getArgvOptions(cwd, ...options);
  } else {
    await getAskOptions(cwd, ...options);
  }
};

/**
 * 通过询问的形式添加物料
 * @param {string} cwd
 * @param {Array} options
 */
async function getAskOptions(cwd, ...options) {
  const pkg = pkgJSON.getPkgJSON(cwd);
  if (!pkg.materialConfig) {
    logger.fatal(message.invalid);
  }

  // block、scaffold、etc...
  const { templateType } = await inquirer.prompt(MATERIAL_TEMPLATE_QUESION);
  debug('ans: %j', templateType);

  // react、vue、etc...
  const { type } = pkg.materialConfig;
  require(`./${templateType}/add`)(type, cwd, { pkg }, ...options);
}

/**
 * 通过命令行的形式添加物料，支持本地模板和 npm 包的形式
 * 本地模板：~/fs/path/to-custom-template
 * npm模板：to-custom-template
 * @param {Array} cwd          当前路径
 * @param {Array} templateName 模板名称
 * @param {Array} templateType 模板类型
 * @param {Array} options      命令行参数
 */
async function getArgvOptions(cwd, templateName, templateType, ...options) {
  if (!MATERIAL_TEMPLATE_TYPE.includes(templateType)) {
    logger.fatal('unknown argument:', templateType);
  }

  if (getLocalTemplate(templateName)) {
    require(`./${templateType}/add`)(
      null,
      cwd,
      { hasArgvOpts: true },
      ...options
    );
  }
}
