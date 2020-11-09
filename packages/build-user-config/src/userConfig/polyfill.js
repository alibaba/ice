const { injectTransformRuntime } = require('@builder/app-helpers');
const processPresetEnv  = require('../utils/processPresetEnv');

module.exports = (config, polyfill) => {
  const presetEnvParam = {
    useBuiltIns: polyfill
  };
  if (typeof polyfill === 'string') {
    presetEnvParam.corejs = 3;
    if (polyfill === 'usage') {
      injectTransformRuntime(config);
    }
  }
  processPresetEnv(config, presetEnvParam);
};
