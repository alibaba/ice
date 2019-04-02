const path = require('path');
const chalk = require('chalk');
const pkg = require('../utils/pkg-json');
const logger = require('../utils/logger');
const message = require('../utils/message');

const generateMaterialsDatabases = require('../utils/generate-marterials-database');

function generateDatabase({ name, type, filepath, options }) {
  generateMaterialsDatabases(name, type, filepath, options).then(() => {
    showLog();
  });
}

function generateMultiDatabase(materials, cwd) {
  const tasks = materials.map((material) => {
    return () => {
      return generateMaterialsDatabases(
        material.type ? `${material.type}-materials` : 'db',
        material.type,
        path.join(cwd, material.directory),
      );
    };
  });

  tasks.reduce((p, f) => {
    return p.then(f);
  }, Promise.resolve()).then(() => {
    showLog();
  });
}

function showLog() {
  console.log(chalk.cyan('Success! materials db generated'));
  console.log();
  console.log('The build folder is ready to be deployed.');
  console.log();
}

module.exports = function generate(cwd) {
  const pkgJson = pkg.getPkgJSON(cwd);
  const { materialConfig, materials } = pkgJson;

  if (materials && materials.length) {
    generateMultiDatabase(materials, cwd);
    return;
  }

  if (!materialConfig) {
    logger.fatal(message.invalid);
  }

  const { type } = materialConfig;
  generateDatabase({
    name: type ? `${type}-materials` : 'materials',
    type,
    path: cwd,
    options: materialConfig,
  });
};
