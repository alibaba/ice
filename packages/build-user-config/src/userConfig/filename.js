module.exports = (config, filename) => {
  if (filename) {
    config.output.filename(filename);
  }
};
