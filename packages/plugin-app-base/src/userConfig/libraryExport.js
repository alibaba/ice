module.exports = (config, libraryExport) => {
  if (libraryExport) {
    config.output.libraryExport(libraryExport);
  }
};