/**
 * 组件 or block 的服务入口文件
 */
const address = require('address');
const chalk = require('chalk');
const path = require('path');
const fs = require('fs');
const clearConsole = require('react-dev-utils/clearConsole');
const formatWebpackMessages = require('react-dev-utils/formatWebpackMessages');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

const getPaths = require('./config/paths');
const getEntries = require('./config/getEntry');
const getWebpackConfigDev = require('./config/webpack.config.dev');
const npmUpdate = require('./helpers/npmUpdate');
const hotDevClientPath = require.resolve('react-dev-utils/webpackHotDevClient');
/* eslint no-console:off */

module.exports = function (args) {
  const cwd = process.cwd();
  const HOST = args.host || '127.0.0.1';
  const PORT = args.port || 3333;
  const LOCAL_IP = address.ip();
  const pkg = require(path.join(cwd, 'package.json'));

  npmUpdate(args)
    .then(() => {
      const isInteractive = false; // process.stdout.isTTY;
      const entries = {
        demo: [hotDevClientPath, require.resolve(path.join(cwd, 'demo/index'))],
      };
      const paths = getPaths(cwd);
      // block dev 的时候, demo 构建到 build 目录
      paths.devDistDir = '/build/';
      const webpackConfig = getWebpackConfigDev(
        entries,
        paths,
        pkg.blockConfig || {}
      );

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
          isFirstCompile = false;
          console.log(chalk.cyan('Starting the development server...'));
          console.log(
            '   ',
            chalk.yellow(`http://${HOST}:${PORT}/demo/index.html`)
          );
          console.log(
            '   ',
            chalk.yellow(`http://${LOCAL_IP}:${PORT}/demo/index.html`)
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
        const isSuccessful =
          !messages.errors.length && !messages.warnings.length;

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
          // 服务启动完成, 没有任务错误与警告
        } else {
          // 服务启动完成, 有任务错误与警告
        }
      });

      compiler.plugin('invalid', () => {
        if (isInteractive) {
          clearConsole();
        }
        console.log('Compiling...');
      });

      devServer.use(function (req, res, next) {
        console.log('Time:', Date.now());
        next();
      });

      devServer.listen(PORT, HOST, (err) => {
        if (err) {
          return console.log(err);
        } else {
          console.log(`dev server at ${HOST}:${PORT}`);
        }
      });
    })
    .catch((error) => {
      console.log(error);
    });
};
