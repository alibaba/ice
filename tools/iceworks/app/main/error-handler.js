// 创建项目类型错误
exports.CreateProjectError = class CreateProjectError extends Error {
  constructor(message, metadata) {
    super(message);

    this.metadata = metadata;
  }
};
