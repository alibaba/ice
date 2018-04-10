module.exports = {
  prompts: {
    type: {
      type: 'checkbox',
      label: 'type',
      message: '选择初始的物料类型(可多选)',
      required: true,
      validate: (answer) => {
        if (answer.length < 1) {
          return '必须选则一个类型，请重新选择';
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
      message: '项目名称',
      default: 'materials-app',
    },
    version: {
      type: 'string',
      label: 'version',
      message: '版本',
      default: '1.0.0',
    },
    description: {
      type: 'string',
      required: true,
      message: '描述',
      label: 'description',
    },
  },
  filters: {
    'react-materials/**/*': 'type.react',
    'vue-materials/**/*': 'type.vue',
  },
};
