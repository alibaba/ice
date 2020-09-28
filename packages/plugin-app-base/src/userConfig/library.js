module.exports = (config, library) => {
  if (library) {
    config.output.library(library);
  }
};
