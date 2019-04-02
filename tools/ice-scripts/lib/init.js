const inquirer = require('inquirer');
const goldlog = require('./utils/goldlog');
const pkgData = require('../package.json');
const log = require('./utils/log');
const initProject = require('./scaffold/initProject');

/**
 * 初始化项目：cli 调用；方法调用
 *
 * @param {String} cwd 项目目录
 * @param {Object} options 命令行参数
 */
module.exports = async function (cliOptions) {
  goldlog('version', {
    version: pkgData.version,
  });
  goldlog('init', cliOptions);
  log.verbose('init cliOptions', cliOptions);

  let { scaffold, projectDir } = cliOptions || {};
  projectDir = projectDir || process.cwd();

  if (!scaffold) {
    scaffold = await selectScaffold();
  }

  log.info('使用模板：', scaffold);

  try {
    await initProject({ scaffold, projectDir });
    log.info('初始化项目成功，安装依赖后执行 npm run start 开始调试');
  } catch (err) {
    log.error('初始化项目失败', err);
  }
};

function selectScaffold() {
  const defaultScaffold = '@icedesign/lite-scaffold';
  return inquirer.prompt({
    type: 'list',
    name: 'scaffold',
    message: '请选择对应的模板（也可以通过 -s, --scaffold 自定义模板对应的 npm）',
    default: defaultScaffold,
    choices: [{
      name: 'Lite 模板，功能比较轻量',
      value: defaultScaffold,
    }, {
      name: 'TypeScript 模板，内置了对 TypeScript 的支持',
      value: '@icedesign/ts-scaffold',
    }, {
      name: 'Pro 模板，集成了图表、列表、表单等丰富的功能',
      value: '@icedesign/pro-scaffold',
    }],
  }).then((answer) => {
    return answer.scaffold || defaultScaffold;
  }).catch((err) => {
    log.error('选择模板出错，使用默认模板', err);
    return defaultScaffold;
  });
}
