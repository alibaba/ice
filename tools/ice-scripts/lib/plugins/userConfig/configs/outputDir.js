const path = require('path');

module.exports = (api, outputDir) => {
  const { context } = api.service;
  api.chainWebpack((config) => {
    config.output.path(path.resolve(context, outputDir));
  });
};
