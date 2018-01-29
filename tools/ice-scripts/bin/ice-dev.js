#!/usr/bin/env node

'use strict';

const program = require('commander');

program.on('--help', () => {
  console.log('todo 帮助信息');
});

program
  .option('-p, --port <port>', 'server port')
  .option('-h, --host <host>', 'server host')
  .option('-s, --skip-install', 'skip install dependencies')
  .parse(process.argv);

const dev = require('../lib/dev');
const { choosePort } = require('react-dev-utils/WebpackDevServerUtils');

const DEFAULT_PORT = program.port || process.env.PORT || 3333;
const HOST = program.host || process.env.HOST || '127.0.0.1';

choosePort(HOST, parseInt(DEFAULT_PORT, 10)).then(port => {
  if (port == null) {
    // We have not found a port.
    return;
  }
  dev(
    Object.assign({}, program, {
      port: parseInt(port, 10),
      host: HOST,
      devType: 'project',
    })
  );
});
