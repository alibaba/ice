module.exports = {
  prompts: {
    title: {
      type: 'input',
      message: '标题',
      default: '示例布局',
      validate: (value) => {
        value = value.trim();
        if (!value) {
          return '布局标题不能为空，请重新输入';
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
      message: '描述(可选)',
    },
  },
};
