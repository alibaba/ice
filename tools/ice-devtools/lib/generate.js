const chalk = require('chalk');
const pkg = require('../utils/pkg-json');
const logger = require('../utils/logger');
const message = require('../utils/message');

const generateMaterialsDatabases = require('../utils/generate-marterials-database');

module.exports = function generate(cwd) {
  const pkgJson = pkg.getPkgJSON(cwd);
  const { materialConfig } = pkgJson;

  if (!materialConfig) {
    logger.fatal(message.invalid);
  }

  const { type } = materialConfig;

  generateMaterialsDatabases(
    type ? `${type}-materials` : 'materials',
    cwd,
    materialConfig
  ).then(() => {
    console.log(chalk.cyan('Success! materials db generated'));
    console.log();
    console.log('The build folder is ready to be deployed.');
    console.log();
  });
};
