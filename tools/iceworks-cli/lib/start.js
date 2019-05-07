const path = require('path');
const spawn = require('cross-spawn');
const portfinder = require('portfinder');
const chalk = require('chalk');
const ora = require('ora');

async function start(options = {}) {
  const host = options.host || 'http://127.0.0.1';

  let port = options.port;
  if (!port) {
    port = await portfinder.getPortPromise();
  }

  const opts = { host, port };
  const url = `${opts.host}:${opts.port}`;
  const spinner = ora('Starting iceworks');

  const env = Object.create(process.env);
  env.PORT = opts.port;

  const hasStart = options.command === 'start';
  const args = hasStart ? ['run', 'start_daemon'] : ['start'];
  const child = spawn('npm', args, {
    stdio: ['pipe'],
    cwd: path.join(process.cwd(), 'server'),
    env,
  });

  if (hasStart) {
    child.stdout.on('data', () => {
      spinner.start();
    });

    child.on('close', (code) => {
      spinner.stop();
      if (code === 0) {
        successMsg(url);
      } else {
        failedMsg();
      }
    });

    return;
  }

  child.stdout.on('data', (data) => {
    spinner.start();
    if (data.toString().indexOf('started on http://127.0.0.1') !== -1) {
      spinner.stop();
      successMsg(url);
    }
  });
}

/**
 * Log a success `message` to the console and exit.
 * @param {url}
 */
function successMsg(url) {
  console.log();
  console.log('🚀  Start iceworks successful');
  console.log();
  console.log(`👉  Ready on ${chalk.yellow(url)}`);
  console.log();
}

/**
 * Log an error `message` to the console and exit.
 */
function failedMsg() {
  console.log();
  console.log('😞  Start iceworks failed');
  console.log();
}

module.exports = (...args) => {
  return start(...args).catch((err) => {
    console.log(err);
    process.exit(1);
  });
};
