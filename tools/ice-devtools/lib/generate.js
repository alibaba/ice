const chalk = require('chalk');
const pkg = require('../utils/pkg-json');
const logger = require('../utils/logger');
const message = require('../utils/message');

const generateMaterialsDatabases = require('../utils/generate-marterials-database');

module.exports = function generate(cwd) {
  const pkgJson = pkg.getPkgJSON(cwd);
  const { materialConfig } = pkgJson;

  // 全局的 materialConfig，字段会生成在全局 json 上
  if (!materialConfig) {
    logger.fatal(message.invalid);
  }

  const { type } = materialConfig;
  // 生成的物料名称，type 属于兼容字段
  const filename = type ? `${type}-materials` : 'materials';

  generateMaterialsDatabases(
    pkgJson.name,
    cwd,
    filename,
    materialConfig,
  ).then(() => {
    console.log(chalk.cyan('Success! materials db generated'));
    console.log();
    console.log('The build folder is ready to be deployed.');
    console.log();
  });
};
