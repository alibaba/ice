const validateName = require('validate-npm-package-name');
const uppercamelcase = require('uppercamelcase');
const { generateNpmNameByPrefix } = require('../utils/npm');

const COMPONENT_CATEGORIES = [
  'Table',
  'Form',
  'Chart',
  'List',
  'Modal',
  'Filter',
  'Data visualization',
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
  'Data visualization',
  'Information',
  'Exception',
  'Landing page',
  'video',
  'Others',
];

function nameQuestion(type, npmPrefix) {
  return {
    type: 'input',
    name: 'name',
    message: `${type} name (e.g. Example${uppercamelcase(type)})`,
    validate: (value) => {
      if (!/^[A-Z][a-zA-Z0-9]*$/.test(value)) {
        return `Name must be a Upper Camel Case word, e.g. Example${uppercamelcase(type)}.`;
      }
      const npmName = generateNpmNameByPrefix(value, npmPrefix);
      if (!validateName(npmName).validForNewPackages) {
        return `this ${type} name(${npmName}) has already exist. please retry`;
      }
      return true;
    },
  };
}

function getQuestions(npmPrefix) {
  return {
    component: [
      {
        type: 'confirm',
        name: 'adaptor',
        message: '组件是否需要接入 Fusion Cool & 设计板块？',
        default: false,
      },
      nameQuestion('component', npmPrefix),
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
        choices: COMPONENT_CATEGORIES,
        filter: (answer) => {
          return answer;
        },
      },
    ],
    block: [
      nameQuestion('block', npmPrefix),
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
        default: '1.0.0',
      },
      {
        type: 'string',
        required: true,
        name: 'description',
        message: 'description',
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
      nameQuestion('scaffold', npmPrefix),
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
        default: '1.0.0',
      },
      {
        type: 'string',
        required: true,
        name: 'description',
        message: 'description',
        validate: (value) => {
          value = value.trim();
          if (!value) {
            return 'description cannot be empty';
          }
          return true;
        },
      },
    ],
  };
}

function getCategories() {
  return {
    component: COMPONENT_CATEGORIES,
    block: BLOCK_CATEGORIES,
    scaffold: [],
  };
}

module.exports = { getQuestions, getCategories };

