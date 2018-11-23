class CreateError extends Error {
  constructor(message, title) {
    super(message);
    this.title = title;
  }
}

module.exports = CreateError;
