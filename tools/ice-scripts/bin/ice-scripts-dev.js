#!/usr/bin/env node


const program = require('commander');
const detect = require('detect-port');
const inquirer = require('inquirer');

const validationSassAvailable = require('../lib/utils/validationSassAvailable');
const checkUpdater = require('../lib/utils/checkUpdater');
const cliInstance = require('../lib/utils/cliInstance');
const Context = require('../lib/core/Context');

program
  .option('-p, --port <port>', '服务端口号')
  .option('-h, --host <host>', '服务主机名', '0.0.0.0')
  .option('--https', '开启 https ')
  .option('--analyzer', '开启构建分析')
  .option('--analyzer-port', '设置分析端口号')
  .option('--disabled-reload', '关闭 hot reload')
  .parse(process.argv);

cliInstance.initByProgram(program);

validationSassAvailable();

// 是否可交互：目前没用
const isInteractive = process.stdout.isTTY;

const DEFAULT_PORT = program.port || process.env.PORT || 4444;
const defaultPort = parseInt(DEFAULT_PORT, 10);

checkUpdater()
  .then(() => {
    return detect(defaultPort);
  })
  .then((newPort) => {
    return new Promise((resolve) => {
      if (newPort === defaultPort) {
        return resolve(newPort);
      }

      if (isInteractive) {
        const question = {
          type: 'confirm',
          name: 'shouldChangePort',
          message: `${defaultPort} 端口已被占用，是否使用 ${newPort} 端口启动？`,
          default: true,
        };
        inquirer.prompt(question).then((answer) => {
          if (answer.shouldChangePort) {
            resolve(newPort);
          } else {
            resolve(null);
          }
        });
      } else {
        resolve(null);
      }
    });
  })
  .then((port) => {
    if (port == null) {
      // We have not found a port.
      process.exit(500);
    }

    cliInstance.set('port', parseInt(port, 10));
    const cliOptions = cliInstance.get();
    process.env.NODE_ENV = 'development';
    new Context({
      command: 'dev',
      args: cliOptions,
    }).run();
  });
