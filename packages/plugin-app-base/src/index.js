const path = require('path');
const registerCliOption = require('./registerCliOption');
const registerUserConfig = require('./registerUserConfig');
const modifyUserConfig = require('./modifyUserConfig');
const getBase = require('./base');
const dev = require('./dev');
const build = require('./build');
const test = require('./test');
const { GET_WEBPACK_BASE_CONFIG } = require('./constants');

module.exports = (api) => {
  const {
    onGetWebpackConfig,
    context,
    setValue,
  } = api;
  const { command, rootDir } = context;
  setValue(GET_WEBPACK_BASE_CONFIG, getBase);

  // register cli option
  registerCliOption(api);

  // register user config
  registerUserConfig(api);

  // modify user config to keep excute order
  modifyUserConfig(api);

  // set webpack config
  onGetWebpackConfig((chainConfig) => {
    // add resolve modules of project node_modules
    chainConfig.resolve.modules.add(path.join(rootDir, 'node_modules'));
  });

  if (command === 'test') {
    test(api);
  }

  if (command === 'start') {
    dev(api);
  }

  if (command === 'build') {
    build(api);
  }
};
