const updateMiniCssLoaderPath = require('../utils/updateMiniCssLoaderPath');

module.exports = (config, value, context) => {
  const { command, userConfig } = context;
  if (command === 'start') {
    config.output.publicPath(value);
    updateMiniCssLoaderPath(config, value, userConfig);
  }
};
