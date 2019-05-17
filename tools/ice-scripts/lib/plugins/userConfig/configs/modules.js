module.exports = (api, modules) => {
  if (Array.isArray(modules)) {
    api.chainWebpack((config) => {
      modules.forEach((module) => {
        config.resolve.modules
          .add(module);
      });
    });
  }
};
