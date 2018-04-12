module.exports = {
  prompts: {
    type: {
      type: 'checkbox',
      label: 'type',
      message:
        'Please select libaries which you will use in this material source.',
      required: true,
      validate: (answer) => {
        if (answer.length < 1) {
          return 'It must be at least one';
        }
        return true;
      },
      choices: [
        {
          name: 'React (https://github.com/facebook/react)',
          value: 'react',
          short: 'React',
        },
        {
          name: 'Vue (https://github.com/vuejs/vue)',
          value: 'vue',
          short: 'Vue',
        },
      ],
    },
    name: {
      type: 'string',
      required: true,
      label: 'name',
      message: 'Set material source name',
      default: 'materials-app',
    },
    version: {
      type: 'string',
      label: 'version',
      message: 'Set material source version',
      default: '1.0.0',
    },
    description: {
      type: 'string',
      required: true,
      message: 'Add more description',
      label: 'description',
    },
  },
  filters: {
    'react-materials/**/*': 'type.react',
    'vue-materials/**/*': 'type.vue',
  },
  completeMessage:
    'Next step:\n  * run `ice-devtools start` to explorer demos\n  * run `ice-devtools add` to start your own materials development',
};
