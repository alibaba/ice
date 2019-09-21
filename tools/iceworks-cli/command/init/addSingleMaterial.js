const path = require('path');
const fse = require('fs-extra');
const inquirer = require('inquirer');
const validateName = require('validate-npm-package-name');
const uppercamelcase = require('uppercamelcase');
const log = require('../../lib/log');
const ejsRenderDir = require('./ejsRenderDir')
const generateNpmName = require('./generateNpmName');

module.exports = async function({
  materialDir,
  cwd,
  useDefaultOptions,
  npmScope,
  materialType,
  projectType,
}) {
  log.verbose('addSingleMaterial args', materialDir, cwd, useDefaultOptions, npmScope, materialType);

  const questions = getQuestions(npmScope, cwd)[materialType];
  let options = {};

  if (useDefaultOptions) {
    // inquire
    questions.forEach((item) => {
      options[item.name] = item.hasOwnProperty('default') ? item.default : item.defaultValue;
    });
  } else {
    options = await inquirer.prompt(questions);
  }

  // TODO: 补全 ejs 渲染需要的字段
  options.npmName = generateNpmName(options.name, npmScope);
  options.className = options.name;

  log.verbose('addSingleMaterial options', options);

  const targetPath = projectType === 'material' ? path.join(cwd, `${materialType}s`, options.name) : cwd;
  const materialPath = path.join(materialDir, 'template', materialType);

  await fse.ensureDir(targetPath);
  await fse.copy(materialPath, targetPath, {
    overwrite: false,
    errorOnExist: (err) => {
      throw err;
    },
  });

  // render ejs
  await ejsRenderDir(
    targetPath,
    options,
  );

  if (projectType === 'material') {
    // TODO: delete component eslint
  }
}

const COMPONENT_CATEGORIES = [
  'Table',
  'Form',
  'Chart',
  'List',
  'Modal',
  'Filter',
  'DataDisplay',
  'Information',
  'Others',
];

const BLOCK_CATEGORIES = [
  'Table',
  'Form',
  'Chart',
  'List',
  'Modal',
  'Filter',
  'DataDisplay',
  'Information',
  'Exception',
  'Landing',
  'video',
  'Others',
];


const SCAFFOLD_CATEGORIES = [
  'Basic',
  'Pro',
  'Others',
];

function nameQuestion(type, npmScope, cwd) {
  const defaultName = `Example${uppercamelcase(type)}`;
  return {
    type: 'input',
    name: 'name',
    message: `${type} name`,
    default: defaultName,
    validate: (value) => {
      if (!/^[A-Z][a-zA-Z0-9]*$/.test(value)) {
        return `Name must be a Upper Camel Case word, e.g. Example${uppercamelcase(type)}.`;
      }
      if (fse.existsSync(path.join(cwd, `${type}s`, value))) {
        return `${value} is exist, please try another name.`;
      }

      const npmName = generateNpmName(value, npmScope);
      if (!validateName(npmName).validForNewPackages) {
        return `this ${type} name(${npmName}) has already exist. please retry`;
      }
      return true;
    },
  };
}

function getQuestions(npmScope, cwd) {
  return {
    component: [
      {
        type: 'confirm',
        name: 'adaptor',
        message: '组件是否需要接入 Fusion Cool & 设计板块？',
        default: false,
      },
      nameQuestion('component', npmScope, cwd),
      {
        type: 'input',
        name: 'title',
        message: 'title',
        default: 'demo component',
        validate: (value) => {
          value = value.trim();
          if (!value) {
            return 'title cannot be empty';
          }
          return true;
        },
      },
      {
        type: 'string',
        required: true,
        name: 'version',
        message: 'version',
        default: '1.0.0',
      },
      {
        type: 'string',
        required: true,
        name: 'description',
        message: 'description',
        default: 'intro component',
        validate: (value) => {
          value = value.trim();
          if (!value) {
            return 'description cannot be empty';
          }
          return true;
        },
      },
      {
        type: 'list',
        name: 'category',
        message: 'category',
        default: 'Information',
        choices: COMPONENT_CATEGORIES,
        filter: (answer) => {
          return answer;
        },
      },
    ],
    block: [
      nameQuestion('block', npmScope, cwd),
      {
        type: 'input',
        name: 'title',
        message: 'title',
        default: 'demo block',
        validate: (value) => {
          value = value.trim();
          if (!value) {
            return 'title cannot be empty';
          }
          return true;
        },
      },
      {
        type: 'string',
        required: true,
        name: 'version',
        message: 'version',
        default: '0.1.0',
      },
      {
        type: 'string',
        required: true,
        name: 'description',
        message: 'description',
        default: 'intro block',
        validate: (value) => {
          value = value.trim();
          if (!value) {
            return 'description cannot be empty';
          }
          return true;
        },
      },
      {
        type: 'list',
        message: 'category',
        name: 'category',
        default: 'Information',
        choices: BLOCK_CATEGORIES,
        validate: (answer) => {
          if (answer.length < 1) {
            return 'It must be at least one';
          }
          return true;
        },
        filter: (answer) => {
          return answer;
        },
      },
    ],
    scaffold: [
      nameQuestion('scaffold', npmScope, cwd),
      {
        type: 'input',
        name: 'title',
        message: 'title',
        default: 'demo scaffold',
        validate: (value) => {
          value = value.trim();
          if (!value) {
            return 'title cannot be empty';
          }
          return true;
        },
      },
      {
        type: 'string',
        required: true,
        name: 'version',
        message: 'version',
        default: '0.1.0',
      },
      {
        type: 'string',
        required: true,
        name: 'description',
        message: 'description',
        default: 'intro scaffold',
        validate: (value) => {
          value = value.trim();
          if (!value) {
            return 'description cannot be empty';
          }
          return true;
        },
      },
      {
        type: 'list',
        name: 'category',
        message: 'category',
        default: 'Basic',
        choices: SCAFFOLD_CATEGORIES,
        filter: (answer) => {
          return answer;
        },
      },
    ],
  };
}
