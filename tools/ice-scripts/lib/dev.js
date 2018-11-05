/**
 * 启动服务，根据传入的路径地址，按照 ICE page 的格则搜寻代码，并启动编译服务
 * @param {String} cwd 项目目录
 * @param {Object} options 命令行参数
 */

process.env.NODE_ENV = 'development';

const chalk = require('chalk');
const fs = require('fs');
const clearConsole = require('react-dev-utils/clearConsole');
const formatWebpackMessages = require('react-dev-utils/formatWebpackMessages');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const deepmerge = require('deepmerge');

const paths = require('./config/paths');
const getEntries = require('./config/getEntry');
const getWebpackConfigDev = require('./config/webpack.config.dev');
const devMiddleware = require('./devMiddleware');
const iceworksClient = require('./iceworksClient');
const generateRootCA = require('./config/generateRootCA');
const prepareUrLs = require('./utils/prepareURLs');
const getProxyConfig = require('./config/getProxyConfig');

/* eslint no-console:off */

module.exports = async function(args, subprocess) {
  // 与 iceworks 客户端通信
  const send = function(data) {
    iceworksClient.send(data);
    if (subprocess && typeof subprocess.send === 'function') {
      subprocess.send(data);
    }
  };

  const cwd = process.cwd();
  const HOST = args.host || '0.0.0.0';
  const PORT = args.port || 4444;
  let httpsConfig;
  let protocol = args.https ? 'https' : 'http';

  if (protocol == 'https') {
    try {
      const ca = await generateRootCA();
      httpsConfig = {
        key: fs.readFileSync(ca.key),
        cert: fs.readFileSync(ca.cert),
      };
    } catch (err) {
      protocol = 'http';
      console.log(chalk.red('HTTPS 证书生成失败，已转换为HTTP'));
    }
  }

  const isInteractive = false; // process.stdout.isTTY;
  const urls = prepareUrLs(protocol, HOST, PORT);
  const entries = getEntries(cwd);
  const proxyConfig = getProxyConfig();
  // eslint-disable-next-line import/no-dynamic-require
  const packageData = require(paths.appPackageJson);
  // get ice config by package.ice

  if (process.env.DISABLED_RELOAD) {
    console.log(chalk.yellow('Warn:'), '关闭了热更新（hot-reload）功能');
  }
  const webpackConfig = getWebpackConfigDev({
    entry: entries,
    buildConfig: packageData.buildConfig || packageData.ice,
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
  let devServerConfig = require('./config/webpack.server.config')(args);
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
        console.log(chalk.green('Compiled successfully'));
      } else {
        console.log(
          chalk.green(
            `Compiled successfully in ${(json.time / 1000).toFixed(1)}s!`
          )
        );
      }
    }

    if (messages.errors.length) {
      if (messages.errors.length > 1) {
        messages.errors.length = 1;
      }
      console.log(chalk.red('Failed to compile.\n'));
      console.log(messages.errors.join('\n\n'));
    } else if (messages.warnings.length) {
      console.log(chalk.yellow('Compiled with warnings.'));
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
