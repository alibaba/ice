module.exports = (config, extensions) => {
  if (Array.isArray(extensions)) {
    extensions.forEach((extension) => {
      config.resolve.extensions
        .add(extension);
    });
  }
};
