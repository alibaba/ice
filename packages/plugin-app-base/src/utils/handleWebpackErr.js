const chalk = require('chalk');

module.exports = (err, stats) => {
  if (err) {
    console.error(err.stack || err);
    if (err.details) {
      console.error(err.details);
    }
    return false;
  }

  if (stats && stats.hasErrors()) {
    let errArr = [];
    try {
      errArr = stats.stats.map(v => v.compilation.errors);
    } catch (e) {
      errArr = [stats.compilation.errors];
    }

    for (const errors of errArr) {
      for (const e of errors) {
        let errMessage;
        let errStack;

        try {
          errMessage = e.message;
          errStack = e.stack;
        } catch (_err) {
          errMessage = e.error.message;
          errStack = e.error.stack;
        }

        console.log(chalk.red(`    ${errors.indexOf(e) + 1}. ${errMessage} \n`));
        if (process.env.DEBUG === 'true') {
          console.log(errStack);
        }
      }
    }

    console.log(chalk.yellow('Set environment `DEBUG=true` to see detail error stacks.'));
    return false;
  }

  return true;
};
