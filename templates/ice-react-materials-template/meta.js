module.exports = {
  prompts: {
    version: {
      type: 'string',
      label: 'version',
      message: 'version',
      default: '1.0.0',
    },
    description: {
      type: 'string',
      label: 'description',
      message: 'description',
      default: 'This is a material project',
    },
  },
  completeMessage: '物料项目创建成功',
};
