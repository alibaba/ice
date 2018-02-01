#!/usr/bin/env node

'use strict';

const program = require('commander');
const { choosePort } = require('react-dev-utils/WebpackDevServerUtils');

program.on('--help', () => {
  console.log('todo 帮助信息');
});

program
  .option('-p, --port <port>', 'server port')
  .option('-h, --host <host>', 'server host')
  .option('-s, --skip', '跳过安装')
  .option('--env [env]', '环境, 枚举值 local, daily, pre, prod, 默认 prod')
  .parse(process.argv);

const subCmd = program.args[0];

switch (subCmd) {
  case 'build':
    const buildComponent = require('../lib/component-build');
    buildComponent({
      // pass opts
      generateStyle: false,
      propsSchema: false,
    });
    break;

  case 'dev':
    console.log('启动 block dev server...');
    const DEFAULT_PORT = program.port || process.env.PORT || 3333;
    const HOST = program.host || process.env.HOST || '0.0.0.0';
    const server = require('../lib/component-server');

    choosePort(HOST, parseInt(DEFAULT_PORT, 10)).then((port) => {
      if (port == null) {
        // We have not found a port.
        return;
      }
      server({
        // args
        devType: 'block',
        skipInstall: program.skip ? true : false,
        port: parseInt(port, 10),
        host: HOST,
      });
    });
    break;

  default:
    console.log('未识别的命令');
}
