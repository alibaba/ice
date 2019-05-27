module.exports = ({ chainWebpack }, filename) => {
  if (filename) {
    chainWebpack((config) => {
      config.output.filename(filename);
    });
  }
};
