/**
 * 启动服务，根据传入的路径地址，按照 ICE page 的格则搜寻代码，并启动编译服务
 * @param {String} cwd 项目目录
 * @param {Object} options 命令行参数
 */

process.env.NODE_ENV = 'development';

const address = require('address');
const chalk = require('chalk');
const clearConsole = require('react-dev-utils/clearConsole');
const formatWebpackMessages = require('react-dev-utils/formatWebpackMessages');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

const getPaths = require('./config/paths');
const getEntries = require('./config/getEntry');
const getWebpackConfigDev = require('./config/webpack.config.dev');
// const npmUpdate = require('./helpers/npmUpdate');
const iceworksClient = require('./iceworksClient');

/* eslint no-console:off */

module.exports = function(args, subprocess) {
  const cwd = process.cwd();
  const HOST = args.host || '0.0.0.0';
  const PORT = args.port || 3333;

  const send = function(data) {
    iceworksClient.send(data);
    if (subprocess && typeof subprocess.send === 'function') {
      subprocess.send(data);
    }
  };

  const LOCAL_IP = address.ip();

  const isInteractive = false; // process.stdout.isTTY;
  const entries = getEntries(cwd, false);
  const paths = getPaths(cwd);

  const pacageData = require(paths.appPackageJson);
  // get ice config by package.ice

  const webpackConfig = getWebpackConfigDev(entries, paths, pacageData.ice);

  if (iceworksClient.available) {
    webpackConfig.plugins.push(
      new webpack.ProgressPlugin((percentage, msg) => {
        send({
          type: 'sdk_status',
          message: 'dev_compiler_progress',
          data: { percentage, msg },
        });
      })
    );
  }

  let isFirstCompile = true;
  const compiler = webpack(webpackConfig);
  const devServerConfig = require('./config/webpack.server.config')(
    paths,
    args
  );
  const devServer = new WebpackDevServer(compiler, devServerConfig);

  compiler.plugin('done', (stats) => {
    if (isInteractive) {
      clearConsole();
    }
    if (isFirstCompile) {
      send({
        type: 'sdk_status',
        message: 'dev_server_finished',
        data: {
          url: `http://${LOCAL_IP}:${PORT}`,
        },
      });

      isFirstCompile = false;
      console.log(chalk.cyan('Starting the development server...'));
      console.log('   ', chalk.yellow(`http://${HOST}:${PORT}`));
      console.log('   ', chalk.yellow(`http://127.0.0.1:${PORT}`));
      console.log('   ', chalk.yellow(`http://${LOCAL_IP}:${PORT}`));
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
        type: 'sdk_status',
        message: 'dev_compiler_success',
        data: {
          url: `http://${LOCAL_IP}:${PORT}`,
        },
      });
    } else {
      // 服务启动完成切没有任务错误与警告
      send({
        type: 'sdk_status',
        message: 'dev_compiler_failed',
        data: {
          url: `http://${LOCAL_IP}:${PORT}`,
        },
      });
    }
  });

  compiler.plugin('invalid', () => {
    if (isInteractive) {
      clearConsole();
    }
    console.log('Compiling...');
    send({
      type: 'sdk_status',
      message: 'dev_compiler_compiling',
    });
  });

  devServer.use(function(req, res, next) {
    console.log('Time:', Date.now());
    next();
  });

  devServer.listen(PORT, HOST, (err) => {
    if (err) {
      send({
        type: 'sdk_status',
        message: 'dev_server_failed',
      });
      return console.log(err);
    } else {
      send({
        type: 'sdk_status',
        message: 'dev_server_success',
        data: {
          url: `http://${LOCAL_IP}:${PORT}`,
        },
      });
    }
  });
};
