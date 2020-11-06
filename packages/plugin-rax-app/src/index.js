const path = require('path');
const { applyCliOption, applyUserConfig } = require('@builder/user-config');
const getBase = require('./base');
const { GET_RAX_APP_WEBPACK_CONFIG } = require('./constants');
const setTest = require('./setTest');
const setDev = require('./setDev');
const setBuild = require('./setBuild');

module.exports = (api) => {
  const { onGetWebpackConfig, context, setValue } = api;
  const { command, rootDir } = context;
  setValue(GET_RAX_APP_WEBPACK_CONFIG, getBase);

  // register cli option
  applyCliOption(api);

  // register user config
  applyUserConfig(api);

  // set webpack config
  onGetWebpackConfig((chainConfig) => {
    // add resolve modules of project node_modules
    chainConfig.resolve.modules.add(path.join(rootDir, 'node_modules'));
  });

  if (command === 'start') {
    setDev(api);
  }

  if (command === 'build') {
    setBuild(api);
  }

  if (command === 'test') {
    setTest(api);
  }
};


