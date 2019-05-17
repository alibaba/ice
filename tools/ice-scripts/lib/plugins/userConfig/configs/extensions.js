module.exports = (api, extensions) => {
  if (Array.isArray(extensions)) {
    api.chainWebpack((config) => {
      extensions.forEach((extension) => {
        config.resolve.extensions
          .add(extension);
      });
    });
  }
};
