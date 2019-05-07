const inquirer = require('inquirer');
const goldlog = require('../../utils/goldlog');
const pkgData = require('../../../package.json');
const log = require('../../utils/log');
const initProject = require('../../utils/initProject');
const initMaterial = require('../../utils/initMaterial');
const checkEmpty = require('../../utils/checkEmpty');

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

  // eslint-disable-next-line prefer-const
  let { template, projectDir, type } = cliOptions || {};
  projectDir = projectDir || process.cwd();

  const canGoOn = await checkEmpty(projectDir);
  if (!canGoOn) {
    log.error('用户取消退出！');
    process.exit(1);
  }

  if (!template) {
    template = await selectTemplate(type);
  }

  log.info('使用模板：', template);

  if (type === 'project') {
    try {
      await initProject({ template, projectDir });
      log.info('初始化项目成功，安装依赖后执行 npm run start 开始调试');
    } catch (err) {
      log.error('初始化项目失败', err);
    }
  } else {
    try {
      await initMaterial({ template, projectDir, type });
      log.info('初始化成功，安装依赖后执行 npm run start 开始调试');
    } catch (err) {
      log.error('初始化失败', err);
    }
  }
};

function selectTemplate(type) {
  if (type !== 'project') {
    return Promise.resolve('@icedesign/ice-react-material-template');
  }

  const defaultTemplate = '@icedesign/lite-scaffold';
  return inquirer.prompt({
    type: 'list',
    name: 'template',
    message: '请选择对应的模板（也可以通过 -s, --scaffold 自定义模板对应的 npm）',
    default: defaultTemplate,
    choices: [{
      name: 'Lite 模板，功能比较轻量',
      value: defaultTemplate,
    }, {
      name: 'TypeScript 模板，内置了对 TypeScript 的支持',
      value: '@icedesign/ts-scaffold',
    }, {
      name: 'Pro 模板，集成了图表、列表、表单等丰富的功能',
      value: '@icedesign/pro-scaffold',
    }],
  }).then((answer) => {
    return answer.template || defaultTemplate;
  }).catch((err) => {
    log.error('选择模板出错，使用默认模板', err);
    return defaultTemplate;
  });
}
