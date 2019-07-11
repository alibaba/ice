const chalk = require('chalk');

module.exports = {
  invalid: `Invalid ice materials project ${chalk.cyan('docs: https://ice.work/docs/materials/about')}`,
  missingMaterialConfig: 'Missing `materialConfig` property in package.json file.',
  missingTemplate: 'Missing `materialConfig.template` property in package.json file.',
};
