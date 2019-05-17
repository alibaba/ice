module.exports = (api, filename) => {
  if (filename) {
    api.chainWebpack((config) => {
      config.output.filename(filename);
    });
  }
};
