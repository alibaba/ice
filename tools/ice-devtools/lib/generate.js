const chalk = require('chalk');
const pkg = require('../utils/pkg-json');
const logger = require('../utils/logger');
const message = require('../utils/message');

const generateMaterialsDatabases = require('../utils/generate-marterials-database');

function generateDatabase({ name, path, options }) {
  generateMaterialsDatabases(name, path, options).then(() => {
    console.log(chalk.cyan('Success! materials db generated'));
    console.log();
  });
}

module.exports = function generate(cwd) {
  const pkgJson = pkg.getPkgJSON(cwd);
  const { materialConfig } = pkgJson;

  if (!materialConfig) {
    logger.fatal(message.invalid);
  }

  const { type } = materialConfig;
  generateDatabase({
    name: type ? `${type}-materials` : 'db',
    path: cwd,
    options: materialConfig,
  });
};
