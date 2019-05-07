const path = require('path');
const spawn = require('cross-spawn');
const ora = require('ora');
const chalk = require('chalk');

module.exports = function stop() {
  const spinner = ora('Stopping iceworks');
  const child = spawn('npm', ['run', 'stop'], {
    stdio: ['pipe'],
    cwd: path.join(process.cwd(), 'server'),
  });

  child.stdout.on('data', () => {
    spinner.start();
  });

  child.on('close', () => {
    spinner.stop();
    console.log(`✋  ${chalk.yellow('Stop iceworks successful')}`);
    console.log();
  });
};
