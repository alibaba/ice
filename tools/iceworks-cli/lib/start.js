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
  const child = spawn('npm', ['start'], {
    stdio: ['pipe'],
    cwd: path.join(process.cwd(), 'server'),
    env,
  });

  child.stdout.on('data', () => {
    spinner.start();
  });

  child.on('close', (code) => {
    spinner.stop();
    if (code === 0) {
      console.log();
      console.log('🚀  Start iceworks successful');
      console.log();
      console.log(`👉  Ready on ${chalk.yellow(url)}`);
      console.log();
    } else {
      console.log();
      console.log('😞  Start iceworks failed');
      console.log();
    }
  });
}

module.exports = (...args) => {
  return start(...args).catch((err) => {
    console.log(err);
    process.exit(1);
  });
};
