const uppercamelcase = require('uppercamelcase');

module.exports = {
  prompts: {
    name: {
      type: 'input',
      message: 'Input Component Name',
      default: 'react-component',
      validate: (value) => {
        value = value.trim();
        if (/[A-Z_]/.test(value)) {
          return 'Component name cannot be uppercase or underscore.'
        }
        if (!value) {
          return 'Component name cannot be empty!';
        }
        return true;
      },
    },
    className: {
      type: 'input',
      message: 'Input Component className',
      default: (ans) => {
        return uppercamelcase(ans.name);
      },
      validate: (value) => {
        value = value.trim();
        if (!value) {
          return 'Component className cannot be empty!';
        }
        return true;
      },
    },
    description: {
      type: 'string',
      required: false,
      default: '',
      message: 'description (not required)',
    },
  },
};
