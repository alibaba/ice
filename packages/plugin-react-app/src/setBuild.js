const { getWebOutputPath, logWebpackConfig } = require('./utils');

module.exports = (api, opts) => {
  const { context, onHook, onGetWebpackConfig } = api;
  const { targets } = opts;

  onHook('before.build.run', ({ config }) => {
    logWebpackConfig(config);
  });

  targets.forEach((target) => {
    onGetWebpackConfig(target, (config) => {
      const outputPath = getWebOutputPath(context, { target });
      config.output.path(outputPath);
    });
  });
};
