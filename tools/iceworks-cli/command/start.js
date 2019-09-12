const path = require('path');
const fs = require('fs');
const userHome = require('user-home');
const spawn = require('cross-spawn');
const portfinder = require('portfinder');
const chalk = require('chalk');
const ora = require('ora');
const open = require('open');
const inquirer = require('inquirer');
const semver = require('semver');
const { checkAliInternal } = require('ice-npm-utils');
const goldlog = require('../lib/goldlog');
const checkVersion = require('../lib/checkVersion');

const SERVER_PATH = path.join(userHome, 'iceworks-server');
// eslint-disable-next-line import/no-dynamic-require
const serverPackageConfig = require(path.join(SERVER_PATH, 'package.json'));

async function start(options = {}) {
  // backup logic，specify the iceworks-core version
  if (options.command === 'use') {
    if (!semver.valid(options.version)) {
      throw new Error('Invalid version specified');
    } else {
      const serverPackageVersion = serverPackageConfig.version;
      process.env.ICEWORKS_CORE_VERSION = options.version;
      if (serverPackageVersion !== options.version) {
        downloadAndListen(options);
      } else {
        listen(options);
      }
    }
  } else {
    process.env.ICEWORKS_CORE_VERSION = '';
    const answers = await checkServerVersion();
    if (answers && answers.update) {
      downloadAndListen(options);
    } else {
      listen(options);
    }
  }
}

function downloadAndListen(options) {
  const child = spawn('node', ['./lib/downloadServer.js'], {
    stdio: ['pipe'],
    cwd: path.join(__dirname, '../'),
  });

  child.stdout.on('data', (data) => {
    console.log(data.toString());
  });

  child.on('error', (err) => {
    console.log('update failed:', err);
  });

  child.on('close', (code) => {
    if (code === 0) {
      listen(options);
    }
  });
}

async function listen(options) {
  // DAU statistics
  try {
    await dauStat();
  } catch (error) {
    // ignore error
  }


  const host = options.host || 'http://127.0.0.1';

  let port = options.port;
  if (!port) {
    try {
      port = await portfinder.getPortPromise();
    } catch (error) {
      console.error('Could not get a free port:\n', error);
    }
  }

  const opts = { host, port };
  const url = `${opts.host}:${opts.port}`;
  const spinner = ora('Starting iceworks');

  const env = Object.create(process.env);
  env.PORT = opts.port;

  spinner.start();
  const child = spawn('npm', ['start'], {
    stdio: ['pipe'],
    cwd: SERVER_PATH,
    env,
  });

  let started = false;
  child.stdout.on('data', (data) => {
    if (data.toString().indexOf('started on http://127.0.0.1') !== -1) {
      spinner.stop();
      successMsg(url);
      open(url);
      started = true;

    } else if (started) {
      console.log(data.toString());
    }
  });

  child.stderr.on('data', (data) => {
    console.log(data.toString());
  })

  child.on('error', (error) => {
    failedMsg(error);
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
function failedMsg(error) {
  console.log();
  console.log('😞  Start iceworks failed');
  console.log();
  console.log(error);
  console.log();
}

/**
 * Get the server package version
 */
async function checkServerVersion() {
  const packageName = serverPackageConfig.name;
  const packageVersion = serverPackageConfig.version;

  const result = await checkVersion(packageName, packageVersion);
  if (result) {
    const answers = await inquirer.prompt([
      {
        type: 'confirm',
        message: `A newer version of iceworks core is available(CHANGELOG: ${chalk.blue('https://github.com/alibaba/ice/blob/master/CHANGELOG.md')})`,
        name: 'update',
        default: false,
      },
    ]);

    return answers;
  }
}

async function dauStat() {
  const isAlibaba = await checkAliInternal();
  const nowtDate = new Date().toDateString();
  const iceworksConfigPath = path.join(userHome, '.iceworks', 'db.json');
  // eslint-disable-next-line
  const iceworksConfigContent = require(`${iceworksConfigPath}`);
  const lastDate = iceworksConfigContent.lastDate;
  if(nowtDate !== lastDate) {
    iceworksConfigContent.lastDate = nowtDate;
    fs.writeFileSync(iceworksConfigPath, JSON.stringify(iceworksConfigContent, null, 2));

    // eslint-disable-next-line
    const iceworksCorePackageConfig = require(serverPackageConfig);

    goldlog('dau', {
      group: isAlibaba ? 'alibaba' : 'outer',
      version: iceworksCorePackageConfig.version,
    });
  }
}

module.exports = (...args) => {
  return start(...args).catch((err) => {
    console.log(err);
    process.exit(1);
  });
};
