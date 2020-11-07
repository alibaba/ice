const { injectTransformRuntime } = require('build-app-helpers');
const processPresetEnv  = require('../utils/processPresetEnv');

module.exports = (config, polyfill) => {
  const presetEnvParam = {
    useBuiltIns: polyfill
  };
  if (typeof polyfill === 'string') {
    presetEnvParam.corejs = 3;
    injectTransformRuntime(config);
  }
  processPresetEnv(config, presetEnvParam);
};
