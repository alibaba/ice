// 创建项目类型错误
exports.DetailError = class DetailError extends Error {
  constructor(message, metadata) {
    super(message);

    this.metadata = metadata;
  }
};
