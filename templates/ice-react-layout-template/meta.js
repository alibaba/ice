module.exports = {
  prompts: {
    title: {
      type: 'input',
      message: 'title',
      default: 'demo layout',
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
      message: 'description (not required)',
    },
  },
  completeMessage: '布局添加完成',
};
