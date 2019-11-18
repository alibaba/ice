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
const goldlog = require('../../lib/goldlog');
const checkVersion = require('../../lib/checkVersion');
const downloadServer = require('./downloadServer');

const SERVER_PATH = path.join(userHome, '.iceworks-server');

async function start(options = {}) {
  const pkgPath = path.join(SERVER_PATH, 'package.json');
  let packageConfig;

  try {
    // eslint-disable-next-line
    packageConfig = require(pkgPath);
  } catch(err) {
    const answers = await inquirer.prompt([
      {
        type: 'confirm',
        message: `${pkgPath} 不存在，请重新下载 iceworks-server！`,
        name: 'download',
        default: true,
      },
    ]);
    if (answers.download) {
      await downloadServer();
      await startIceworks(options);
    } else {
      console.error(err);
      process.exit(1);
    }
    return;
  }

  const packageName = packageConfig.name;
  const packageVersion = packageConfig.version;
  console.log(chalk.grey('iceworks Core:', packageVersion, SERVER_PATH));

  // backup logic，specify the iceworks-core version
  if (options.command === 'use') {
    if (!semver.valid(options.version)) {
      console.error('Invalid version specified');
      process.exit(1);
    }
    if (packageVersion !== options.version) {
      await downloadServer(options.version);
    }
  } else {
    const answers = await checkServerVersion(packageName, packageVersion);
    if (answers && answers.update) {
      await downloadServer();
    }
  }

  await startIceworks(options);
}

// npm run start
async function startIceworks(options) {
  // DAU statistics
  try {
    await dauStat(options);
  } catch (error) {
    // ignore error
  }

  const host = options.host || 'http://127.0.0.1';

  let port = options.port;
  if (!port) {
    try {
      port = await portfinder.getPortPromise();
    } catch (error) {
      console.log();
      console.log('Find port error');
      console.log(error);
      console.log();
      process.exit(1);
    }
  }

  const opts = { host, port };
  const url = `${opts.host}:${opts.port}`;
  const spinner = ora('Starting iceworks');

  const env = Object.create(process.env);
  env.PORT = opts.port;

  spinner.start();
  const child = spawn(
    path.join(SERVER_PATH, 'node_modules/.bin/egg-scripts'),
    ['start', '--title=egg-server-iceworks-server', '--framework=midway-mirror', '--workers=1 --sticky'],
    {
      stdio: ['pipe'],
      cwd: SERVER_PATH,
      env,
    }
  );

  let started = false;
  child.stdout.on('data', (data) => {
    if (data.toString().indexOf('started on http://127.0.0.1') !== -1) {
      spinner.stop();
      console.log();
      console.log('🚀  Start iceworks successful');
      console.log();
      console.log(`👉  Ready on ${chalk.yellow(url)}`);
      console.log();
      open(url);
      started = true;
    } else if (started) {
      // iceworks-server 里的 console.log
      console.log(data.toString());
    }
  });

  child.stderr.on('data', (data) => {
    // iceworks-server 里的 console.error
    console.error(data.toString());
  });

  child.on('error', (error) => {
    // egg-scripts 启动失败
    //  - .iceworks-server 下没有 node_modules 或者 node_modules 内容不全
    console.log();
    console.log('😞  Start iceworks failed');
    console.log();
    console.log(error);
    console.log();
    console.log();
    console.log(chalk.red('提示：可尝试通过以下步骤进行修复。'));
    console.log();
    console.log(chalk.green(`   1. cd ${SERVER_PATH}`));
    console.log(chalk.green('   2. npm install --registry=https://registry.npm.taobao.org'));
    console.log(chalk.green('   3. 重新启动 iceworks'));
    console.log();
    process.exit(1);
  });

  process.on('SIGINT', () => {
    goldlog('stop');
  });
}

/**
 * Get the server package version
 */
async function checkServerVersion(packageName, packageVersion) {
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
  goldlog('start', {
    group: isAlibaba ? 'alibaba' : 'outer',
  });
}

module.exports = (...args) => {
  return start(...args).catch((err) => {
    console.log(err);
    process.exit(1);
  });
};
