module.exports = (config, filename, { userConfig }) => {
  const { dll } = userConfig;
  if (dll) return;

  if (filename) {
    config.output.filename(filename);
  }
};
