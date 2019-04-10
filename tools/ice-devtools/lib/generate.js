const chalk = require('chalk');
const pkg = require('../utils/pkg-json');
const logger = require('../utils/logger');
const message = require('../utils/message');

const generateMaterialsDatabases = require('../utils/generate-marterials-database');

module.exports = function generate(cwd) {
  const pkgJson = pkg.getPkgJSON(cwd);
  const { materialConfig } = pkgJson;

  // 全局的 materialConfig，字段会生成在全局 json 上，仅用于标识物料源根目录以及自定义全局字段
  if (!materialConfig) {
    logger.fatal(message.invalid);
  }

  generateMaterialsDatabases(
    pkgJson.name,
    cwd,
    materialConfig,
  ).then(() => {
    console.log(chalk.cyan('Success! materials db generated'));
    console.log();
    console.log('The build folder is ready to be deployed.');
    console.log();
  });
};
