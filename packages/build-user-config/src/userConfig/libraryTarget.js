module.exports = (config, libraryTarget) => {
  if (libraryTarget) {
    config.output.libraryTarget(libraryTarget);
  }
};