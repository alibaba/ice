const chalk = require('chalk');

module.exports = (userConfig) => {
  if (Object.prototype.hasOwnProperty.call(userConfig, 'injectBabel')) {
    console.log(chalk.cyan('Detected that you are using injectBabel, please use polyfill field, Visit https://ice.work/docs/guide/basic/build.'));
  }
};
