module.exports = (config, modules) => {
  if (Array.isArray(modules)) {
    modules.forEach((module) => {
      config.resolve.modules
        .add(module);
    });
  }
};
