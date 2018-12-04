module.exports = {
  prompts: {
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
  completeMessage: '物料项目创建成功',
};
