const chalk = require('chalk');
const inquirer = require('inquirer');
const { downloadAndGenerateProject } = require('@iceworks/generate-project');
const log = require('../../lib/log');
const goldlog = require('../../lib/goldlog');
const checkEmpty = require('../../lib/checkEmpty');
const initMaterialAndComponent = require('./initMaterialAndComponent');
const getNpmRegistry = require('../../lib/getNpmRegistry');

module.exports = async function(options = {}) {
  const cwd = process.cwd();
  let { npmName, type } = options;
  log.verbose('iceworks init options', options);

  const go = await checkEmpty(cwd);
  if (!go) process.exit(1);

  if (!options.type) {
    type = await selectType();
  }
  if (!options.npmName) {
    npmName = await selectTemplate(type);
  }

  goldlog('init', { npmName, type });
  log.verbose('iceworks init', type, npmName);

  if (type === 'project') {
    const registry = await getNpmRegistry(npmName, null, null, true);
    await downloadAndGenerateProject(
      cwd,
      npmName,
      'latest',
      registry,
    );
    console.log();
    console.log('Initialize project successfully.');
    console.log();
    console.log('Starts the development server.');
    console.log();
    console.log(chalk.cyan('    npm install'));
    console.log(chalk.cyan('    npm start'));
    console.log();
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
      npmName: '@alifd/scaffold-lite',
      description: 'A lightweight TypeScript template.',
      default: true,
    }, {
      npmName: '@alifd/scaffold-lite-js',
      description: 'A lightweight JavaScript template.',
    }, {
      npmName: '@alifd/fusion-design-pro',
      description: 'Pro TypeScript template，Integrated rich features such as charts, lists, forms, etc.',
    }, {
      npmName: '@alifd/fusion-design-pro-js',
      description: 'Pro JavaScript template，Integrated rich features such as charts, lists, forms, etc.',
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
