const getBaseConfig = require('./webpack.base');
const configBuild = require('./webpack.build');
const configDev = require('./webpack.dev');

module.exports = (mode = 'development') => {
  const config = getBaseConfig(mode);
  if (mode === 'development') {
    configDev(config);
  } else {
    configBuild(config);
  }
  return config;
};
