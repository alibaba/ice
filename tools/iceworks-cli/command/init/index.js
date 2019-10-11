const inquirer = require('inquirer');
const log = require('../../lib/log');
const goldlog = require('../../lib/goldlog');
const checkEmpty = require('../../lib/checkEmpty');
const initProject = require('./initProject');
const initMaterialAndComponent = require('./initMaterialAndComponent');

module.exports = async function(options = {}) {
  const cwd = process.cwd();
  const go = await checkEmpty(cwd);
  if (!go) process.exit(1);

  let { npmName, type } = options;
  log.verbose('iceworks init options', options);

  if (!options.type) {
    type = await selectType();
  }
  if (!options.npmName) {
    npmName = await selectTemplate(type);
  }

  goldlog('init', { npmName, type });
  log.verbose('iceworks init', type, npmName);

  if (type === 'project') {
    await initProject({ npmName, cwd });
  } else {
    await initMaterialAndComponent({
      cwd,
      projectType: type,
      template: npmName,
    });
  }
};

/**
 * 选择初始项目类型
 */
async function selectType() {
  const DEFAULT_TYPE = 'project';
  return inquirer
    .prompt({
      type: 'list',
      name: 'type',
      message: 'Please select a type',
      default: DEFAULT_TYPE,
      choices: [
        {
          name: 'project',
          value: DEFAULT_TYPE,
        },
        {
          name: 'material collection(component&scaffold&block)',
          value: 'material',
        },
        {
          name: 'component',
          value: 'component',
        },
      ],
    })
    .then((answer) => answer.type);
}

/**
 * 选择使用的模板
 *
 * @param {String} type project|material|component
 */
async function selectTemplate(type) {
  // 针对不同 init 类型的内置模板
  const typeToTemplates = {
    project: [{
      npmName: '@icedesign/lite-scaffold',
      description: 'Lite template，A lightweight and simple template.',
      default: true,
    }, {
      npmName: '@icedesign/ts-scaffold',
      description: 'TypeScript template，Built-in support for TypeScript.',
    }, {
      npmName: '@icedesign/pro-scaffold',
      description: 'Pro template，Integrated rich features such as charts, lists, forms, etc.',
    }],
    material: [{
      npmName: '@icedesign/ice-react-material-template',
      description: 'React material template',
      default: true,
    }, {
      npmName: '@icedesign/ice-vue-material-template',
      description: 'Vue material template',
    }, {
      npmName: 'rax-template',
      description: 'Rax material template',
    }, {
      npmName: '@icedesign/ice-react-ts-material-template',
      description: 'React material template with TypeScript',
    }],
    component: [{
      npmName: '@icedesign/ice-react-material-template',
      description: 'React component template',
      default: true,
    }, {
      npmName: 'rax-template',
      description: 'Rax component template',
    }, {
      npmName: '@icedesign/ice-react-ts-material-template',
      description: 'React component template with TypeScript',
    }],
  };
  const templates = typeToTemplates[type];
  const defaultTemplate = templates.find(item => item.default === true);

  return inquirer
    .prompt({
      type: 'list',
      name: 'template',
      message: 'Please select a template',
      default: defaultTemplate,
      choices: templates.map(item => {
        return {
          name: item.description,
          value: item.npmName,
        };
      }),
    })
    .then((answer) => answer.template);
}
