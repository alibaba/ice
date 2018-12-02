const inquirer = require('inquirer');
const debug = require('debug')('ice:add:general');
const logger = require('../util/logger');
const pkgJSON = require('../util/pkg-json');

const materialCate = [
  {
    type: 'list',
    name: 'templateType',
    message: 'Please select material type',
    choices: ['block', 'scaffold'],
  },
];

module.exports = async function add(cwd, opt) {
  debug('cwd: %s, opt:%j', cwd, opt);
  const pkg = pkgJSON.getPkgJSON(cwd);
  if(!pkg.materialConfig) {
    logger.fatal('package.json is an invalid ice materials project');
    return;
  }

  // 获取 技术栈类型 react/vue
  const answers = await inquirer.prompt(materialCate);
  debug('ans: %j', answers);
  // 获取要添加的 模板类型  block scaffold
  const {type} = pkg.materialConfig;
  require(`./${answers.templateType}/add`)(type, cwd, opt);
}
