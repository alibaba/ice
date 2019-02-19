#!/usr/bin/env node

'use strict';

const program = require('commander');

const validationSassAvailable = require('../lib/utils/validationSassAvailable');
const optionsAttachToEnv = require('../lib/utils/optionsAttachToEnv');

program
  .option('-p, --port <port>', '服务端口号')
  .option('-h, --host <host>', '服务主机名')
  .option('--https', '开启 https ')
  .option('--analyzer', '开启构建分析')
  .option('--analyzer-port', '设置分析端口号')
  .option('--disabled-reload', '关闭 hot reload')
  .option('--project-type <type>', '项目类型, node|web', /^(node|web)$/i, 'web')
  .option(
    '--inject-babel <type>',
    '注入 babel 运行环境, Enum: polyfill|runtime',
    /^(polyfill|runtime)$/,
    'polyfill'
  )
  .parse(process.argv);

const detect = require('detect-port');
const inquirer = require('inquirer');

const isInteractive = process.stdout.isTTY;

optionsAttachToEnv(program);

const DEFAULT_PORT = program.port || process.env.PORT || 4444;
const HOST = program.host || process.env.HOST || '0.0.0.0';
const defaultPort = parseInt(DEFAULT_PORT, 10);

validationSassAvailable()
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
    const dev = require('../lib/dev');
    if (port == null) {
      // We have not found a port.
      process.exit(500);
    }
    dev(
      Object.assign({}, program, {
        port: parseInt(port, 10),
        host: HOST,
        devType: 'project',
      })
    );
  })
  .catch((err) => {
    console.log(err);
    console.error('ice-scripts exited unexpectedly.');
    process.exit(1);
  });
