class DependenciesError extends Error {
  constructor(message, metadata) {
    super(message);
    this.metadata = metadata;
  }
}

module.exports = DependenciesError;
