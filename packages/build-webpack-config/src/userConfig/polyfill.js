const processPresetEnv  = require('../utils/processPresetEnv');

module.exports = (config, polyfill) => {
  const presetEnvParam = {
    useBuiltIns: polyfill
  };
  if (typeof polyfill === 'string') {
    presetEnvParam.corejs = 3;
  }
  processPresetEnv(config, presetEnvParam);
};
