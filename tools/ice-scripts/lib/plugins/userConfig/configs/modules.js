module.exports = ({ chainWebpack }, modules) => {
  if (Array.isArray(modules)) {
    chainWebpack((config) => {
      modules.forEach((module) => {
        config.resolve.modules
          .add(module);
      });
    });
  }
};
