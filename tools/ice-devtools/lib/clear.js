const pkg = require('../utils/pkg-json');
const token = require('../utils/token');
const chalk = require('chalk');

module.exports = async function clear(cwd) {
  const pkgJSON = pkg.getPkgJSON(cwd);
  delete pkgJSON.materialConfig['fusion-site'];
  pkg.writePkgJSON(pkgJSON, cwd);
  await token.clearToken();
  console.log(chalk.green('clear cache data success'));
};
