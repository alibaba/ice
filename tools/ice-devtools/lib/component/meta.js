// 默认配置
const CATEGORIES = [
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

module.exports = {
  prompts: {
    title: {
      type: 'input',
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
    version: {
      type: 'string',
      required: true,
      message: 'version',
      default: '1.0.0',
    },
    description: {
      type: 'string',
      required: true,
      message: 'description',
      validate: (value) => {
        value = value.trim();
        if (!value) {
          return 'description cannot be empty';
        }
        return true;
      },
    },
    categories: {
      type: 'checkbox',
      message: 'categories',
      choices: CATEGORIES,
      filter: (answer) => {
        return answer;
      },
    },
  },
};
