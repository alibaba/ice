module.exports = {
  prompts: {
    title: {
      type: 'input',
      message: '标题',
      validate: (value) => {
        value = value.trim();
        if (!value) {
          return '标题不能为空';
        }
        return true;
      },
    },
    version: {
      type: 'string',
      required: true,
      message: '版本',
      default: '1.0.0',
    },
    description: {
      type: 'string',
      required: true,
      message: '描述',
      validate: (value) => {
        value = value.trim();
        if (!value) {
          return '描述不能为空';
        }
        return true;
      },
    },
  },
  completeMessage: '模板添加完成',
};
