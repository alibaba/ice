/**
 * 启动服务：cli 调用
 */

process.env.NODE_ENV = 'development';

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const clearConsole = require('react-dev-utils/clearConsole');
const formatWebpackMessages = require('react-dev-utils/formatWebpackMessages');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const deepmerge = require('deepmerge');
const openBrowser = require('react-dev-utils/openBrowser');

const paths = require('./config/paths');
const getWebpackConfigDev = require('./config/webpack.config.dev');
const devMiddleware = require('./devMiddleware');
const iceworksClient = require('./iceworksClient');
const getCertificate = require('./config/getCertificate');
const prepareUrLs = require('./utils/prepareURLs');
const getProxyConfig = require('./config/getProxyConfig');
const goldlog = require('./utils/goldlog');
const pkgData = require('../package.json');
const projectPkgData = require('./config/packageJson');
const log = require('./utils/log');
const checkDepsInstalled = require('./utils/checkDepsInstalled');
const getDemos = require('./component/getDemos');

module.exports = async function (cliOptions, subprocess) {
  goldlog('version', {
    version: pkgData.version,
  });
  goldlog('dev', cliOptions);
  log.verbose('dev cliOptions', cliOptions);

  // 与 iceworks 客户端通信
  const send = function (data) {
    iceworksClient.send(data);
    if (subprocess && typeof subprocess.send === 'function') {
      subprocess.send(data);
    }
  };

  const installedDeps = checkDepsInstalled(paths.appDirectory);
  if (!installedDeps) {
    log.error('项目依赖未安装，请先安装依赖。');
    process.exit(1);
    return;
  }

  const HOST = cliOptions.host || '0.0.0.0';
  const PORT = cliOptions.port || 4444;
  let httpsConfig;
  let protocol = cliOptions.https ? 'https' : 'http';

  if (protocol === 'https') {
    try {
      const cert = await getCertificate();
      httpsConfig = {
        key: cert.key,
        cert: cert.cert,
      };
    } catch (err) {
      protocol = 'http';
      log.info('HTTPS 证书生成失败，已转换为HTTP');
    }
  }

  const isInteractive = false; // process.stdout.isTTY;
  const urls = prepareUrLs(protocol, HOST, PORT);
  const proxyConfig = getProxyConfig();

  if (cliOptions.disabledReload) {
    log.warn('关闭了热更新（hot-reload）功能');
  }

  const buildConfig = projectPkgData.buildConfig || projectPkgData.ice || {};

  if (projectPkgData.type === 'component') {
    // dev 组件：每个 demo 是一个 entry
    const componentEntry = {};
    const demos = getDemos(paths.appDirectory);

    demos.forEach((demo) => {
      const demoName = demo.filename;
      const demoFile = path.join(paths.appDirectory, 'demo', `${demoName}.md`);
      componentEntry[`__Component_Dev__.${demoName}`] = demoFile;
    });

    buildConfig.entry = componentEntry;
  }

  const webpackConfig = getWebpackConfigDev({
    buildConfig,
  });

  if (iceworksClient.available) {
    webpackConfig.plugins.push(
      new webpack.ProgressPlugin((percentage, msg) => {
        send({
          action: 'update_project',
          message: 'compiler_progress',
          data: {
            statusCompile: 'progress',
            statusCompileProgress: percentage,
            statusCompileProgressText: msg,
          },
        });
      })
    );
  }

  let isFirstCompile = true;
  const compiler = webpack(webpackConfig);
  // eslint-disable-next-line global-require
  let devServerConfig = require('./config/webpack.server.config')();
  if ('devServer' in webpackConfig) {
    // merge user config
    devServerConfig = deepmerge(devServerConfig, webpackConfig.devServer);
  }

  // buffer 与 deepmerge有冲突，会被解析成乱码
  if (httpsConfig) {
    devServerConfig.https = httpsConfig;
  } else {
    delete devServerConfig.https;
  }

  const devServer = new WebpackDevServer(compiler, devServerConfig);

  devMiddleware(devServer.app, proxyConfig);

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
