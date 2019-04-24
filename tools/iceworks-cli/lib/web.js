const path = require('path');
const spawn = require('cross-spawn');
const portfinder = require('portfinder');
const chalk = require('chalk');

async function web(options = {}) {
  const host = options.host || 'http://127.0.0.1';

  let port = options.port;
  if (!port) {
    port = await portfinder.getPortPromise();
  }

  const opts = { host, port };
  const url = `${opts.host}:${opts.port}`;

  console.log('🚀  Starting Iceworks Web');
  console.log();
  console.log(`👉  Ready on ${chalk.yellow(url)}`);

  const env = Object.create(process.env);
  env.PORT = opts.port;
  spawn.sync('npm', ['run', 'dev'], {
    stdio: 'ignore',
    cwd: path.join(process.cwd(), 'server'),
    env,
  });
}

module.exports = (...args) => {
  return web(...args).catch((err) => {
    console.log(err);
    process.exit(1);
  });
};
