module.exports = {
  prompts: {
    name: {
      type: 'string',
      required: true,
      label: 'name',
      message: 'Project name',
      default: 'ice-app',
    },
    version: {
      type: 'string',
      label: 'version',
      default: '1.0.0',
    },
    description: {
      type: 'string',
      required: true,
      label: 'description',
      message: 'description',
    },
    type: {
      type: 'list',
      label: 'type',
      message: 'Pick an init type',
      choices: [
        {
          name: 'React.js (https://github.com/facebook/react)',
          value: 'react',
          short: 'React',
        },
        {
          name: 'Vue.js (https://github.com/vuejs/vue)',
          value: 'vue',
          short: 'Vue',
        },
      ],
    },
  },
};
