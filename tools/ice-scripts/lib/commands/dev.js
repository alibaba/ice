/**
 * 启动服务：cli 调用
 */

process.env.NODE_ENV = 'development';

const chalk = require('chalk');
const clearConsole = require('react-dev-utils/clearConsole');
const formatWebpackMessages = require('react-dev-utils/formatWebpackMessages');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const openBrowser = require('react-dev-utils/openBrowser');
const iceworksClient = require('../utils/iceworksClient');
const prepareUrLs = require('../utils/prepareURLs');
const goldlog = require('../utils/goldlog');
const pkgData = require('../../package.json');
const log = require('../utils/log');
const checkDepsInstalled = require('../utils/checkDepsInstalled');

module.exports = async function (service, subprocess) {
  goldlog('version', {
    version: pkgData.version,
  });
  goldlog('dev', service.commandArgs);
  log.verbose('dev cliOptions', service.commandArgs);
  await service.applyHooks('beforeDev');

  // 与 iceworks 客户端通信
  const send = function (data) {
    iceworksClient.send(data);
    if (subprocess && typeof subprocess.send === 'function') {
      subprocess.send(data);
    }
  };

  const installedDeps = checkDepsInstalled(service.context);
  if (!installedDeps) {
    log.error('项目依赖未安装，请先安装依赖。');
    process.exit(1);
    return;
  }

  const HOST = service.commandArgs.host || '0.0.0.0';
  const PORT = service.commandArgs.port || 4444;
  const protocol = service.config.devServer.https ? 'https' : 'http';

  const isInteractive = false; // process.stdout.isTTY;
  const urls = prepareUrLs(protocol, HOST, PORT);

  if (service.commandArgs.disabledReload) {
    log.warn('关闭了热更新（hot-reload）功能');
  }

  let isFirstCompile = true;
  const compiler = webpack(service.config);
  const devServer = new WebpackDevServer(compiler, service.config.devServer);

  // devMiddleware(devServer.app, proxyConfig);
  compiler.hooks.done.tap('done', (stats) => {
    if (isInteractive) {
      clearConsole();
    }
    if (isFirstCompile) {
      send({
        action: 'update_project',
        message: 'server_finished',
        data: {
          statusDev: 'working',
          serverUrl: urls.localUrlForTerminal,
        },
      });

      isFirstCompile = false;
      console.log(chalk.cyan('Starting the development server...'));
      console.log(
        [
          `    - Local:   ${chalk.yellow(urls.localUrlForTerminal)}`,
          `    - Network: ${chalk.yellow(urls.lanUrlForTerminal)}`,
        ].join('\n')
      );
      openBrowser(urls.localUrlForBrowser);
    }

    console.log(
      stats.toString({
        colors: true,
        chunks: false,
        assets: true,
        children: false,
        modules: false,
      })
    );

    const json = stats.toJson({}, true);
    const messages = formatWebpackMessages(json);
    const isSuccessful = !messages.errors.length && !messages.warnings.length;

    if (isSuccessful) {
      if (stats.stats) {
        log.info('Compiled successfully');
      } else {
        log.info(
          `Compiled successfully in ${(json.time / 1000).toFixed(1)}s!`
        );
      }
    }
    service.applyHooks('afterDev', stats);

    if (messages.errors.length) {
      if (messages.errors.length > 1) {
        messages.errors.length = 1;
      }
      log.error('Failed to compile.\n');
      console.log(messages.errors.join('\n\n'));
    } else if (messages.warnings.length) {
      log.warn('Compiled with warnings.');
      console.log();
      messages.warnings.forEach((message) => {
        console.log(message);
        console.log();
      });
      // Teach some ESLint tricks.
      console.log('You may use special comments to disable some warnings.');
      console.log(
        `Use ${chalk.yellow(
          '// eslint-disable-next-line'
        )} to ignore the next line.`
      );
      console.log(
        `Use ${chalk.yellow(
          '/* eslint-disable */'
        )} to ignore all warnings in a file.`
      );
      console.log();
    }

    if (isSuccessful) {
      // 服务启动完成切没有任务错误与警告
      send({
        action: 'update_project',
        message: 'compiler_success',
        data: {
          statusCompile: 'success',
          serverUrl: urls.lanUrlForBrowser || urls.localUrlForBrowser,
        },
      });
    } else {
      // 服务启动完成切没有任务错误与警告
      send({
        action: 'update_project',
        message: 'compiler_failed',
        data: {
          statusCompile: 'failed',
          serverUrl: urls.lanUrlForBrowser || urls.localUrlForBrowser,
        },
      });
    }
  });

  compiler.hooks.invalid.tap('invalid', () => {
    if (isInteractive) {
      clearConsole();
    }
    console.log('Compiling...');
    send({
      action: 'update_project',
      message: 'compiler_compiling',
      data: {
        statusCompile: 'compiling',
      },
    });
  });

  devServer.use((req, res, next) => {
    console.log('Time:', Date.now());
    next();
  });

  devServer.listen(PORT, HOST, (err) => {
    // 端口被占用，退出程序
    if (err) {
      send({
        action: 'update_project',
        message: 'server_failed',
        data: {
          statusDev: 'failed',
        },
      });
      console.error(err);
      process.exit(500);
    } else {
      send({
        action: 'update_project',
        message: 'server_success',
        data: {
          statusDev: 'working',
          serverUrl: urls.lanUrlForBrowser || urls.localUrlForBrowser,
        },
      });
    }
  });
};
