module.exports = ({ chainWebpack }, extensions) => {
  if (Array.isArray(extensions)) {
    chainWebpack((config) => {
      extensions.forEach((extension) => {
        config.resolve.extensions
          .add(extension);
      });
    });
  }
};
