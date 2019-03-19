const inquirer = require('inquirer');
const goldlog = require('./utils/goldlog');
const pkgData = require('../package.json');
const log = require('./utils/log');

/**
 * 初始化项目
 *
 * @param {String} cwd 项目目录
 * @param {Object} options 命令行参数
 */
module.exports = async function(cliOptions) {
  goldlog('version', {
    version: pkgData.version
  });
  goldlog('init', cliOptions);
  log.verbose('init cliOptions', cliOptions);

  let { scaffold } = cliOptions || {};
  const distScaffold = await selectScaffold(scaffold);

  log.info('使用模板：', distScaffold);
};


function selectScaffold(scaffold) {
  if (scaffold) {
    return Promise.resolve(scaffold);
  }

  const defaultScaffold = '@icedesign/ice-design-lite';
  return inquirer.prompt({
    type: 'list',
    name: 'scaffold',
    message: '请选择对应的模板（也可以通过 -s, --scaffold 自定义模板对应的 npm）',
    default: '@icedesign/ice-design-lite',
    choices: [{
      name: 'Lite 模板，功能比较轻量',
      value: '@icedesign/ice-design-lite'
    }, {
      name: 'TypeScript 模板，内置了对 TypeScript 的支持',
      value: '@icedesign/ice-typescript-starter'
    }, {
      name: 'Pro 模板，集成了图表、列表、表单等丰富的功能',
      value: '@icedesign/ice-design-pro'
    }]
  }).then((answer) => {
    return answer.scaffold || defaultScaffold;
  }).catch((err) => {
    log.error('选择模板出错，使用默认模板', err);
    return defaultScaffold;
  });
}
