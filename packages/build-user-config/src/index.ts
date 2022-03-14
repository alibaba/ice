import getEnhancedWebpackConfig from './getEnhancedWebpackConfig';

const applyCliOption = require('./applyCliOption');
const applyUserConfig = require('./applyUserConfig');
const baseUserConfig = require('./config/user.config.js');
const generateDefaultConfig = require('./utils/generateDefaultConfig');

const defaultConfig = generateDefaultConfig(baseUserConfig);

export {
  applyCliOption,
  applyUserConfig,
  getEnhancedWebpackConfig,
  defaultConfig,
};
